import Link from "../components/Link";
import React, { Component } from 'react';
import Layout from "../components/Layout";
import SelectDevices from "../components/SelectDevices";
import AWSController from "../api/AWSController";
import APIController from "../api/APIController";
import Router from "next/router";
import Dashboard from "../components/Dashboard";
import io from "socket.io-client";
import AddDevice from "../components/modals/AddDevice"
import { SOCKET } from "../constants";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            page: 0, // NOTE initial 0
            userDetail: {},
            user: null,
            credentials: null,
            device: "", // NOTE inital ""
            devices: [],
            socketMessage: [],
            /* For modal add device open/close */
            addDeviceModalOpen: false,
            addDeviceModalError: null,
            /* Search Dashboard */
            searchTerms: "",
        }
        // this.socket = io(SOCKET);
    }

    componentDidMount() {
        this.getAllCrendentials();
        // this.socket.on('response', (socketMessage) => this.setState({ socketMessage }));
        this.setState({ isAuthenticating: false });
        AWSController.webSocketTest().catch(err => console.log("err", err));
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
                AWSController.getLiveVideo(Credentials).then(res => {
                    console.log("res", res)
                    this.setState({ liveVideo: res.HLSStreamingSessionURL }, 
                        () => console.log("Live video", this.state.liveVideo))
                })
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

    /* Add device modal codes*/
    openDeviceModal = () => {
        console.log("OPEN MODALLLLL")
        this.setState({ addDeviceModalOpen: true })
    }

    closeDeviceModal = () => {
        this.setState({ addDeviceModalOpen: false })
    }

    handleAddDevice = () => {
        const { addDeviceName, user } = this.state;
        APIController.linkMyDevice(user.idToken, addDeviceName).then(res => {
            this.closeDeviceModal();
            this.fetchDevice(user);
        }).catch(err => {
            if(err.response) {
                this.setState({ addDeviceModalError: err.response.data.message });
            }
        })
    };

    handleAddDeviceChange = (event) => {
        this.setState({ addDeviceName: event.target.value }) ;
    }

    handleUnlinkDevice = (device) => {
        const { user } = this.state;
        APIController.unlinkDevice(user.idToken, device)
        .then(res => { this.fetchDevice(this.props.user) })
        .catch(err => console.log("Unlink Error", err));
    }

    /* Handle search inputs */
    handleSearchInput = (event) => {
        this.setState({ searchTerms: event.target.value });
    }

    conditionRender() {
        const { page, user, device, devices, userDetail, credentials, 
                addDeviceModalOpen, addDeviceModalError, searchTerms, liveVideo} = this.state;
        switch(page) {
            case 0:
                return <SelectDevices user={user} devices={devices} props={this.props} 
                                      setDevice={this.setDevice}
                                      openDeviceModal={this.openDeviceModal}
                                      addDeviceModalError={addDeviceModalError}
                                      addDeviceModalOpen={addDeviceModalOpen}
                                      closeDeviceModal={this.closeDeviceModal}
                                      handleUnlinkDevice={this.handleUnlinkDevice}
                                      handleAddDeviceChange={this.handleAddDeviceChange}
                                      handleAddDevice={this.handleAddDevice}
                                      fetchDevice={this.fetchDevice} 
                                      userDetail={userDetail}/>
            default:
                return <Dashboard credentials={credentials} userDetail={userDetail} user={user} 
                            page={page} setUserData={this.setUserData}
                            setDevice={this.setDevice} device={device} 
                            openDeviceModal={this.openDeviceModal}
                            handleSearchInput={this.handleSearchInput}
                            searchTerms={searchTerms}
                            liveVideo={liveVideo}
                            setUser={this.setUser} setPage={this.setPage}/>
        }
    }

    render() {
        const { isAuthenticated, page, device, userDetail, devices, socketMessage } = this.state;

        return (
            <>
                {isAuthenticated && devices &&
                    <>
                    <AddDevice addDeviceModalOpen={this.state.addDeviceModalOpen} 
                                handleAddDevice={this.handleAddDevice}
                                addDeviceModalError={this.state.addDeviceModalError}
                                handleAddDeviceChange={this.handleAddDeviceChange}
                                closeDeviceModal={this.closeDeviceModal}/>
                    <Layout isAuthenticated={isAuthenticated} page={page} 
                            device={device}
                            userDetail={userDetail}
                            devices={devices} socketMessage={socketMessage}
                            setDevice={this.setDevice}>
                        {this.conditionRender()}
                    </Layout>
                    </>
                }
            </>)
    }
}

export default Index;