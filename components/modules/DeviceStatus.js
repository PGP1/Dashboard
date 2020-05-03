import React, { Component } from 'react'
import style from "../styles/DeviceStatus.module.scss";
import APIController from "../../api/APIController";
import moment from "moment";

class DeviceStatus extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    componentDidMount() {
        this.getStatusDevice();
    }


    getStatusDevice = () => {
        const { device, user } = this.props;
        
        APIController.getStatusDevice(user.idToken, device).then(data => {
            this.getDeviceResource();
        })
    }

    getDeviceResource = () => {
        const { credentials, device, user } = this.props;

        APIController.elasticQuery(credentials, user.idToken, device, "resources").then(res => {
            const data = res.data.hits?.hits[0]._source;
            this.setState({ data });
        })
    }

    render() {
        const { device } = this.props;
        const { data } = this.state;

        return <>
            { data && <>
                    <div className={style.grid}>
                            <div>Device ID</div>
                            <div style={{ color: "#BDBDBD" }}>{device}</div>
                            <div>Uptime</div>
                            <div style={{ color: "#BDBDBD" }}>{moment.utc(data.uptime*1000).format('HH:mm:ss')} hours</div>
                    </div>

                    <div className={"justify-center"}>
                        <button className="ui black button">Restart</button>
                    </div>
                </>
            }
        </>
    }
}


export default DeviceStatus;