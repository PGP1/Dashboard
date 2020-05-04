import React, { Component } from 'react';
import style from '../styles/DeviceControl.module.scss';
import { Label } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

export default class DeviceControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            light: 50
        };
    }

    render() {
        const { light } = this.state;
        const settings = {
            start: 50,
            min: 0,
            max: 255,
            step: 1,
            onChange: light => {
                this.setState({ light });
            }
        };

        return (<div className={style.buttonsContainer}>
            <div className={style.slider}>
                <div className={style.buttonHeader}>
                    Light <Label style={{ float: "right" }}>{light}</Label>
                </div>

                <div>
                    <Slider
                        value={light}
                        color="blue"
                        inverted={false}
                        settings={settings}
                    />
                </div>

            </div>
            {/* <div>
            <div className={style.buttonHeader} />
            <Button color='blue'>
                Pump
            </Button>
        </div> */}

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