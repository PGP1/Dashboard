import Layout from "../components/Layout.js";
import style from "./styles/register.module.scss";
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';
import Animation from "../components/Animation";
import Particles from 'react-particles-js';
import React, { Component } from 'react';
import AWSController from "../api/AWSController"
import SimpleReactValidator from 'simple-react-validator';

class Register extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {};
    }

    handleChange = () => {
        this.setState({ [event.target.name]: event.target.value, error: !this.validator.allValid() });
    };

    handleRegister = () => {
        if (this.validator.allValid()) {
            this.setState({ error: false });
            const { username, password, email } = this.state;
            AWSController.signUp(username, password, email);
        } else {
            this.validator.showMessages();
            this.setState({ error: true });
            this.forceUpdate();
        }
    };

    render() {
        console.log('this validate', this.validator.allValid(), this.validator);
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
                            <Form error={!this.validator.allValid()}>
                                <Form.Field>
                                    <label>Email</label>
                                    <input placeholder='Email' name="email" value={this.state.email}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Username</label>
                                    <input placeholder='Username' name="username" value={this.state.username}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input placeholder='Password' type="password" name="password" value={this.state.password}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox label='I agree to the Terms and Conditions' />
                                </Form.Field>
                                <Message error>
                                    <Message.Header>Uh oh!</Message.Header>
                                    <Message.List>
                                        <Message.Item>{this.validator.message('Email', this.state.email, 'required|email')}</Message.Item>
                                        <Message.Item>{this.validator.message('Username', this.state.username, 'required|alpha_num')}</Message.Item>
                                        <Message.Item>{this.validator.message('Password', this.state.password, 'required')}</Message.Item>
                                    </Message.List>
                                </Message>
                                <Button primary={this.validator.allValid()} type='submit' onClick={this.handleRegister}>Next</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Register;