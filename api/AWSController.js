import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

class AWSController {
    async signUp(username,password, email) {
        return await Auth.signUp({username, password,
            attributes: {
                email,
            }});
    }

    async confirmSignUp(username, code) {
        // After retrieving the confirmation code from the user
        return Auth.confirmSignUp(username, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        });
    }

    async resendSignUp(username) {
        return Auth.resendSignUp(username);
    }
}

export default new AWSController();