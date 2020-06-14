import React, { Component } from 'react';
import style from './styles/NotificationPopup.module.scss';
import Warn from './assets/Warn.svg';
import NotificationTable from './NotificationTable';
import moment from 'moment';

/**
* Notification popup component for dashboard
* @extends React.Component
*/
class NotificationPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { notificationMessage, credentials, user, device} = this.props;

        return (
            <>
                <div className={style.container} >
                    <div className={style.notificationHeader}>
                        Notifications
                    </div>
                    <h1 className={style.notification}>Most recent: 
                    </h1>
                    <div className={style.notification}>
                        <div className={style.warning}> 
                            <div className="align-center">
                                <Warn className={style.margin}/> {notificationMessage.prediction} 
                            </div>
                            <span className={style.notificationText}>
                                {moment(notificationMessage.time).format('YYYY-MM-DD HH:mm')}
                            </span>
                        </div>
                    </div>
                    <NotificationTable credentials={credentials} 
                                       device={device} 
                                       user={user}/>
                    <hr class="rounded"></hr>
                </div>
            </>
        )
    }


}
export default NotificationPopup;