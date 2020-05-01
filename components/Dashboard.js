import React, { Component } from 'react';
import Sidenav from './Sidenav';
import style from './styles/Dashboard.module.scss';
import { Bar } from 'react-chartjs-2';
import AWSController from "../api/AWSController";
import APIController from "../api/APIController";
import TemperatureLineChart from "./charts/TemperatureLineChart";
import WaterLineChart from "./charts/WaterLineChart";
import HumidityLineChart from "./charts/HumidityLineChart";
import PhLineChart from "./charts/PhLineChart";
import LightLineChart from "./charts/LightLineChart";
import { Checkbox, Button, Dropdown, Icon } from 'semantic-ui-react';


class ModuleContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, children } = this.props;
        return <div className={style.box}>
            <div className={style.dashboardHeader}>
                {title}
            </div>
            <div className={style.chart}>
                {children}
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
            },
            page: 1
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
        if (nextProps.page !== this.props.page) {
            this.setPage(nextProps.page)
        }
    }

    setDevice = (device) => {
        this.setState({ device });
    }

    setUser = (user) => {
        this.setState({ user });
    }

    setPage = (page) => {
        this.setState({ page });
    }

    renderModules = (modules) => {
        return modules.map(({ title, render }) => {
            return <ModuleContent title={title}>{render} </ModuleContent>
        })
    }

    render() {
        const { device, credentials, user, page } = this.state;

        const DropdownFilter = () => (
            <Dropdown text='Filter by'>
                <Dropdown.Menu>
                    <Dropdown.Item text='Day' />
                    <Dropdown.Item text='Week' />
                    <Dropdown.Item text='Month' />
                </Dropdown.Menu>
            </Dropdown>
        )

        const content = [
            {
                title: "Water Level", render:
                    <>
                        <div className={style.dropdownFilter}>
                            {DropdownFilter()}
                        </div>

                        <WaterLineChart credentials={credentials} user={user} device={device} />
                    </>
            },
            {
                title: "Temperature Level", render:
                    <>
                        <div className={style.dropdownFilter}>
                            {DropdownFilter()}
                        </div>

                        <TemperatureLineChart credentials={credentials} user={user} device={device} />
                    </>
            },
            {
                title: "Humidity Level", render:
                    <>
                        <div className={style.dropdownFilter}>
                            {DropdownFilter()}
                        </div>

                        <HumidityLineChart credentials={credentials} user={user} device={device} />
                    </>
            },
            {
                title: "pH Level", render:

                    <>
                        <div className={style.dropdownFilter}>
                            {DropdownFilter()}
                        </div>

                        <PhLineChart credentials={credentials} user={user} device={device} />
                    </>
            },
            {
                title: "Light Level", render:
                    <>
                        <div className={style.dropdownFilter}>
                            {DropdownFilter()}
                        </div>

                        <LightLineChart credentials={credentials} user={user} device={device} />
                    </>
            },
            /* */
            {
                title: "Device Status", render: <>
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
                </>
            },
            {
                title: "Device Controls", render:
                    <div className={style.buttonsContainer}>
                        <div>
                            <div className={style.buttonHeader}>
                                Light <br />
                            </div>
                            <Checkbox toggle />
                        </div>
                        {/* <div>
                            <div className={style.buttonHeader} />
                            <Button color='blue'>
                                Pump
                            </Button>
                        </div> */}
                        <div>
                            <div className={style.buttonHeader}>
                                Pump <br />
                            </div>
                            <Checkbox toggle />
                        </div>
                        <div>
                            <div className={style.buttonHeader}>
                                Fan <br />
                            </div>
                            <Checkbox toggle />
                        </div>
                    </div>
            },
            { title: "ElasticSearch Service", render: <></> },
            { title: "CPU Usage", render: <></> },
            { title: "RAM Usage", render: <></> },
        ];
        console.log(content)
        return (
            <>
                {device && credentials && user &&
                    <>
                        <Sidenav setPage={this.props.setPage} />
                        <div className={style.dashboardContent}>
                            <div className={style.purpleBackground} />
                            <div className={style.dashboardGridContent}>

                                <div className={style.left}>
                                    {page == 1 ? this.renderModules(content.slice(0, 3)) : this.renderModules(content.slice(5, 7))}
                                </div>

                                <div className={style.right}>
                                    {page == 1 ? this.renderModules(content.slice(3, 5)) : this.renderModules(content.slice(7, content.length))}
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