import Link from "../components/Link";
import React, { Component } from 'react';
import Layout from "../components/Layout";
import SelectDevices from "../components/SelectDevices";
import AWSController from "../api/AWSController";
import APIController from "../api/APIController";
import Router from "next/router";
import Dashboard from "../components/Dashboard";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            page: 0,
            userDetail: {},
            user: null,
            device: "",
            devices: []
        }
    }


    componentDidMount() {
        AWSController.getCurrentSession().then(session => {
            this.setAuthenticate(true);
            this.setUser(session);
            APIController.getUserData(session.idToken).then(d => {
                this.setUserData(d.data);
            })
        }).catch(err => Router.push("/login"));

        this.setState({ isAuthenticating: false });


    }

    setUser = (user) => {
        this.setState({ user }, () => {
            this.fetchDevice(user);
        })
    };

    fetchDevice = (user) => {
        APIController.getMyDevices(user.idToken).then(res => {
            const { data } = res;
            this.setState({ devices: data });
        }).catch(err => { 
            this.setState({ devices: [] });
        });
    };


    setDevice = (device) => {
        this.setState({ device: device, page: 1 })
    }

    setPage = (page) => {
        this.setState({ page });
    }

    setAuthenticate = () => {
        this.setState({ isAuthenticated: true });
    };

    setUserData = (userDetail) => {
        this.setState({ userDetail });
    }

    conditionRender() {
        const { page, user, device, devices, userDetail } = this.state;
        switch(page) {
            case 0:
                return <SelectDevices user={user} devices={devices} props={this.props} 
                                      setDevice={this.setDevice} 
                                      fetchDevice={this.fetchDevice} userDetail={userDetail}/>
            default:
                return <Dashboard user={this.state.user} page={page} device={device} setPage={this.setPage}/>
        }
    }

    render() {
        const { isAuthenticated, page, device, userDetail, devices } = this.state;

        return (
            <>
                {isAuthenticated && devices &&
                    <Layout isAuthenticated={isAuthenticated} page={page} 
                            device={device}
                            userDetail={userDetail}
                            devices={devices}
                            setDevice={this.setDevice}>
                        {this.conditionRender()}
                    </Layout>
                }
            </>)
    }
}

export default Index;