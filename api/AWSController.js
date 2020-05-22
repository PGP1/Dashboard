import Amplify, { Auth } from "aws-amplify";
import AWS from "aws-sdk";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

class AWSController {

  async getLiveVideo({ AccessKeyId, SecretKey, SessionToken }) {
    var options = {
      accessKeyId: AccessKeyId,
      secretAccessKey: SecretKey,
      sessionToken: SessionToken || undefined,
      region: "ap-southeast-2",
      endpoint: undefined
    }
    let kinesisVideo = new AWS.KinesisVideo(options);
    let kinesisVideoArchievedContent = new AWS.KinesisVideoArchivedMedia(options)
    const streamName = "plantly-pp1";

    return await new Promise(resolve => kinesisVideo.getDataEndpoint({
        StreamName: streamName,
        APIName: "GET_HLS_STREAMING_SESSION_URL"
      }, async (err, res) => {
        if(err) {
          console.log("Err", err)
        } else {
          kinesisVideoArchievedContent.endpoint = new AWS.Endpoint(res.DataEndpoint);
          kinesisVideoArchievedContent.getHLSStreamingSessionURL({
            StreamName: streamName,
          }, (err, res) => {
            resolve(res);
          });
        }
    }));
  }
  // For advanced usage
  // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
  async signIn(username, password) {
    return await Auth.signIn({
      username, // Required, the username
      password, // Optional, the password
    });
  }

  async signOut() {
    window.localStorage.clear();
  }

  async getCurrentCredientials() {
    return await Auth.currentCredentials();
  }

  async signUp(username, password, email) {
    return await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    });
  }

  async confirmSignUp(username, code) {
    // After retrieving the confirmation code from the user
    return Auth.confirmSignUp(username, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true,
    });
  }

  async resendSignUp(username) {
    return Auth.resendSignUp(username);
  }

  async getCurrentSession() {
    return await Auth.currentSession();
  }

  async getCurrentAuthenticatedUser() {
    return await Auth.currentAuthenticatedUser();
  }

  async changePassword(cognitoUser, oldPassword, newPassword) {
    return await Auth.changePassword(
      cognitoUser,
      oldPassword,
      newPassword
    );
  }
}

export default new AWSController();
