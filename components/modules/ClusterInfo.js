import React, { Component } from "react";
import APIController from "../../api/APIController";
import { Message } from 'semantic-ui-react';
import style from '../styles/ClusterInfo.module.scss';

/**
* Dashboard component which holds cluster information of 
* elastic search instance.
* @extends React.Component
*/
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
        let statusCol = "";

        if (clusterInfo.timed_out) {
            timeStr = "Offline";
            statusCol = "red";
        } else {
            timeStr = "Online"
            statusCol = "green"
        };

        if (stat == 'yellow') {
            statusStr = "Moderate";
        } else if (stat == "green") {
            statusStr = "Low";
        } else statusStr = "Calculating";

        return (
            <>
                <Message style={{ marginTop: "20px" }} className={style.statusInfo}>
                    Server Traffic:
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "3px" }} className={["circle bg-", stat].join('')} />
                        <span className={["c-",stat].join('')}>{statusStr}</span>
                    </div>
                </Message>

                <Message className={style.statusInfo}>
                    <span>Server Online:</span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "3px" }} className={["circle bg-", statusCol].join('')} />
                        <span className={["c-",statusCol].join('')}>{timeStr}</span>
                    </div>
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