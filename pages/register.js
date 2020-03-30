import Layout from "../components/Layout.js";
import style from "./styles/register.module.scss";
import { Button, Checkbox, Form } from 'semantic-ui-react';
import Animation from "../components/Animation";
import Particles from 'react-particles-js';
import React, { Component } from 'react';
import AWSController from "../api/AWSController"

class Register extends Component {

    constructor(props) {
        super(props)
    }

    handleChange = () => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleRegister = () => {
        const { username, password, email } = this.state;
        AWSController.signUp(username, password, email);
    }

    render() {
        return (
            <Layout>
                <div className={style.container}>
                    <Animation/>
                    <div className={style.left}>
                        <Particles className={"background"} params={{
                            particles: {
                                number: {
                                    value: 100
                                },
                                color: {
                                    value: "#85D68F"
                                }
                            }
                        }}/>
                        <div className={style.description}>
                            <h1>Control your plants anytime, any where</h1>
                            <h3>Sunt nulla anim consectetur aute ea officia fugiat velit consectetur reprehenderit.</h3>
                        </div>
                    </div>
                    <div className={style.right}>
                        <div>
                            <h2 className="header">
                                Register
                            </h2>
                            <Form>
                                <Form.Field>
                                    <label>Email</label>
                                    <input placeholder='Email' name="email" 
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Username</label>
                                    <input placeholder='Username' name="username" 
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input placeholder='Password' type="password" name="password"
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox label='I agree to the Terms and Conditions' />
                                </Form.Field>
                                <Button type='submit' onClick={this.handleRegister}>Register</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Register;