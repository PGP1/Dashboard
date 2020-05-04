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
import ResourcesChart from "./charts/ResourcesChart"
import { Checkbox, Button, Dropdown, Icon, Input, Label } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import DeviceStatus from "./modules/DeviceStatus";
import ClusterInfo from "./modules/ClusterInfo";
import ModuleContent from "./modules/ModuleContent";
import ModuleContentWithFilter from "./modules/ModuleContentWithFilter";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            light: 0
        }
    }

    componentDidMount() {
        const { device } = this.props;
        this.setDevice(device);
        AWSController.getCurrentCredientials().then(d => {
            const { Credentials } = d.data;
            this.setState({ credentials: Credentials })
            console.log("Credentails", Credentials)
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

    handleValueChange(e, { value }) {
        this.setState({
            value: value
        });
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
        return modules.map(({ title, render, Element }) => {
            return <Element title={title}>{render} </Element>
        })
    }

    render() {
        const { device, credentials, user, page, light } = this.state;

        const settings = {
            start: 50,
            min: 0,
            max: 255,
            step: 1,
            onChange: light => {
                this.setState({ light });
            }
        };

        const content = [
            {
                title: "Summary", 
                render: <WaterLineChart credentials={credentials} user={user} device={device} />,
                Element: ModuleContentWithFilter
            },
            {
                title: "Temperature Level", render:
                    <>
                        <TemperatureLineChart credentials={credentials} user={user} device={device} />
                    </>
            },
            {
                title: "Humidity Level", render:
                    <>
                        <HumidityLineChart credentials={credentials} user={user} device={device} />
                    </>
            },
            {
                title: "pH Level", render:

                    <>
                        <PhLineChart credentials={credentials} user={user} device={device} />
                    </>
            },
            {
                title: "Light Level", render:
                    <>
                        <LightLineChart credentials={credentials} user={user} device={device} />
                    </>
            },
            /* */
            {
                title: "Device Status", render: <DeviceStatus credentials={credentials} user={user} device={device}/>
            },
            {
                title: "Device Controls", render:
                    <div className={style.buttonsContainer}>
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
                    </div>
            },
            { title: "ElasticSearch Service", render: <ClusterInfo credentials={credentials} user={user} device={device}/> },
            { title: "CPU Usage", render: <></> },
            { title: "RAM Usage", render: <ResourcesChart credentials={credentials} user={user} device={device}/> },
        ];
        console.log(content)
        return (
            <>
                {device && credentials && user &&
                    <>
                        <Sidenav setPage={this.props.setPage} page={page} />
                        <div className={style.dashboardContent}>
                            <div className={style.purpleBackground} />
                            <div className={style.dashboardGridContent}>

                                <div className={style.left}>
                                    {page == 1 ? this.renderModules(content.slice(0, 1)) : this.renderModules(content.slice(0, 1))}
                                </div>

                                <div className={style.right}>
                                    {page == 1 ? this.renderModules(content.slice(0, 1)) : this.renderModules(content.slice(0, content.length))}
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