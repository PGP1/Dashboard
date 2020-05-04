import React, { Component } from 'react';
import style from './styles/Nav.module.scss';
import AWSController from '../api/AWSController';
import { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import Notifications from './assets/Notifications.svg'
import APIController from "../api/APIController";
import NotificationPopup from './NotificationPopup';    

class Nav extends Component{

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
       
        const { userDetail, devices, setDevice, page } = this.props;
        const options = devices?.map(d => { return {key: d, text: d, value: d}});

        return (
            <div className={[style.nav, "flex", "align-center"].join(" ")}>
                <div className={style.logo}>Plantly.</div>
                {this.props?.isAuthenticated && <>
                    {this.props?.page !== 0 &&
                    <>
                        <div className={style.topDropdown}>
                            <Dropdown selection placeholder='Select Device' options={options} defaultValue={this.props?.device}
                                      onChange={(e, {value}) => this.props?.setDevice(value)}/>
                        </div>
                        <div className={style.topNotification}><Notifications style={{cursor:'pointer'}} onClick={this.togglePopup.bind(this)}/>
                            {this.state.showPopup ? <NotificationPopup closePopup={this.togglePopup.bind(this)}/> : null}
                        </div>
                    </>}

                    {this.props?.page == 0 &&
                    <div className={style.accountHolder}>
                        <div className={style.avatar} style={{backgroundImage: `url(${userDetail?.avatar})`}}/>
                        <div className={style.username}>{userDetail?.username}</div>
                    </div>}
                </>}

            </div>
        )
    }

}

export default Nav;