import React, {Component, Children, isValidElement, cloneElement} from 'react';
import style from '../styles/ModuleContent.module.scss';
import APIController from "../../api/APIController";
import * as _ from "underscore";
import { TYPES } from "../../constants";

/**
* Module Content which summary the details of the plants
* @extends React.Component
*/
class ModuleSummary extends Component {
    constructor(props) {
        super(props);
    } 
    
    render() {
        const { title, children, 
                credentials, user, liveVideo, 
                device } = this.props;
        
        return <div className={style.box}>
            <div className={style.header}>
                { title }
            </div>
            <div className={style.chart}>
                { React.cloneElement(children, { credentials, user, device, 
                    liveVideo  }) } 
            </div>
        </div>
    }
}
export default ModuleSummary;
