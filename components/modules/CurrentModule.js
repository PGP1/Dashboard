import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import APIController from "../../api/APIController";
import moment from 'moment';
import { TYPES, UNITS  } from "../../constants";
import style from "../styles/CurrentModule.module.scss";
const QUERY_TYPE = 'humidity';

/**
* Dashboard component which holds the 
* information about the current plant.
* @extends React.Component
*/
class CurrentModule extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className={[style.holder, "flex", "space-around"].join(" ")}>
                <Water {...this.props}/>
                <Ph {...this.props}/>
                <Temp {...this.props}/>
                <Humidity {...this.props}/>
                <Ldr {...this.props}/>
        </div>
    }
}


/**
* Water information
* @extends React.Component
*/
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
            const val = data ? data.map(item => item._source.value)[0] : "Loading...";
            this.setState({ data: val })
        });
    }

    render() {
        const { data } = this.state;
        let waterValue = "Calculating...";
        let color = ""
        if (data >= 330) {
            waterValue = "Acceptable";
            color = "c-green";
        } else if (data > 100 && data < 330) {
            waterValue = "Medium";
            color = "c-yellow";
        } else if (data < 100) {
            waterValue = "Need to top up"
            color = "c-red";
        }
        
        return <div className={style.field}>
            <div className={style.heading}> Water </div>
            <div className={[style.data, style.small, color].join(" ")}>
                { waterValue }
            </div>
        </div>
    }
}

/**
* Ph information
* @extends React.Component
*/
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
            const val = data ? data.map(item => item._source.value)[0] : "Loading...";
            this.setState({ data: val })
        });
    }

    render() {
        const { data } = this.state;

        return <div className={style.field}>
            <div className={style.heading}> PH ({ UNITS[TYPES.PH] })</div>
            <div className={style.data}>
                {data}
            </div>
        </div>
    }
}

/**
* Temperature information
* @extends React.Component
*/
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
            const val = data ? data.map(item => item._source.value)[0] : "Loading...";
            this.setState({ data: val })
        });
    }

    render() {
        const { data } = this.state;

        return <div className={style.field}>
            <div className={style.heading}> Temp ({ UNITS[TYPES.TEMP] })</div>
            <div className={style.data}>
                {data}
            </div>
        </div>
    }
}

/**
* Humidity information
* @extends React.Component
*/
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
            const val = data ? data.map(item => item._source.value)[0] : "Loading...";
            this.setState({ data: val })
        });
    }

    render() {
        const { data } = this.state;

        return <div className={style.field}>
            <div className={style.heading}> Humidity ({ UNITS[TYPES.HUMIDITY] })</div>
            <div className={style.data}>
                {data}
            </div>
        </div>
    }
}

/**
* Ldr information
* @extends React.Component
*/
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
            const val = data ? data.map(item => item._source.value)[0] : "Loading...";
            this.setState({ data: val })
        });
    }

    render() {
        const { data } = this.state;

        return <div className={style.field}>
            <div className={style.heading}> Ldr ({ UNITS[TYPES.LDR] })</div>
            <div className={style.data}>
                {data}
            </div>
        </div>
    }
}
export default CurrentModule;