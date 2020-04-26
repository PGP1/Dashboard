import React, { Component } from 'react';
import style from './styles/Nav.module.scss';
import AWSController from '../api/AWSController';
import { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import Notifications from './assets/Notifications.svg'
import APIController from "../api/APIController";
class Nav extends Component{

    constructor() {
        super();
        this.state = {
            username: "",
            devices: []
        }
    }
    componentDidMount() {
        AWSController.getCurrentUserName().then(username => this.setUsername(username));
        AWSController.getCurrentSession().then(user => {
            this.setUser(user);
        });
    }

    fetchDevice = (user) => {
        APIController.getMyDevices(user.idToken).then(res => {
            const { data } = res;
            this.setState({ devices: data });
        }).catch(err => console.log(err))
    };

    setUser = (user) => {
        this.setState({ user }, () => {
            this.fetchDevice(user);
        })
    };

    setUsername = (username) => {
        this.setState({ username });
    }

    render() {
        const { username, devices } = this.state;
        const options = devices.map(d => { return {key: d, text: d, value: d}});

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
                        <div className={style.topNotification}><Notifications/></div>
                    </>}

                    {this.props?.page !== 1 &&
                    <div className={style.accountHolder}>
                        <div className={style.avatar} />
                        <div className={style.username}>{username}</div>
                    </div>}
                </>}

            </div>
        )
    }



}

export default Nav;