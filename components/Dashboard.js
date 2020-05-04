import React, { Component, Children, isValidElement, cloneElement } from 'react';
import Sidenav from './Sidenav';
import style from './styles/Dashboard.module.scss';
import { Bar } from 'react-chartjs-2';
import AWSController from "../api/AWSController";
import APIController from "../api/APIController";

import { Checkbox, Button, Dropdown, Icon, Input, Label } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import content from "./content";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        }
    }
    
    componentWillReceiveProps(nextProps, nextContext) {
        const { setPage, setDevice } = this.props;
        if (nextProps.device !== this.props.device) {
            setDevice(nextProps.device);
        }
        if (nextProps.page !== this.props.page) {
            setPage(nextProps.page)
        }
    }

    
    renderModules = (modules) => {
        const { credentials, user, device } = this.props;

        return modules.map(({ title, render, Element }) => { 
            return <Element title={title} credentials={credentials} user={user} device={device}> 
                {/* { React.cloneElement(render, { credentials, user, device }) }  */}
                { render }
            </Element>
        });
    }
    
    render() {
        const { device, credentials, user, page, light, setPage, userDetail} = this.props;

        console.log(content)
        return (
            <>
                {device && credentials && user &&
                    <>
                        <Sidenav setPage={setPage} page={page} setUserData={this.props.setUserData} userDetail={userDetail}/>
                        <div className={style.dashboardContent}>
                            <div className={style.purpleBackground} />
                            <div className={style.dashboardGridContent}>
                                { page == 1 ? this.renderModules(content.slice(0, 1)) : ""}
                                <div className={style.left}>
                                    {page == 1 ? this.renderModules(content.slice(1, 2)) : this.renderModules(content.slice(3, 5))}
                                </div>

                                <div className={style.right}>
                                    {page == 1 ? this.renderModules(content.slice(2, 3)) : this.renderModules(content.slice(5, content.length))}
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