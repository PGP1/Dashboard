import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

class AWSController {
  // For advanced usage
  // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger

  async webSocketTest() {
    console.log("Integrating")
    const ws = new WebSocket("wss://rumb30qq13.execute-api.ap-southeast-2.amazonaws.com/default")
    ws.addEventListener('open', function (event) {
      ws.send('Hello Server!');
    });
    ws.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
    });
    ws.onerror = (error) => {
      console.log("Err", error)
    };
  }
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
