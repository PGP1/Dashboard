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
            page: 1,
        }
    }


    componentDidMount() {
        AWSController.getCurrentSession().then(session => {
            this.setAuthenticate(true);
        }).catch(err => Router.push("/login"));

        this.setState({ isAuthenticating: false });
    }

    setAuthenticate = () => {
        this.setState({ isAuthenticated: true });
    };

    conditionRender() {
        const { page } = this.state;
        switch(page) {
            case 0:
                return <SelectDevices/>
            default:
                return <Dashboard/>
        }
    }

    render() {
        const { isAuthenticated, page } = this.state;

        return (
            <>
                {isAuthenticated &&
                    <Layout isAuthenticated={isAuthenticated} page={page}>
                        {this.conditionRender()}
                    </Layout>
                }
            </>)
    }
}

export default Index;