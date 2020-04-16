import React, { Component } from 'react';
import Sidenav from '../Components/Sidenav';
import Layout from '../Components/Layout';
import style from './styles/dashboard.module.scss';
import { Dropdown } from 'semantic-ui-react';

class Dashboard extends Component {
    render() {
        return (
            <Layout>

                <Sidenav />
                <div className={style.topNavWrapper}>
                    <div className={style.topNavigation}>
                        <div className={style.topDropdown}>
                            <Dropdown placeholder='Select Device' />
                        </div>
                        <div className={style.topNotification}>
                        </div>
                    </div>
                </div>

                
                <div className={style.dashboardContent}>
                    <div className={style.dashboardDeviceStatus}>
                        sssss
                    </div>


                </div>


            </Layout>


        )

    }
}

export default Dashboard;