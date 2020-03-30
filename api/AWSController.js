import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

class AWSController {
    signUp(username,password, email) {
        console.log('called');
        Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
            },
            })
        .then(data => console.log(data))
        .catch(err => console.log(err));

        // After retrieving the confirmation code from the user
        // Auth.confirmSignUp(username, code, {
        //     // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        //     forceAliasCreation: true    
        // }).then(data => console.log(data))
        // .catch(err => console.log(err));

        // Auth.resendSignUp(username).then(() => {
        //     console.log('code resent successfully');
        // }).catch(e => {
        //     console.log(e);
        // });
    }
}

export default new AWSController();