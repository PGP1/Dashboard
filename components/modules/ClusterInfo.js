import React, { Component } from "react";
import APIController from "../../api/APIController";
import { Message } from 'semantic-ui-react';
import style from '../styles/ClusterInfo.module.scss';

class ClusterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const { clusterInfo } = this.props;
        const stat = clusterInfo.status;
        let statusStr = "";
        let timeStr = "";

        if (clusterInfo.timed_out) {
            timeStr = "Offline";
        } else timeStr = "Online";

        if (stat == 'yellow') {
            statusStr = "Moderate";
        } else if (stat == "green") {
            statusStr = "Low";
        } else statusStr = "Calculating";

        return (
            <>
                {/* <div>
                    <div style={{ fontFamily: "Poppins", fontSize: 1.15 + "rem", letterSpacing: 0.16 + "px" }}>Server Status </div>
                     />
                </div> */}
                <Message style={{marginTop:"20px"}} className={style.statusInfo}>
                    Server Traffic:
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "3px" }} className={["circle bg-", stat].join('')} />
                        {statusStr}
                    </div>
                </Message>

                <Message className={style.statusInfo}>
                    <span>Server Online:</span>
                    <span>{timeStr}</span>
                </Message>

                <Message className={style.statusInfo}>
                    <span>Number of pending requests: </span>
                    <span>{clusterInfo.number_of_pending_tasks}</span>
                </Message>

            </>
        )
    }
}

export default ClusterInfo;