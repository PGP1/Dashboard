import React, { Component } from 'react';
import Sidenav from '../Components/Sidenav';
import Layout from '../Components/Layout';
import style from './styles/dashboard.module.scss';


class Dashboard extends Component {
    render() {
        return (
            <Layout className={style.container}>

                <Sidenav />
                
                <div className={style.dashboardContent}>

                   <div className={style.dashboardGridContent}> 
                    
                    <div className={style.dashboardDeviceStatus}>
                        <div className={style.dashboardDeviceStatusContainer}>
                            <div className={style.dashboardDeviceStatusHeader}>
                                Device Status
                            </div>

                            <div className={style.dashboardDeviceStatusGrid}>
                                <div>Device ID</div>
                                <div>3a0e3db35c8890c8</div>
                                <div>Uptime</div>
                                <div>2h30m</div>
                            </div>

                            <div className={style.dashboardDeviceStatusButtons}>
                                <button class="ui yellow button">Sleep</button>
                                <button class="ui black button">Restart</button>
                            </div>
                        </div>
                    </div>
        
                    </div>
                </div>


            </Layout>


        )

    }
}

export default Dashboard;