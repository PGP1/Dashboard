import Link from "../components/Link";
import React, { Component } from 'react';
import style from "./styles/device.module.scss";
import Layout from "../components/Layout";
import AWSController from "../api/AWSController";
import Router from "next/router";
import { Modal, Form, Icon, Button } from 'semantic-ui-react';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            user: null,
            open: false
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
        this.setState({ user })
    };

    componentDidMount() {
        AWSController.getCurrentSession().then(session => {
            this.setAuthenticate(true);
            console.log("session", session);
            AWSController.getCurrentSession().then(user => {
                this.setUser(user);
                console.log("user", this.state.user);
            });
        }).catch(err => Router.push("/login"));

        this.setState({ isAuthenticating: false });
    }

    render() {
        const { isAuthenticated, open, size, dimmer } = this.state;

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
                                                <tr>
                                                    <td>Device 1</td>
                                                    <td>Online</td>
                                                    <td>Access / Shutdown</td>
                                                </tr>
                                                <tr>
                                                    <td>Device 1</td>
                                                    <td>Online</td>
                                                    <td>Access / Shutdown</td>
                                                </tr>
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
                                                            <input />
                                                        </Form.Field>
                                                    </Form>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button content='Add' primary />
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