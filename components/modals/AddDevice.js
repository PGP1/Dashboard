import React, { Component } from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

/**
* Add device modal popup render
* @extends React.Component
*/
class AddDevice extends Component {

    render() {
        const  { addDeviceModalError, addDeviceModalOpen, 
                    closeDeviceModal, handleAddDevice, handleAddDeviceChange } = this.props;
        return <Modal size={"small"} 
                      open={addDeviceModalOpen} 
                      onClose={closeDeviceModal}>
        <Modal.Header>Add a device</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field required>
                    <label>Device Name</label>
                    <input onChange={handleAddDeviceChange}/>
                </Form.Field>
                {addDeviceModalError && <Message negative>
                    <Message.Header>Uh oh!</Message.Header>
                    <p> {addDeviceModalError} </p>
                </Message>}
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button content='Add' primary onClick={handleAddDevice}/>
        </Modal.Actions>
    </Modal> 
    }
}


export default AddDevice;