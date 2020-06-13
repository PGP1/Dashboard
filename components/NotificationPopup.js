import React, { Component } from 'react';
import style from './styles/NotificationPopup.module.scss';
import Warn from './assets/Warn.svg';
import NotificationTable from './NotificationTable';

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
        const { socketMessage } = this.props;

        return (
            <>
                <div className={style.container} >
                    <div className={style.notificationHeader}>
                        Notifications
                    </div>
                    <h1 className={style.notification}>Most recent: 
                    </h1>
                    <div className={style.notification}>
                       <div className={style.warning}> <Warn className={style.margin}/> {socketMessage.message} Its getting a little hot!</div>
                        <div className={style.notificationText}>
                            2020-04-18 9:24pm
                            </div>
                    </div>
                      <NotificationTable/>
                    <hr class="rounded"></hr>
                </div>
            </>
        )
    }


}
export default NotificationPopup;