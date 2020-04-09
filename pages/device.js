import React, { Component } from 'react';
import Layout from '../components/Layout';
import style from './styles/device.module.scss';

class Device extends Component {

    render() {
        return (
            <Layout>
                <div className={style.container}>
                    <div className={style.formCenter}>
                        <div className={style.form}>
                            <div className={style.content}>
                                <h1> Register your devices </h1>
                                <table className="ui blue table center aligned segment">
                                    <thead>
                                        <tr><th>Name</th>
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
                                <button className=" ui right floated primary button"> Add device </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Device;