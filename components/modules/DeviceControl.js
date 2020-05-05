import React, { Component } from 'react';
import style from '../styles/DeviceControl.module.scss';
import { Label, Button } from 'semantic-ui-react';
import Slider from 'rc-slider';
import APIController from "../../api/APIController";

export default class DeviceControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            light: 50
        };
    }

    handleDrag = (light) => {
        this.setState({ light })
    }

    handleSubmit = () => {
        const { user, device } = this.props;
        const { light } = this.state;
        console.log("data", light);
        APIController.controlDevice(user.idToken, device, light).then((data) => {
            console.log("data-light", data);
        }).catch(err => console.log("errrrr", err))
    }

    render() {
        const { light } = this.state;
       
        return (<div className={style.buttonsContainer}>
            <div className={style.slider}>
                <div className={style.buttonHeader}>
                    Light <Label style={{ float: "right" }}>{light}</Label>
                </div>

                <div>
                    <Slider onChange={this.handleDrag} min={0} max={255} defaultValue={50} 
                            onAfterChange={this.handleSubmit}/>
                </div>

            </div>
          
            {/* <div className={style.groupedButtons}>
            <div>
                <div className={style.buttonHeader}>
                    Pump
                </div>
                <Checkbox toggle />
            </div>
            <div>
                <div className={style.buttonHeader}>
                    Fan
                </div>
                <Checkbox toggle />
            </div>
        </div> */}
        </div>)
    }
}