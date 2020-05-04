import React, { Component } from "react";
import APIController from "../../api/APIController";
import { Message } from 'semantic-ui-react';

class ClusterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const { clusterInfo } = this.props;
        const stat = clusterInfo.status
        //const elements = clusterInfo 

        return (<>
            
                <div style={{
                    borderRadius: 100 + "%", width: "50px",
                    height: "50px", backgroundColor: { stat }
                }}></div>
            <Message>
                <Message.Header>Number of pending requests:</Message.Header>
                {clusterInfo.number_of_pending_tasks}</Message>
            <Message>
                <Message.Header>Server Online:</Message.Header>
                {clusterInfo.timed_out}</Message>
        </>)
    }
}

export default ClusterInfo;