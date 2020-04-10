import style from './styles/Nav.module.scss';
import AWSController from '../api/AWSController';
import { useState } from 'react';

export default function Nav (props) {
    const [username, setUsername] = useState();
    AWSController.getCurrentUserName().then(username => setUsername(username));
    return (
        <div className={style.nav}>
            <div className={style.logo}>Logo</div>
            {props?.isAuthenticated && <div className={style.accountHolder}>
                <div className={style.avatar}/>
                <div className={style.username}>{username}</div>
            </div>}
        </div>
    )
}