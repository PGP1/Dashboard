import axios from 'axios';
import { DEVICE_LIST, LINK_DEVICE } from "../constants";
class APIController {

    async getMyDevices({ jwtToken }) {
        const config = {
            headers: { Authorization: jwtToken }
        };
        console.log("jwtToken", jwtToken);
        return await axios.post(DEVICE_LIST, {}, config);
    }


    async linkMyDevice({ jwtToken }, device) {
        const config = {
            headers: { Authorization: jwtToken }
        };
        return await axios.post(LINK_DEVICE, { device }, config);
    }
}

export default new APIController();