import React, { Component } from 'react';
import Sidenav from '../Components/Sidenav';
import Layout from '../Components/Layout';
import style from './styles/dashboard.module.scss';
import { Dropdown } from 'semantic-ui-react';

class Dashboard extends Component {
    render() {
        return (
            <Layout className={style.container}>

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
                        <div className={style.dashboardDeviceStatusContainer}>
                            <div className={style.dashboardDeviceStatusHeader}>
                                Device Status
                            </div>

                            <div className={style.dashboardDeviceStatusGrid}>
                               <div>Device ID</div>
                               <div className={style.gridColumn}>3a0e3db35c8890c8</div>
                               <div>Uptime</div>
                               <div className={style.gridColumn}>2h30m</div>

                            </div>

                            {/* <div className={style.dashboardDeviceStatusButtons}>
                                <button class="ui yellow button">Sleep</button>
                                <button class="ui black button">Restart</button>
                            </div> */}
                        </div>
                    </div>


                </div>


            </Layout>


        )

    }
}

export default Dashboard;