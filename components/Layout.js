import React, { Component } from 'react';
import Head from 'next/head'

class Layout extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { isAuthenticated, userDetail, page, device, devices, 
            setDevice, socketMessage, children} = this.props;

        return (
            <>            
                <Head>
                    <title>Plantly | Dashboard </title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                     
                <div className={"layout"}>
                    { React.cloneElement(children, { isAuthenticated, userDetail, page, device, devices, setDevice, socketMessage  }) } 
                </div>
            </>
        )
    }
}
export default Layout;

