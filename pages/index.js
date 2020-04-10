import Link from "../components/Link";
import React, { Component } from 'react';
import style from "./styles/device.module.scss";
import Layout from "../components/Layout";
import AWSController from "../api/AWSController";
import APIController from "../api/APIController.js";
import Router from "next/router";
import { Modal, Form, Icon, Button, Message } from 'semantic-ui-react';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            user: null,
            open: false,
            devices: [],
            error: false,
            errorMsg: ""
        }
    }

    show = (size, dimmer) => () => {
        this.setState({ size, dimmer, open: true })
    };

    close = () => {
        this.setState({ open: false })
    };

    setAuthenticate = () => {
        this.setState({ isAuthenticated: true });
    };

    setUser = (user) => {
        this.setState({ user }, () => {
            this.fetchDevice(user);
        })
    };

    fetchDevice = (user) => {
        APIController.getMyDevices(user.idToken).then(res => {
            const { data } = res;
            this.setState({ devices: data });
        }).catch(err => console.log(err))
    };

    componentDidMount() {
        AWSController.getCurrentSession().then(session => {
            this.setAuthenticate(true);
            AWSController.getCurrentSession().then(user => {
                this.setUser(user);
            });
        }).catch(err => Router.push("/login"));

        this.setState({ isAuthenticating: false });
    }

    handleDeviceChange = (event) => {
        this.setState({ deviceName: event.target.value }) ;
    };

    handleAddDevice = () => {
        const { user, deviceName } = this.state;
        APIController.linkMyDevice(user.idToken, deviceName).then(res => {
            this.close();
            this.fetchDevice();
        }).catch(err => {
            if(err.response) {
                this.setState({error: true, errorMsg: err.response.data.message });
            }
        })
    };

    render() {
        const { isAuthenticated, open, size, dimmer, devices, errorMsg, error } = this.state;

        return (
            <>
                {isAuthenticated &&
                    <Layout isAuthenticated={isAuthenticated}>
                        <div className={style.container}>
                            <div className={style.formCenter}>
                                <div className={style.form}>
                                    <div className={style.content}>
                                        <h1> Register your devices </h1>
                                        <table className="ui blue table center aligned segment">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {devices.map((each, i) =>  <tr key={i}>
                                                    <td>{each}</td>
                                                    <td>Online</td>
                                                    <td>Access / Shutdown</td>
                                                </tr>)}
                                            </tbody>
                                        </table>

                                        <div className={style.bottom}>
                                            <button onClick={this.show('small', 'blurring')} className="ui right floated primary button"> Add device</button>
                                            <Modal dimmer={dimmer} size={size} open={open} onClose={this.close}>
                                                <Modal.Header>Add a device</Modal.Header>
                                                <Modal.Content>
                                                    <Form>
                                                        <Form.Field required>
                                                            <label>Device Name</label>
                                                            <input onChange={this.handleDeviceChange}/>
                                                        </Form.Field>
                                                        {error && <Message negative>
                                                            <Message.Header>Uh oh!</Message.Header>
                                                            <p> {errorMsg} </p>
                                                        </Message>}
                                                    </Form>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button content='Add' primary onClick={this.handleAddDevice}/>
                                                </Modal.Actions>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Layout>
                }
            </>)
    }
}

export default Index;