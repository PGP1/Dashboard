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

        this.state = {
            step: 0,
            serverError: ""
        };
    }

    handleChange = () => {
        this.setState({ [event.target.name]: event.target.value, error: !this.validator.allValid() });
    };

    handleRegister = () => {
        if (this.validator.allValid()) {
            this.setState({ error: false });
            const { username, password, email } = this.state;
            AWSController.signUp(username, password, email).then((data, err) => {
                if(data) {
                    this.setState({ error: false, step: 1 });
                }
                if(err) {
                    this.setState({ error: true, serverError: err.message })
                }
            });
        } else {
            this.forceUpdate();
            this.setState({ error: true });
        }
    };

    createValidation = () => {
        return <Message.List>
            <Message.Item>{this.validator.message('Email', this.state.email, 'required|email')}</Message.Item>
            <Message.Item>{this.validator.message('Username', this.state.username, 'required|alpha_num')}</Message.Item>
            <Message.Item>{this.validator.message('Password', this.state.password, 'required|min:8')}</Message.Item>
        </Message.List>
    };

    render() {
        let errorMsgs = Object.entries(this.validator.getErrorMessages()).map(([key, value]) => {
            return <Message.Item>{value}</Message.Item>
        });

        const { step, error } = this.state;
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
                                {step === 0 ? 'Register' : 'Validate'}
                            </h2>
                            { step === 0 ?
                            <Form error={error}>
                                <Form.Field>
                                    <label>Email</label>
                                    <input placeholder='Email' name="email" value={this.state.email}
                                                onChange={this.handleChange}/>
                                    {this.validator.message('Email', this.state.email, 'required|email')}
                                </Form.Field>
                                <Form.Field>
                                    <label>Username</label>
                                    <input placeholder='Username' name="username" value={this.state.username}
                                                onChange={this.handleChange}/>
                                    {this.validator.message('Username', this.state.username, 'required|alpha_num')}
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input placeholder='Password' type="password" name="password" value={this.state.password}
                                                onChange={this.handleChange}/>
                                    {this.validator.message('Password', this.state.password, 'required|min:8')}
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox label='I agree to the Terms and Conditions' />
                                </Form.Field>
                                {error && <Message error>
                                    <Message.Header>Uh oh!</Message.Header>
                                    <Message.List>
                                        {this.state.serverError}
                                        {errorMsgs}

                                    </Message.List>
                                </Message>}
                                <Button primary={this.validator.allValid()} type='submit' onClick={this.handleRegister}>Next</Button>
                            </Form> :
                                <>
                                <p>We've sent you a validation code to <code>{this.state.email}</code>.</p>
                                <p>Retype your code here:</p>
                                    <Form>
                                        <Form.Field>
                                            <label>Verification code</label>
                                            <input className={"verification-code"} maxLength={6} placeHolder={"_ _ _ _ _ _"}/>
                                        </Form.Field>
                                        <div className={"space-between align-center"}>
                                            <a onClick={() => this.setState({ step: 0 })} className={"link"}>Back</a>
                                            <Button primary type={'submit'}>Verify</Button>
                                        </div>
                                    </Form>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Register;