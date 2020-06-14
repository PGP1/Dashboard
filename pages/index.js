import Link from "../components/Link";
import React, { Component } from 'react';
import Layout from "../components/Layout";
import SelectDevices from "../components/SelectDevices";
import AWSController from "../api/AWSController";
import APIController from "../api/APIController";
import Router from "next/router";
import Dashboard from "../components/Dashboard";
import AddDevice from "../components/modals/AddDevice"

/**
 * Main state storage, which stores all the user's credentials, device details
 * @extends React.Component
 */
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
            notificationMessage: null,
            /* For modal add device open/close */
            addDeviceModalOpen: false,
            addDeviceModalError: null,
            /* Search Dashboard */
            searchTerms: "",
            /* light */
            light: 50
        }
    }

    componentDidMount() {
        this.getAllCrendentials();
        this.setState({ isAuthenticating: false });
    }

    setNotificationMessage = (msg) => {
        this.setState({ notificationMessage: msg });
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
                // AWSController.getLiveVideo(Credentials).then(res => {
                //     this.setState({ liveVideo: res.HLSStreamingSessionURL }, 
                //         () => console.log("Live video", this.state.liveVideo))
                // })
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
        const { userDetail } = this.state;
        console.log("mydevice", device);
        this.setState({ device: device, page: 1 }, () => {
            AWSController.subscribeNotifications(device, userDetail.username, this.setNotificationMessage)
            .catch(err => console.error("err", err));
        });
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
        .then(res => { this.fetchDevice(user) })
        .catch(err => console.error("Unlink Error", err));
    }

    /* Handle search inputs */
    handleSearchInput = (event) => {
        this.setState({ searchTerms: event.target.value });
    }

    /* Handle Lights */
    handleLight = () => {
        const { user, device, light } = this.state;
        APIController.controlDevice(user.idToken, device, light)
        .catch(err => console.error("light error", err))
    }


    handleDrag = (light) => {
        this.setState({ light })
    }

    
    conditionRender() {
        const { page, user, device, devices, userDetail, credentials, 
                addDeviceModalOpen, addDeviceModalError, searchTerms, 
                liveVideo, light, notificationMessage} = this.state;
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
                            handleLight={this.handleLight}
                            handleDrag={this.handleDrag}
                            notificationMessage={notificationMessage}
                            light={light}
                            setUser={this.setUser} setPage={this.setPage}/>
        }
    }



    render() {
        const { isAuthenticated, page, device, userDetail, devices } = this.state;

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
                            devices={devices}
                            setDevice={this.setDevice}>
                        {this.conditionRender()}
                    </Layout>
                    </>
                }
            </>)
    }
}

export default Index;