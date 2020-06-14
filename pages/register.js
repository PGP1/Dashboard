import Layout from "../components/Layout.js";
import style from "./styles/register.module.scss";
import { Button, Checkbox, Form, Message, Icon } from 'semantic-ui-react';
import Animation from "../components/Animation";
import Particles from 'react-particles-js';
import React, { Component } from 'react';
import AWSController from "../api/AWSController"
import SimpleReactValidator from 'simple-react-validator';
import Link from "next/link";
import particles_config from "./assets/config/particles_config.json";

/**
* Register Component
* @extends React.Component
*/
class Register extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();

        this.state = {
            step: 0,
            serverError: "",
            code: "",
            serverInfo: ""
        };
    }

    handleChange = () => {
        this.setState({ [event.target.name]: event.target.value }, () => {
            console.log('test', this.validator.allValid());
            this.setState({
                error: !this.validator.allValid()
            });
        });
    };

    handleRegister = () => {
        if (this.validator.allValid()) {
            this.setState({ error: false });
            const { username, password, email } = this.state;
            AWSController.signUp(username, password, email).then((data) => {
                if (data) {
                    this.setState({ error: false, step: 1 });
                }
            }).catch(err => {
                this.setState({ error: true, serverError: err.message })
            });
        } else {
            this.forceUpdate();
            this.setState({ error: true });
        }
    };

    confirmSignUp = () => {
        const { code, username } = this.state;
        AWSController.confirmSignUp(username, code).then((data) => {
            this.setState({ step: 3 });
        }).catch(err => {
            this.setState({ error: true, serverError: err.message })
        });
    };

    resendSignUp = () => {
        const { username } = this.state;
        AWSController.resendSignUp(username).then((data) => {
            this.setState({ serverInfo: "Verification code sent" })
        }).catch(err => {
            this.setState({ serverError: err.message })
        });
    };

    render() {
        let errors = Object.entries(this.validator.getErrorMessages());
        let errorMsgs = errors.map(([key, value]) => {
            if (value !== null) return <Message.Item>{value}</Message.Item>
        });

        const { step, error } = this.state;
        return (
            <Layout>
                <div className={style.container}>
                    <div className={style.left}>
                        <Particles className={"background"} params={particles_config} />
                        <div className={style.description}>
                            <h1>Control your plants anytime, any where</h1>
                            <h3>Sunt nulla anim consectetur aute ea officia fugiat velit consectetur reprehenderit.</h3>
                        </div>
                    </div>
                    <div className={style.right}>
                        <Animation />
                        <div>
                            <h2 className="header">
                                {step === 0 ? 'Register' : step === 1 ? 'Validate' : 'Success'}
                            </h2>
                            {step === 0 ?
                                <Form error={error}>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input placeholder='Email' name="email" value={this.state.email}
                                            onChange={this.handleChange} />
                                        {this.validator.message('Email', this.state.email, 'required|email')}
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Username</label>
                                        <input placeholder='Username' name="username" value={this.state.username}
                                            onChange={this.handleChange} />
                                        {this.validator.message('Username', this.state.username, 'required|alpha_num')}
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <input placeholder='Password' type="password" name="password" value={this.state.password}
                                            onChange={this.handleChange} />
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
                                    <div className="space-between flex align-center">

                                        <Button animated primary={this.validator.allValid()} type='submit' onClick={this.handleRegister}>
                                            <Button.Content visible>Next</Button.Content>
                                            <Button.Content hidden><Icon name='arrow right' /></Button.Content>
                                        </Button>

                                        <Link href={"/login"}>
                                            <a>
                                                Have an account?
                                            </a>
                                        </Link>
                                    </div>
                                </Form> : step === 1 ?
                                    <>
                                        <p>We've sent you a validation code to <code>{this.state.email}</code>.</p>
                                        <p>Retype your code here:</p>
                                        <Form>
                                            <Form.Field>
                                                <label>Verification code</label>
                                                <input className={"verification-code"} name={"code"} maxLength={6}
                                                    value={this.state.code}
                                                    placeHolder={"_ _ _ _ _ _"} onChange={this.handleChange} />
                                                <p className={"inlineError"}>{this.state.serverError}</p>
                                                <p className={"inlineInfo"}>{this.state.serverInfo}</p>
                                            </Form.Field>
                                            <div className={"space-between align-center"}>
                                                <a onClick={this.resendSignUp} className={"link"}>Resend verification code</a>
                                                <Button primary type={'submit'}
                                                    onClick={this.confirmSignUp}
                                                    disabled={this.state.code.length === 6 ? '' : 'disabled'}>
                                                    Verify
                                            </Button>
                                            </div>
                                        </Form>
                                    </> : <>
                                        <p>Done!</p>
                                        <p>We have successfully verified your account. Please head to
                                            <Link href={"/login"}><a> /login</a></Link> to login.</p>
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