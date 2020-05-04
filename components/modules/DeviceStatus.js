import React, { Component } from 'react'
import style from "../styles/DeviceStatus.module.scss";
import APIController from "../../api/APIController";
import moment from "moment";

class DeviceStatus extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

   
    render() {
        const { device, data } = this.props;
        
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