import React, { Component, Children, isValidElement, cloneElement } from 'react';
import Sidenav from './Sidenav';
import style from './styles/Dashboard.module.scss';
import { Bar } from 'react-chartjs-2';
import AWSController from "../api/AWSController";
import APIController from "../api/APIController";

import { Checkbox, Button, Dropdown, Icon, Input, Label } from 'semantic-ui-react';
import content from "./content";
import Nav from "./Nav";

/**
* Main dashboard interface which renders the content.
* @extends React.Component
*/
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        }
    }
    
    componentWillReceiveProps(nextProps, nextContext) {
        const { setPage, setDevice } = this.props;
        if (nextProps.device !== this.props.device) {
            setDevice(nextProps.device);
        }
        if (nextProps.page !== this.props.page) {
            setPage(nextProps.page)
        }
    }

    
    renderModules = (modules) => {
        const { credentials, user, device, liveVideo, 
                handleLight, handleDrag, light } = this.props;

        return modules.map(({ title, render, Element }, index) => { 
            return <Element key={index} title={title} 
                            credentials={credentials} 
                            user={user} 
                            device={device}
                            handleLight={handleLight}
                            handleDrag={handleDrag}
                            light={light}
                            liveVideo={liveVideo}> 
                { render }
            </Element>
        });
    };

    
    render() {
        const { isAuthenticated, devices, device, credentials, user, page, 
            setDevice, notificationMessage, setPage, userDetail, 
            openDeviceModal, handleSearchInput, searchTerms} = this.props;
        
        let contents = content.filter(e => e.title.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1)
        return (
            <div className="dashboard-layout">
                {device && credentials && user &&
                    <>
                        <Sidenav setPage={setPage} page={page} setUserData={this.props.setUserData} userDetail={userDetail}/>
                        <div className={style.dashboardContent}>
                            <Nav isAuthenticated={isAuthenticated} devices={devices} 
                                openDeviceModal={openDeviceModal}
                                setDevice={setDevice} page={page} device={device} 
                                handleSearchInput={handleSearchInput}
                                credentials={credentials}
                                user={user}
                                device={device}
                                notificationMessage={notificationMessage}
                                userDetail={userDetail}/>

                            <div className={style.dashboardGridContent + (searchTerms.length > 0 ? " " + style.isSearch : "")}>
                                <div className="flex space-between align-center">
                                    <h1 className="title">Dashboard </h1>
                                    <h1 className="subtitle textOverflow">{device}</h1>
                                </div>
       
                                <div className={style.item}>
                                    { page == 1 ? this.renderModules(contents.slice(0 , 1)) : ""}
                                </div>
                                <div className={style.items}>
                                    <div className="flex">
                                        { page == 1 ? this.renderModules(contents.slice(1, 3)) : 
                                            this.renderModules(contents.slice(4, 6))}
                                    </div>
                                </div>
                                <div className={style.item}>
                                    { page == 1 ? this.renderModules(contents.slice(3, 4)) : ""}
                                </div>
                                <div className={style.items}>
                                    <div className="flex">
                                        { page !== 1 ? this.renderModules(contents.slice(6, 8)) : ""}
                                    </div>
                                </div>
                                <div className={style.item}>
                                        { page !== 1 ? this.renderModules(contents.slice(8, contents.length)) : "" }
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }
}

export default Dashboard;