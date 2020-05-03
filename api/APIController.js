import axios from 'axios';
import { DEVICE_LIST, LINK_DEVICE,UNLINK_DEVICE, ELASTIC_QUERY, USER_DATA, UPLOAD_AVATAR } from "../constants";
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

    async unlinkDevice({jwtToken}, deviceId){
        const config = {
            headers: {Authorization: jwtToken}
        };
        console.log(deviceId);
        console.log(config)
        return await axios.post(UNLINK_DEVICE, {ID : deviceId}, config)
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

    async uploadAvatar({jwtToken}, file){
       
        const config = {
            headers: { Authorization: jwtToken, 'Content-Type': 'multipart/form-data'}
        };

        return await axios.post(UPLOAD_AVATAR, file, config);

    }
}

export default new APIController();