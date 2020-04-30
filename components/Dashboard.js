import React, { Component } from 'react';
import Sidenav from './Sidenav';
import style from './styles/Dashboard.module.scss';
import { Bar } from 'react-chartjs-2';
import AWSController from "../api/AWSController";
import APIController from "../api/APIController";
import TemperatureLineChart from "./TemperatureLineChart";
import WaterLineChart from "./WaterLineChart";
import HumidityLineChart from "./HumidityLineChart";
import PhLineChart from "./PhLineChart";
import LightLineChart from "./LightLineChart";


class ModuleContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, children } = this.props;
        return <div className={style.box}>
            <div className={style.dashboardHeader}>
                { title }
            </div>
            <div className={style.chart}>
                { children }
            </div>
        </div>
    }
}
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                datasets: [{
                    data: [10.3, 4.8, 550, 60, 28]
                }],
                labels: [
                    'Water',
                    'pH',
                    'LDR',
                    'Humidity',
                    'Temperature'
                ]
            }
        }
    }

    componentDidMount() {
        const { device } = this.props;
        this.setDevice(device);
        AWSController.getCurrentCredientials().then(d => {
            const { Credentials } = d.data;
            this.setState({ credentials: Credentials })
            AWSController.getCurrentSession().then(user => {
                this.setUser(user);
            });
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.device !== this.props.device) {
            this.setDevice(nextProps.device);
        }
    }

    setDevice = (device) => {
        this.setState({ device });
    }

    setUser = (user) => {
        this.setState({ user });
    }

    renderModules = (modules) => {
        return modules.map(({ title, render }) => {
            return <ModuleContent title={title}>{ render }</ModuleContent>
        })
    }



    render() {
        const { device, credentials, user } = this.state;
        const content = [
            { title: "Device Status", render: <>
                    <div className={style.dashboardDeviceStatusGrid}>
                        <div>Device ID</div>
                        <div style={{ color: "#BDBDBD" }}>{device}</div>
                        <div>Uptime</div>
                        <div style={{ color: "#BDBDBD" }}>2h30m</div>
                    </div>
                    <div className={style.dashboardDeviceStatusButtons}>
                        <button className="ui yellow button">Sleep</button>
                        <button className="ui black button">Restart</button>
                    </div>
            </>},
            { title: "Water Level", render: <WaterLineChart credentials={credentials} user={user} device={device} />},
            { title: "Temperature Level", render:  <TemperatureLineChart credentials={credentials} user={user} device={device} />},
            { title: "Humidity Level", render:  <HumidityLineChart credentials={credentials} user={user} device={device} />},
            /* */
            { title: "Overall details", render:  <Bar data={this.state.data} height={300} options={{
                responsive: true,
                maintainAspectRatio: false
            }} />},
            { title: "pH Level", render: <PhLineChart credentials={credentials} user={user} device={device} />},
            { title: "Light Level", render: <LightLineChart credentials={credentials} user={user} device={device} />},
        ];
        return (
            <>
                {device && credentials && user &&
                    <>
                        <Sidenav setPage={this.props.setPage} />
                        <div className={style.dashboardContent}>
                            <div className={style.purpleBackground} />
                            <div className={style.dashboardGridContent}>

                                <div className={style.left}>
                                    {this.renderModules(content.slice(0,4))}
                                </div>

                                <div className={style.right}>
                                    {this.renderModules(content.slice(4,content.length))}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default Dashboard;