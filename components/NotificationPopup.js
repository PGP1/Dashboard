import React, { Component } from 'react';
import style from './styles/NotificationPopup.module.scss';

class NotificationPopup extends Component {

render() {
    return(
        <div className={style.container}>
            <div className={style.placeholder}>
                No notifications
            </div>

        </div>
    )
}


}
export default NotificationPopup;