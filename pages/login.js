import React, { Component } from 'react';
import style from './styles/login.module.scss';
import { Button, Form, Icon } from 'semantic-ui-react';
import Animation from '../components/Animation';
import Particles from 'react-particles-js';
import Layout from '../components/Layout'
import AWSController from '../api/AWSController';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = () => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = () => {
        let username = this.state.username;
        let password = this.state.password;
        AWSController.signIn(username, password)
                     .then(data => console.log(data))
                     .catch(err => console.log(err))
    }

    render() {
        const particles_config = require('./assets/config/particles_config.json');
        return (
            <Layout>
                <div className={style.container}>
                    <div className={style.left}>
                        <Particles className={"background"} params={particles_config} />
                    </div>

                    <div className={style.right}>
                        <Animation />
                        <div className={style.form}>
                            <h2 className="header">Login</h2>
                            <div className={style.content}>
                                <Form>
                                    <Form.Field>
                                        <label>Username</label>
                                        <input placeholder='Username' name="username" onChange={this.handleChange} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <input placeholder='Password' type='password' name="password" onChange={this.handleChange} />
                                    </Form.Field>
                                    <div className={style.button}>
                                        <Button animated onClick={this.handleLogin}>
                                            <Button.Content visible>Login</Button.Content>
                                            <Button.Content hidden><Icon name='arrow right' /></Button.Content>
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Login;