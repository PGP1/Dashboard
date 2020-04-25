import style from './styles/Nav.module.scss';
import AWSController from '../api/AWSController';
import { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default function Nav(props) {
    const [username, setUsername] = useState();
    AWSController.getCurrentUserName().then(username => setUsername(username));
    const options = [
        { key: 'angular', text: 'Angular', value: 'angular' },
        { key: 'css', text: 'CSS', value: 'css' },
        { key: 'design', text: 'Graphic Design', value: 'design' },
        { key: 'ember', text: 'Ember', value: 'ember' },
        { key: 'html', text: 'HTML', value: 'html' },
        { key: 'ia', text: 'Information Architecture', value: 'ia' },
        { key: 'javascript', text: 'Javascript', value: 'javascript' },
        { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
        { key: 'meteor', text: 'Meteor', value: 'meteor' },
        { key: 'node', text: 'NodeJS', value: 'node' },
        { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
        { key: 'python', text: 'Python', value: 'python' },
        { key: 'rails', text: 'Rails', value: 'rails' },
        { key: 'react', text: 'React', value: 'react' },
        { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
        { key: 'ruby', text: 'Ruby', value: 'ruby' },
        { key: 'ui', text: 'UI Design', value: 'ui' },
        { key: 'ux', text: 'User Experience', value: 'ux' },
      ]
    return (
        <div className={style.nav}>
            <div className={style.logo}>Plantly.</div>
            {props?.isAuthenticated && <>
                {props?.page !== 0 &&
                <>
                    <div className={style.topDropdown}>
                        <Dropdown placeholder='Select Device' options={options}/>
                    </div>
                    <div className={style.topNotification}>noti</div>
                </>}

                {props?.page !== 1 &&
                <div className={style.accountHolder}>
                    <div className={style.avatar} />
                    <div className={style.username}>{username}</div>
                </div>}
            </>}

        </div>
    )
}