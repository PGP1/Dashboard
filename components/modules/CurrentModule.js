import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import APIController from "../../api/APIController";
import moment from 'moment';
import { TYPES, RESOURCES  } from "../../constants";
import style from "../styles/CurrentModule.module.scss";
const QUERY_TYPE = 'humidity';

class CurrentModule extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        // const { data, currentType, getData } = this.props;
    
        return <div class="flex space-around">
                <Water {...this.props}/>
                <Ph {...this.props}/>
                <Temp {...this.props}/>
                <Humidity {...this.props}/>
                <Ldr {...this.props}/>
            </div>
    }
}


class Water extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const { credentials, user, device } = this.props;

        this.setState({ credentials, user, device }, () => {
            this.getData(credentials, user, device, TYPES.WATER);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props, nextProps)) {
            const { credentials, user, device } = nextProps;
            this.setState({ credentials, user, device }, () => {
                this.getData(credentials, user, device, TYPES.WATER);
            });
        } 
    }

    getData = (credentials, user, device, type) => {
        APIController.elasticQuery(credentials, user.idToken, device, type).then(res => {
            const data = res.data.hits?.hits;
            const val = data.map(item => item._source.value)[0];
            this.setState({ data: val })
        });
    }

    render() {
        const { data } = this.state;

        return <div class={style.field}>
            <div class={style.heading}> Water </div>
            <div class={style.data}>
                {data}
            </div>
        </div>
    }
}

class Ph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const { credentials, user, device } = this.props;

        this.setState({ credentials, user, device }, () => {
            this.getData(credentials, user, device, TYPES.PH);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props, nextProps)) {
            const { credentials, user, device } = nextProps;
            this.setState({ credentials, user, device }, () => {
                this.getData(credentials, user, device, TYPES.PH);
            });
        } 
    }

    getData = (credentials, user, device, type) => {
        APIController.elasticQuery(credentials, user.idToken, device, type).then(res => {
            const data = res.data.hits?.hits;
            const val = data.map(item => item._source.value)[0];
            this.setState({ data: val })
        });
    }

    render() {
        const { data } = this.state;

        return <div class={style.field}>
            <div class={style.heading}> PH </div>
            <div class={style.data}>
                {data}
            </div>
        </div>
    }
}

class Temp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const { credentials, user, device } = this.props;

        this.setState({ credentials, user, device }, () => {
            this.getData(credentials, user, device, TYPES.TEMP);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props, nextProps)) {
            const { credentials, user, device } = nextProps;
            this.setState({ credentials, user, device }, () => {
                this.getData(credentials, user, device, TYPES.TEMP);
            });
        } 
    }

    getData = (credentials, user, device, type) => {
        APIController.elasticQuery(credentials, user.idToken, device, type).then(res => {
            const data = res.data.hits?.hits;
            const val = data.map(item => item._source.value)[0];
            this.setState({ data: val })
        });
    }

    render() {
        const { data } = this.state;

        return <div class={style.field}>
            <div class={style.heading}> Temp </div>
            <div class={style.data}>
                {data}
            </div>
        </div>
    }
}

class Humidity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const { credentials, user, device } = this.props;

        this.setState({ credentials, user, device }, () => {
            this.getData(credentials, user, device, TYPES.HUMIDITY);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props, nextProps)) {
            const { credentials, user, device } = nextProps;
            this.setState({ credentials, user, device }, () => {
                this.getData(credentials, user, device, TYPES.HUMIDITY);
            });
        } 
    }

    getData = (credentials, user, device, type) => {
        APIController.elasticQuery(credentials, user.idToken, device, type).then(res => {
            const data = res.data.hits?.hits;
            const val = data.map(item => item._source.value)[0];
            this.setState({ data: val })
        });
    }

    render() {
        const { data } = this.state;

        return <div class={style.field}>
            <div class={style.heading}> Humidity </div>
            <div class={style.data}>
                {data}
            </div>
        </div>
    }
}

class Ldr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const { credentials, user, device } = this.props;

        this.setState({ credentials, user, device }, () => {
            this.getData(credentials, user, device, TYPES.LDR);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props, nextProps)) {
            const { credentials, user, device } = nextProps;
            this.setState({ credentials, user, device }, () => {
                this.getData(credentials, user, device, TYPES.LDR);
            });
        } 
    }

    getData = (credentials, user, device, type) => {
        APIController.elasticQuery(credentials, user.idToken, device, type).then(res => {
            const data = res.data.hits?.hits;
            const val = data.map(item => item._source.value)[0];
            this.setState({ data: val })
        });
    }

    render() {
        const { data } = this.state;

        return <div class={style.field}>
            <div class={style.heading}> Ldr </div>
            <div class={style.data}>
                {data}
            </div>
        </div>
    }
}
export default CurrentModule;