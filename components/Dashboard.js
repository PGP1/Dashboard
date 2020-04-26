import React, { Component } from 'react';
import Sidenav from './Sidenav';
import style from './styles/Dashboard.module.scss';
import { Doughnut, Bar, HorizontalBar, Line, Radar } from 'react-chartjs-2';


//import pi_data from './assets/config/pi-data.json';
// import LineGraph from '../components/LineGraph';
// import MixedChart from '../components/MixedChart';


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
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.device !== this.props.device) {
            this.props.device = nextProps.device;
            this.setDevice(nextProps.device);
        }
    }

    setDevice(device) {
        this.setState({ device })
    }

    render() {
        const { device } = this.state;
        return (
            <>
                <Sidenav setPage={this.props.setPage}/>
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
                                    <div style={{color: "#BDBDBD" }}>{ device }</div>
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
                                    <Line
                                        data={this.state.data}
                                        width={100}
                                        height={300}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={style.box}>
                                <div className={style.dashboardHeader}>
                                    Temperature Level
                                </div>
                                <div className={style.chart}>
                                    <Line
                                        data={this.state.data}
                                        width={100}
                                        height={300}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={style.box}>
                                <div className={style.dashboardHeader}>
                                    Humidity Level
                                </div>
                                <div className={style.chart}>
                                    <Line
                                        data={this.state.data}
                                        width={100}
                                        height={300}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={style.right}>

                            <div className={[style.box, style.box2].join(" ")}>
                                <div className={style.dashboardHeader}>
                                    Overall details
                                </div>
                                <div className={style.chart}>
                                    <HorizontalBar
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
                                    <Line
                                        data={this.state.data}
                                        width={100}
                                        height={300}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={[style.box, style.box2].join(" ")}>
                                <div className={style.dashboardHeader}>
                                    Light Level
                                </div>
                                <div className={style.chart}>
                                    <Line
                                        data={this.state.data}
                                        height={500}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    }
}

export default Dashboard;