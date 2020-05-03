import React, { Component } from "react";
import APIController from "../../api/APIController";

class ClusterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getClusterInfo();
    }


    getClusterInfo = () => {
        const { credentials, device, user } = this.props;

        APIController.elasticClusterQuery(credentials, user.idToken, device).then(res => {
            console.log("Res asdasd ", res);
            const data = res.data.hits?.hits;
            console.log("data asdasd", data)
        })
    }

    render() {
        return <> Your implementation </>
    }
}

export default ClusterInfo;