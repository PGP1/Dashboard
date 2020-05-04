import React, { Component, Children, isValidElement, cloneElement } from 'react';
import { TYPES } from "../../constants";
import style from '../styles/ModuleContent.module.scss';
import { Dropdown } from 'semantic-ui-react';
import APIController from "../../api/APIController";
import * as _ from "underscore";


class ModuleContentWithFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentType: TYPES.TEMP,
            data: []
        }
    }
        
    setTypes = (value) => {
        console.log("Changing type to", value);
        const { credentials, user, device } = this.props;


        this.setState({ currentType: value }, () => {
            const { currentType } = this.state;
            this.getData(credentials, user, device, currentType)
        });
    }

    componentDidMount() {
        const { credentials, user, device } = this.props;
        const { currentType } = this.state;

        this.setState({ credentials, user, device }, () => {
            this.getData(credentials, user, device, currentType)
        });
    }

    getData = (credentials, user, device, queryType) => {
        return APIController.elasticQuery(credentials, user.idToken, device, queryType).then(res => {
            const data = res.data.hits?.hits;
            this.setState({ data }, () =>  console.log("Update graphing for", queryType));
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props, nextProps)) {
            const { credentials, user, device } = nextProps;
            this.setState({ credentials, user, device }, () => {
                this.getData(credentials, user, device, this.state.currentType);
            });
        }
    }

    render() {

        const { title, children } = this.props;
        const { currentType, data } = this.state;

        const options = Object.values(TYPES).filter(value => value !== TYPES.WATER).map((value) => { 
            return {key: value, text: value, value: value }
        });

        return <div className={style.box}>
            <div className={[style.header, "space-between"].join(" ")}>
                {title}
                <Dropdown defaultValue={currentType} 
                onChange={(e,{value}) => this.setTypes(value)} options={options}/>
            </div>
            <div className={style.chart}>
                { React.cloneElement(children, { data, currentType }) } 
            </div>
        </div>
    }
}
export default ModuleContentWithFilter;
