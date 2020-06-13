import React, {Component, Children, isValidElement, cloneElement} from 'react';
import style from '../styles/ModuleContent.module.scss';
import APIController from "../../api/APIController";
import * as _ from "underscore";
import { RESOURCES } from "../../constants";

/**
* Module Content is a interface to holds Dashboard Component
* @extends React.Component
*/
class ModuleContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clusterInfo: {},
            data: [],
            currentType: RESOURCES
        }
    }  

    componentDidMount() {
        const { credentials, user, device } = this.props;
        const { currentType } = this.state;

        this.setState({ credentials, user, device }, () => {
            this.getData(credentials, user, device, currentType);
            this.getClusterInfo(credentials, user, device)
        });
    }
    
    getClusterInfo = (credentials, user, device) => { 
        APIController.elasticClusterQuery(credentials, user.idToken, device).then(res => {
            this.setState({ clusterInfo: res.data })
        }) 
    }

    getData = (credentials, user, device, queryType) => {
        return APIController.elasticQuery(credentials, user.idToken,
                                            device, queryType).then(res => {
            const data = res.data.hits?.hits;
            const aggregation = res.data.aggregations?.avgBucket.buckets;
            this.setState({ data, aggregation });
        })
    }

    componentWillReceiveProps(nextProps) {
        const { currentType } = this.state;
        if (!_.isEqual(this.props, nextProps)) {
            const { credentials, user, device } = nextProps;
            this.setState({ credentials, user, device }, () => {
                this.getData(credentials, user, device, currentType);
            });
        }
    }

    render() {
        const { title, children, device, user, handleLight, handleDrag, light } = this.props;
        const { data, clusterInfo, aggregation } = this.state;
        
        return <div className={style.box}>
            <div className={style.header}>
                { title }
            </div>
            <div className={style.chart}>
                { React.cloneElement(children, { data, clusterInfo, device,
                     user, aggregation, handleLight, handleDrag, light }) } 
            </div>
        </div>
    }
}
export default ModuleContent;
