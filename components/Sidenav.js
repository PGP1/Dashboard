import React, { Component } from 'react';
import style from './styles/Sidenav.module.scss';

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
                            <img src='./assets/contacts.svg'/><a href="#">Dashboard</a>
                        </li>
                        <li>
                            <a href="#">Device</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>

                <div className={style.bottom}>
                    <ul>
                        <li>
                            <a href="#">Settings</a>
                        </li>
                        <li className={style.sidebar}>
                            Toggle sidebar
                        </li>
                    </ul>
                </div>



            </div>
        )
    }


}

export default Sidenav;