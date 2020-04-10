import Link from "../components/Link";
import React, { Component } from 'react';
import style from "./styles/device.module.scss";
import Layout from "../components/Layout";
import AWSController from "../api/AWSController";
import Router from "next/router";
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            user: null
        }
    }

    setAuthenticate = () => {
        this.setState({ isAuthenticated: true });
    };

    setUser = (user) => {
        this.setState({ user })
    };

    componentDidMount() {
        AWSController.getCurrentSession().then(session => {
            this.setAuthenticate(true);
            console.log("session", session);
            AWSController.getCurrentSession().then(user => {
                this.setUser(user);
                console.log("user", this.state.user);
            });
        }).catch(err => Router.push("/login"));

        this.setState({ isAuthenticating: false });
    }

    render() {
        const {isAuthenticated} = this.state;
        return (
            <>
                {isAuthenticated &&
                <Layout isAuthenticated={isAuthenticated}>
                    <div className={style.container}>
                        <div className={style.formCenter}>
                            <div className={style.form}>
                                <div className={style.content}>
                                    <h1> Register your devices </h1>
                                    <table className="ui blue table center aligned segment">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Device 1</td>
                                            <td>Online</td>
                                            <td>Access / Shutdown</td>
                                        </tr>
                                        <tr>
                                            <td>Device 1</td>
                                            <td>Online</td>
                                            <td>Access / Shutdown</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <div className={style.bottom}>
                                        <button className=" ui right floated primary button"> Add device</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
                }
            </>)
    }
}

export default Index;