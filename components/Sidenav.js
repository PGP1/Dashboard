import React, { Component } from 'react';
import style from './styles/Sidenav.module.scss';
import Dashboard from './assets/Dashboard.svg'
import Device from './assets/Device.svg';
import Settings from './assets/Settings.svg';
import APIController from "../api/APIController";
import AWSController from "../api/AWSController";
import { Modal, Image, Header, Form, Button, Tab, Message } from 'semantic-ui-react';

class Sidenav extends Component {
    constructor() {
        super();
        this.state = {
            devices: [],

        }
    }

    componentDidMount() {
        AWSController.getCurrentSession().then(user => {
            APIController.getUserData(user.idToken).then(d => this.setUserData(d.data))
        });
    }

    setUserData = (userDetail) => {
        this.setState({ userDetail });
    }

    render() {
        const { userDetail } = this.state;
        const panes = [
            {
                menuItem: 'Profile',
                render: () => <Tab.Pane attached={false}>
                    <div className={style.userSettingsForm}>
                        <Form>
                            <Form.Input fluid label='Email'> {userDetail?.email} </Form.Input>
                            <Form.Input fluid label='Username'> {userDetail?.username} </Form.Input>
                            {/*<Form.Group widths='equal'>*/}


                            {/*    <Form.Input fluid label='Username'>  </Form.Input>*/}
                            {/*    <Form.Input*/}
                            {/*        fluid*/}
                            {/*        id='form-subcomponent-shorthand-input-first-name'*/}
                            {/*        label='First name'*/}
                            {/*        placeholder='First name'*/}
                            {/*    />*/}
                            {/*    <Form.Input*/}
                            {/*        fluid*/}
                            {/*        id='form-subcomponent-shorthand-input-last-name'*/}
                            {/*        label='Last name'*/}
                            {/*        placeholder='Last name'*/}
                            {/*    />*/}
                            {/*</Form.Group>*/}
                            {/*<Button color='blue'>Update details</Button>*/}
                        </Form>
                    </div>
                </Tab.Pane>,
            },
            {
                menuItem: 'Change Password',
                render: () => <Tab.Pane attached={false}>
                    <Form>
                        <Form.Input fluid label='Old password' type='password' />
                        <Form.Input fluid label='New password' type='password' />
                        <Form.Input fluid label='Confirm new password' type='password' />
                        <Button color='blue'>Update password</Button>
                    </Form>
                </Tab.Pane>,
            },
            {
                menuItem: 'Account',
                render: () => <Tab.Pane attached={false}>
                    <h3 style={{ color: "red" }}> Delete your account </h3>
                    <p>Are you sure you want to delete your account? This can not be undone.</p>
                    <Button inverted color='red'> Delete account </Button>

                </Tab.Pane>,
            }

        ]

        return (
            <div className={style.container}>
                <div className={style.userDetails}>
                    <div className={style.avatar} style={{backgroundImage: `url(${userDetail?.avatar})`}}/>
                    <div className={style.userInfo}>
                        {userDetail?.username} <br />
                        <span>{userDetail?.email}</span>
                    </div>
                </div>

                <div className={style.links}>
                    <ul>
                        <li>
                            <a href="#" className={"flex align-center space"}><Dashboard /> Dashboard</a>
                        </li>
                        <li>
                            <a href="#" className={"flex align-center space"} onClick={() => this.props.setPage(0)}>
                                <Device /> Devices
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={style.bottom}>
                    <ul>
                        <li>
                            <Modal trigger={<a href="#" className={"flex align-center space"}><Settings /> User Settings</a>}>
                                <Modal.Header><Settings fill="black" /> User Settings</Modal.Header>
                                <Modal.Content image>
                                    <Button style={{ position: "fixed" }}></Button>
                                    <Image wrapped size='small' src={userDetail?.avatar} />
                                    <Modal.Description style={{ width: "100%" }}>
                                        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        </li>
                        <li>
                            <a onClick={() => AWSController.signOut()} href="/">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }


}

export default Sidenav;