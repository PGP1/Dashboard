import React, { Component } from 'react';
import style from './styles/NotificationPopup.module.scss';
import { Table, Icon } from 'semantic-ui-react';



/**
* Notification table history
* @extends React.Component
*/
class NotificationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [{status: "Your plant is missing out on some light", device: this.props.device},
            {status: "Your plant needs some water", device: this.props.device},
            {status: "Plant is in healthy conditions", device: this.props.device},
            {status: "Plant is in healthy conditions", device: this.props.device}],
            viewed : []
        }


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
                            <Table.HeaderCell style={{font:"10px"}}>Notification No.</Table.HeaderCell>
                            <Table.HeaderCell>Plant Status</Table.HeaderCell>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    { data.map((value, index) => {
                           viewed.push(false);  
                           let stat = value.status;
                           if(stat.includes('needs') || value.status.includes('missing')){
                               viewed[index] =true
                           }
                           return <Table.Body onClick={this.viewClick}>
                                <Table.Row  value={index} positive={!viewed[index]}  negative={viewed[index]}>
                                <Table.Cell>{value.device}</Table.Cell>
                                <Table.Cell>{value.status}</Table.Cell>
                                <Table.Cell >{  12 -index + ":30"+ "PM 5/25/2020"}</Table.Cell>
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