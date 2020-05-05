import React, { Component } from 'react';
import Nav from "./Nav";
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

