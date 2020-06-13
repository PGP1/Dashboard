import React, { Component } from 'react';
import style from './styles/NotificationPopup.module.scss';
import { Table, Icon } from 'semantic-ui-react';
import APIController from "../api/APIController";
import moment from "moment";

/**
* Notification table history
* @extends React.Component
*/
class NotificationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            viewed : []
        }
    }

    componentDidMount () {
        const { credentials, user, device } = this.props;
        APIController.elasticQuery(credentials, user.idToken, 
                                device, "prediction").then (res => {
            const data = res.data.hits?.hits;
            this.setState({ data: data.map(d => d._source) })
        });
    }

    viewClick = (e) => {
        console.log("pressed row",e.target.parentElement.getAttribute("value"))
        let index = e.target.parentElement.value;
        let temp  = this.state.viewed;
        temp[index] = !temp[index];
        this.setState({viewed : temp});
    }

    render() {

        const {data, viewed} = this.state;
        return (
            <>  
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{font:"10px"}}>Device</Table.HeaderCell>
                            <Table.HeaderCell>Plant Status</Table.HeaderCell>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    { data.map((value, index) => {
                           return <Table.Body onClick={this.viewClick}>
                                <Table.Row  value={index} positive={!viewed[index]}  negative={viewed[index]}>
                                <Table.Cell>{value["pi-id"]}</Table.Cell>
                                <Table.Cell>{value.prediction}</Table.Cell>
                                <Table.Cell>{moment(value.time).format('YYYY-MM-DD HH:mm')}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        }  
                    )}
                </Table>
                </div>
            </>
        )

        }
}

export default NotificationTable;