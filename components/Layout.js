import React, { Component } from 'react';
import Nav from "./Nav";
class Layout extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>            
                <Nav isAuthenticated={this.props?.isAuthenticated} page={this.props?.page}/>
                <div className={"layout"}>
                    {this.props.children}
                </div>
            </>
        )
    }


}
export default Layout;

