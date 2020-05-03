import React, { Component } from 'react';
import APIController from "../api/APIController";
import AWSController from "../api/AWSController";
import { Button, Form, Message, Modal } from "semantic-ui-react";



class AddDevice extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            errorMsg: "",
            error: false
        }
    }
    
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

    // show = (size, dimmer) => () => {
    //     this.setState({ size, dimmer, open: true })
    // };

    close = () => {
        this.setState({ open: false })
    };

    render() {
        const { open, size, dimmer, error } = this.state;

        return (
            <Modal dimmer={dimmer} size={size} open={open} onClose={this.close}>
                <Modal.Header>Add a device</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field required>
                            <label>Device Name</label>
                            <input onChange={this.handleDeviceChange} />
                        </Form.Field>
                        {error && <Message negative>
                            <Message.Header>Uh oh!</Message.Header>
                            <p> {errorMsg} </p>
                        </Message>}
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Add' primary onClick={this.handleAddDevice} />
                </Modal.Actions>
            </Modal>
        )
    }


}

export default AddDevice;