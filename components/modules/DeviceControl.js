import React, { Component } from 'react';
import style from '../styles/DeviceControl.module.scss';
import { Label, Button } from 'semantic-ui-react';
import Slider from 'rc-slider';
import APIController from "../../api/APIController";

export default class DeviceControl extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { light, handleLight, handleDrag } = this.props;
       
        return (<div className={style.buttonsContainer}>
            <div className={style.slider}>
                <div className={style.buttonHeader}>
                    Light <Label style={{ float: "right" }}>{light}</Label>
                </div>
                <div>
                    <Slider onChange={handleDrag} min={0} max={255} defaultValue={light} 
                            onAfterChange={handleLight}/>
                </div>
            </div>
        </div>)
    }
}