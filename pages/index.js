import Link from "../components/Link";
import React, { Component } from 'react';
import Layout from "../components/Layout";
import SelectDevices from "../components/SelectDevices";
import AWSController from "../api/AWSController";
import APIController from "../api/APIController";
import Router from "next/router";
import Dashboard from "../components/Dashboard";
import io from "socket.io-client";
import { SOCKET } from "../constants";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            page: 1, // NOTE initial 0
            userDetail: {},
            user: null,
            credentials: null,
            device: "c0cb03a49a754a17b07b85c4d4f19039", // NOTE inital ""
            devices: [],
            socketMessage: []
        }
        this.socket = io(SOCKET);
    }

    componentDidMount() {
        this.getAllCrendentials();
        this.socket.on('response', (socketMessage) => this.setState({ socketMessage }));
        this.setState({ isAuthenticating: false });
    }

    getAllCrendentials = () => {
        AWSController.getCurrentSession().then(user => {
            this.setAuthenticate(true);
            this.setUser(user);
            APIController.getUserData(user.idToken).then(d => {
                this.setUserData(d.data);
            })
            AWSController.getCurrentCredientials().then(d => {
                const { Credentials } = d.data;
                this.setState({ credentials: Credentials })
            });
        }).catch(err => Router.push("/login"));
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
        const { page, user, device, devices, userDetail, credentials } = this.state;
        switch(page) {
            case 0:
                return <SelectDevices user={user} devices={devices} props={this.props} 
                                      setDevice={this.setDevice} 
                                      fetchDevice={this.fetchDevice} userDetail={userDetail}/>
            default:
                return <Dashboard credentials={credentials} userDetail={userDetail} user={user} 
                            page={page} setUserData={this.setUserData}
                            setDevice={this.setDevice} device={device} 
                            setUser={this.setUser} setPage={this.setPage}/>
        }
    }

    render() {
        const { isAuthenticated, page, device, userDetail, devices, socketMessage } = this.state;

        return (
            <>
                {isAuthenticated && devices &&
                    <Layout isAuthenticated={isAuthenticated} page={page} 
                            device={device}
                            userDetail={userDetail}
                            devices={devices} socketMessage={socketMessage}
                            setDevice={this.setDevice}>
                        {this.conditionRender()}
                    </Layout>
                }
            </>)
    }
}

export default Index;