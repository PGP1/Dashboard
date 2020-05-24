import React, { Component } from 'react'
import {Button, Form, Message, Modal} from "semantic-ui-react";
import style from "./styles/Device.module.scss";
import APIController from "../api/APIController";
import AWSController from "../api/AWSController";
import AddDevice from "./modals/AddDevice";
import { API } from 'aws-amplify';



class SelectDevices extends Component {

    render() {
        const {  devices, setDevice, handleUnlinkDevice,
                handleAddDevice, openDeviceModal, closeDeviceModal, 
                addDeviceModalError, handleAddDeviceChange,
                addDeviceModalOpen } = this.props;

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
                                <td>
                                    <a onClick={() => setDevice(each)}> Access </a>/
                                    <a onClick={ ()=> handleUnlinkDevice(each)}> 
                                        Unlink
                                    </a>
                                </td>
                            </tr>)}
                            </tbody>
                        </table>

                        <div className={style.bottom}>
                            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                                <button onClick={openDeviceModal} 
                                        className="ui right floated primary button">
                                    Add device
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default SelectDevices;