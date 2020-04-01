import React, { Component } from 'react';
import style from './styles/login.module.scss';
import { Button, Form, Icon } from 'semantic-ui-react';
import Animation from '../components/Animation';
import Particles from 'react-particles-js';
import Layout from '../components/Layout'
class Login extends Component {
  
  render() {
      const particles_config = require('./assets/config/particles_config.json');
        return (
            <Layout>
            <div className={style.container}>
                <div className={style.left}>
                    <Particles className={style.left} params={particles_config} />
                </div>

                <div className={style.right}>
                    <div className={style.form}>
                        <div className={style.logo}>
                            <Animation />
                        </div>
                        <h2 className="header">Login</h2>
                        <div className={style.content}>
                            <Form>
                                <Form.Field>
                                    <label>Username</label>
                                    <input placeholder='Username' name="username" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input placeholder='Password' type='password' name="password" />
                                </Form.Field>
                                <div className={style.button}>
                                    <Button animated>
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