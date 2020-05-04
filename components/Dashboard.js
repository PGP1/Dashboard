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
            const childrenWithProps = Children.map(render, child => {
                if (isValidElement(child)) {
                  return cloneElement(child, { credentials, user, device })
                }      
                return child;
            });
    
            return <Element title={title}>{ childrenWithProps } </Element>
        })
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

                                <div className={style.left}>
                                    {page == 1 ? this.renderModules(content.slice(0, 2)) : this.renderModules(content.slice(3, 4))}
                                </div>

                                <div className={style.right}>
                                    {page == 1 ? this.renderModules(content.slice(2, 3)) : this.renderModules(content.slice(4, content.length))}
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