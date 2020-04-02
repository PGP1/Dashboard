import React, { Component } from 'react';
import style from './styles/login.module.scss';
import { Button, Form, Icon } from 'semantic-ui-react';
import Link from 'next/link';
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
                        <Particles className={"background"} params={particles_config} />


                        <div className={style.description}>
                            <h1>Log in to track your plants!</h1>
                            <h3>Sunt nulla anim consectetur aute ea officia fugiat velit consectetur reprehenderit.</h3>
                        </div>
                    </div>

                    <div className={style.right}>
                        <Animation />
                        <div className={style.form}>
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
                                    {/* {error && <Message error>
                                        <Message.Header>Uh oh!</Message.Header>
                                        <Message.List>
                                            {this.state.serverError}
                                        </Message.List>
                                    </Message>} */}
                                    <div className="space-between flex align-center">
                                        <Button animated>
                                            <Button.Content visible>Login</Button.Content>
                                            <Button.Content hidden><Icon name='arrow right' /></Button.Content>
                                        </Button>
                                        <Link href={"/register"}>
                                            <a>
                                                Don't have an account?
                                            </a>
                                        </Link>


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