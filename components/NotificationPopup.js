import React, { Component } from 'react';
import style from './styles/NotificationPopup.module.scss';
import Warn from './assets/Warn.svg';

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

                    <div className={style.notification}>
                            <Warn /> { socketMessage.message }
                            <div className={style.notificationText}>
                                2020-04-18 9:24pm
                            </div>
                    </div>
                        <hr class="rounded"></hr>
                </div>
            </>
        )
    }


}
export default NotificationPopup;