import React, { Component } from 'react'
import {Button, Form, Message, Modal} from "semantic-ui-react";
import style from "./styles/Device.module.scss";
import APIController from "../api/APIController";
import AWSController from "../api/AWSController";


class SelectDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            open: false,
            devices: [],
            error: false,
            errorMsg: ""
        }
    }

    componentDidMount() {
        AWSController.getCurrentSession().then(user => {
            this.setUser(user);
        });
    }

    handleDeviceChange = (event) => {
        this.setState({ deviceName: event.target.value }) ;
    };

    handleAddDevice = () => {
        const { user, deviceName } = this.state;
        APIController.linkMyDevice(user.idToken, deviceName).then(res => {
            this.close();
            this.fetchDevice(user);
        }).catch(err => {
            if(err.response) {
                this.setState({error: true, errorMsg: err.response.data.message });
            }
        })
    };

    setUser = (user) => {
        this.setState({ user }, () => {
            this.fetchDevice(user);
        })
    };

    show = (size, dimmer) => () => {
        this.setState({ size, dimmer, open: true })
    };

    close = () => {
        this.setState({ open: false })
    };

    fetchDevice = (user) => {
        APIController.getMyDevices(user.idToken).then(res => {
            const { data } = res;
            this.setState({ devices: data });
        }).catch(err => console.log(err))
    };

    render() {
        const { open, size, dimmer, devices, errorMsg, error } = this.state;

        return <div className={style.container}>
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
                            <button onClick={this.show('small', 'blurring')} className="ui right floated primary button">
                                Add device
                            </button>
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
    }
}

export default SelectDevices;