import React, { Component } from 'react';
import style from './styles/NotificationPopup.module.scss';
import Warn from './assets/Warn.svg';

class NotificationPopup extends Component {

    render() {
        return (
            <div className={style.container} >
                <div className={style.notificationHeader}>
                    Notifications
                </div>
                <div className={style.notification}>
                    <Warn /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    <div className={style.notificationText}>
                        2020-04-18 9:24pm
                    </div>
                </div>
                <hr class="rounded"></hr>
                <div className={style.notification}>
                    <Warn /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    <div className={style.notificationText}>
                        2020-04-18 9:24pm
                    </div>
                </div>
                <hr class="rounded"></hr>
                <div className={style.notification}>
                    <Warn /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    <div className={style.notificationText}>
                        2020-04-18 9:24pm
                    </div>
                </div>
                {/* <div className={style.placeholder}>
                    No notifications
                    </div> 
                */}

            </div >
        )
    }


}
export default NotificationPopup;