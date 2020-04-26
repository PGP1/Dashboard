import Link from "../components/Link";
import React, { Component } from 'react';
import Layout from "../components/Layout";
import SelectDevices from "../components/SelectDevices";
import AWSController from "../api/AWSController";
import Router from "next/router";
import Dashboard from "../components/Dashboard";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            page: 0,
            device: "",
        }
    }


    componentDidMount() {
        AWSController.getCurrentSession().then(session => {
            this.setAuthenticate(true);
        }).catch(err => Router.push("/login"));

        this.setState({ isAuthenticating: false });
    }

    setDevice = (device) => {
        this.setState({ device: device, page: 1 })
    }

    setPage = (page) => {
        this.setState({ page });
    }

    setAuthenticate = () => {
        this.setState({ isAuthenticated: true });
    };

    conditionRender() {
        const { page, device } = this.state;
        switch(page) {
            case 0:
                return <SelectDevices setDevice={this.setDevice}/>
            default:
                return <Dashboard device={device} setPage={this.setPage}/>
        }
    }

    render() {
        const { isAuthenticated, page, device } = this.state;

        return (
            <>
                {isAuthenticated &&
                    <Layout isAuthenticated={isAuthenticated} page={page} device={device} setDevice={this.setDevice}>
                        {this.conditionRender()}
                    </Layout>
                }
            </>)
    }
}

export default Index;