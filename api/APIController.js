import axios from 'axios';
import { DEVICE_LIST, LINK_DEVICE,UNLINK_DEVICE, ELASTIC_QUERY, USER_DATA, UPLOAD_AVATAR,
     STATUS_DEVICE_REQUEST, ELASTIC_CLUSTER_QUERY, CONTROL_DEVICE} from "../constants";

/**
* Main API Controller, which handles all the API calls to API gateway
*/
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

    async elasticClusterQuery({ AccessKeyId, SecretKey, SessionToken }, { jwtToken }, DeviceId) {
        const config = {
            headers: { Authorization: jwtToken }
        };

        return await axios.post(ELASTIC_CLUSTER_QUERY, { AccessKeyId, SecretKey, SessionToken, DeviceId }, config);
    }

    

    async uploadAvatar({ jwtToken }, file){
       
        const config = {
            headers: { Authorization: jwtToken, 'Content-Type': 'multipart/form-data'}
        };

        return await axios.post(UPLOAD_AVATAR, file, config);
    }

    async getStatusDevice({ jwtToken }, deviceId) {
        const config = {
            headers: { Authorization: jwtToken }
        };

        return await axios.post(STATUS_DEVICE_REQUEST, { id: deviceId }, config);
    }

    async controlDevice({ jwtToken }, deviceId, light) {
        const config = {
            headers: { Authorization: jwtToken }
        };

        return await axios.post(CONTROL_DEVICE, { 
            id: deviceId, 
            light: light, 
            pump: 0, 
            fan: 0, 
            type: "arduino" 
        }, config);
    }
}

export default new APIController();