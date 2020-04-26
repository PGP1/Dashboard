import React, { Component } from 'react';
import style from './styles/Sidenav.module.scss';
import Dashboard from './assets/Dashboard.svg'
import Device from './assets/Device.svg';
import Settings from './assets/Settings.svg'
class Sidenav extends Component {

    render() {
        return (
            <div className={style.container}>
                <div className={style.userDetails}>
                    <div className={style.avatar}></div>
                    <div className={style.userInfo}>
                        Sierra Ferguson <br />
                        <span>s.ferguson@gmail.com</span>
                    </div>
                </div>

                <div className={style.links}>
                    <ul>
                        <li>
                            <a href="#" class={"flex align-center space"}><Dashboard/> Dashboard</a>
                        </li>
                        <li>
                            <a href="#" class={"flex align-center space"}><Device/> Devices</a>
                        </li>
                    </ul>
                </div>

                <div className={style.bottom}>
                    <ul>
                        <li>
                            <a href="#" className={"flex align-center space"}><Settings/> User Settings</a>
                        </li>
                        <li>
                            <a href="#">Logout</a>
                        </li>
                    </ul>
                </div>



            </div>
        )
    }


}

export default Sidenav;