import React, { Component } from 'react';
import style from './styles/Nav.module.scss';
import AWSController from '../api/AWSController';
import { useState } from 'react';
import { Dropdown, Button, Icon } from 'semantic-ui-react';
import AddDeviceIcon from './assets/AddDevice.svg';
import NotificationPopup from './NotificationPopup';

/**
* Nav component for the dashboard
* @extends React.Component
*/
class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopup: false
        }
    }

    togglePopup = () => {
        this.setState({ showPopup: !this.state.showPopup });
    }

    render() {

        const { userDetail, devices, device, credentials, user, notificationMessage, handleSearchInput } = this.props;
        const options = devices ?.map(d => { return { key: d, text: d, value: d } });

        return (
            <div className={[style.nav, "flex", "align-center"].join(" ")}>
                {this.props?.page == 0 && <div className={style.logo}>Plantly.</div>}
                {this.props ?.isAuthenticated && <>
                    {this.props ?.page !== 0 &&
                        <>
                            <div className={"ui action input left icon " + style.search}>
                                <i className="search icon"></i>
                                <input type="text" className="customInput" placeholder="Search..." onChange={handleSearchInput}/>
                                <button className="ui button d-purple">Search</button>
                            </div>
                            <div className={"flex align-center space-between " + style.items}>
                                <Dropdown placeholder='Select Device' options={options} className={[style.deviceSelect].join(" ")} defaultValue={this.props ?.device}
                                    onChange={(e, { value }) => this.props ?.setDevice(value)} />
                                <AddDeviceIcon onClick={this.props.openDeviceModal}/>
                                <div className={style.topNotification} onClick={this.togglePopup.bind(this)}>
                                    {this.state.showPopup ? <NotificationPopup 
                                                                credentials={credentials}
                                                                user={user}
                                                                device={device}
                                                                notificationMessage={notificationMessage} 
                                                                closePopup={this.togglePopup.bind(this)} /> : null}
                                </div>
                            </div>
                          
                        </>}

                    {this.props ?.page == 0 &&
                        <div className={style.accountHolder}>
                            <div className={style.avatar} style={{ backgroundImage: `url(${userDetail ?.avatar})` }} />
                            <div className={style.username}>{userDetail ?.username}</div>
                            <a style={{marginLeft:"10px"}} className={"ui right floated light-grey button"} href="/" onClick={AWSController.signOut}> Log out </a>
                        </div>}
                </>}

            </div>
        )
    }

}

export default Nav;