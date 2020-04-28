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

    render() {
        const { device, credentials, user } = this.state;
        return (
            <>
                {device && credentials && user &&
                    <>
                        <Sidenav setPage={this.props.setPage} />
                        <div className={style.dashboardContent}>
                            <div className={style.purpleBackground} />
                            <div className={style.dashboardGridContent}>

                                <div className={style.left}>
                                    <div className={[style.box, style.dashboardDeviceStatus].join(" ")}>
                                        <div className={style.dashboardHeader}>
                                            Device Status
                                </div>
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
                                    </div>

                                    <div className={style.box}>
                                        <div className={style.dashboardHeader}>
                                            Water Level
                                        </div>
                                        <div className={style.chart}>
                                            <WaterLineChart credentials={credentials} user={user} device={device} />
                                        </div>
                                    </div>

                                    <div className={style.box}>
                                        <div className={style.dashboardHeader}>
                                            Temperature Level
                                        </div>
                                        <div className={style.chart}>
                                            <TemperatureLineChart credentials={credentials} user={user} device={device} />
                                        </div>
                                    </div>

                                    <div className={style.box}>
                                        <div className={style.dashboardHeader}>
                                            Humidity Level
                                        </div>
                                        <div className={style.chart}>
                                            <HumidityLineChart credentials={credentials} user={user} device={device} />
                                        </div>
                                    </div>
                                </div>

                                <div className={style.right}>

                                    <div className={[style.box, style.box2].join(" ")}>
                                        <div className={style.dashboardHeader}>
                                            Overall details
                                        </div>
                                        <div className={style.chart}>
                                            <Bar
                                                data={this.state.data}
                                                height={300}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false
                                                }} />
                                        </div>
                                    </div>

                                    <div className={style.box}>
                                        <div className={style.dashboardHeader}>
                                            pH Level
                                        </div>
                                        <div className={style.chart}>
                                            <PhLineChart credentials={credentials} user={user} device={device} />
                                        </div>
                                    </div>

                                    <div className={[style.box, style.box2].join(" ")}>
                                        <div className={style.dashboardHeader}>
                                            Light Level
                                        </div>
                                        <div className={style.chart}>
                                            <LightLineChart credentials={credentials} user={user} device={device} />
                                        </div>
                                    </div>
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