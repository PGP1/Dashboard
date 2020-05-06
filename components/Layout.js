import React, { Component } from 'react';
import Nav from "./Nav";
import Head from 'next/head'

class Layout extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { isAuthenticated, userDetail, page, device, devices, 
            setDevice, socketMessage} = this.props;
        console.log("devices", devices);

        return (
            <>            
                <Head>
                    <title>Plantly | Dashboard </title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Nav isAuthenticated={isAuthenticated} devices={devices} 
                        setDevice={setDevice} page={page} device={device} 
                        userDetail={userDetail} socketMessage={socketMessage}/>
                     
                <div className={"layout"}>
                    {this.props.children}
                </div>
            </>
        )
    }
}
export default Layout;

