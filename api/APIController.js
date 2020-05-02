import axios from 'axios';
import { DEVICE_LIST, LINK_DEVICE, ELASTIC_QUERY, USER_DATA, UPLOAD_AVATAR } from "../constants";
class APIController {

    async getMyDevices({ jwtToken }) {
        const config = {
            headers: { Authorization: jwtToken }
        };
        return await axios.post(DEVICE_LIST, {}, config);
    }

    async getUserData({ jwtToken }) {
        const config = {
            headers: { Authorization: jwtToken }
        };
        return await axios.post(USER_DATA, {}, config);
    }


    async linkMyDevice({ jwtToken }, device) {
        const config = {
            headers: { Authorization: jwtToken }
        };
        return await axios.post(LINK_DEVICE, { device }, config);
    }

    async elasticQuery({ AccessKeyId, SecretKey, SessionToken }, { jwtToken }, DeviceId, QueryType) {
        const config = {
            headers: { Authorization: jwtToken }
        };

        return await axios.post(ELASTIC_QUERY, { AccessKeyId, SecretKey, SessionToken, DeviceId, QueryType }, config);
    }

    async uploadAvatar(file){

        return await axios.post(UPLOAD_AVATAR,file)
        
    }
}

export default new APIController();