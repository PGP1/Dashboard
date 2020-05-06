import React, { Component } from 'react';
import {Line, Bar} from 'react-chartjs-2';
import APIController from "../../api/APIController";
import moment from 'moment';
import {TYPES, SCALE} from '../../constants'
const QUERY_TYPE = 'Resources';
import * as _ from "underscore";

class ChangeChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            temp : [],
            ph : [],
            humidity : [],
            ldr : [],
            timeValues : []
        }
    }

    componentDidMount = () => {
        const {credentials, user, device} = this.props;
        this.obtainAllData(credentials,user,device);
    }

    componentWillReceiveProps(nextProps) {
      
        if (!_.isEqual(this.props, nextProps)) {
            const { credentials, user, device } = nextProps;
            this.setState({ credentials, user, device }, () => {
                this.obtainAllData(credentials,user,device);
            });
        }
    } 

    obtainAllData = (credentials, user, device) => {

        Object.values(TYPES).forEach(type => {
            console.log(type,TYPES.WATER);
            if (type !== TYPES.WATER ) {
                APIController.elasticQuery(credentials, user.idToken, device, type).then(res => {
                    const aggregation = res.data.aggregations?.avgBucket.buckets;
                    const data = aggregation ? aggregation.map(e => e.average.value) : [];
                    const val_normalised = data.map( e => ((e/(SCALE[type])) - 0.5)*2);
                    
                    this.setState({timeValues: aggregation ? aggregation.map(e => moment(e.key_as_string).format('YYYY-MM-DD h:mm a')):[]});
                    this.setState({ [type]: val_normalised });
                });
            }     
        });

        
    }


    
    render() {

        const { data } = this.props;
        const {temp, ph, humidity, ldr, timeValues} = this.state;
        console.log("CHANEBDA",humidity)
        let dataValues = {};
            dataValues = {
                datasets: [{
                    label:"Temp",
                    type: "bar",
                    data: temp,
                    lineTension: 0.4,
                    backgroundColor:"#1c2541"
                }, 
              
               {    label:"Ldr",
                    type:"bar",
                    data: ldr,
                    lineTension: 0.4,
                    backgroundColor:"#3a506b"
                },
                {   
                    label:"pH",
                    type:"bar",
                    data: ph,
                    lineTension: 0.4,
                    backgroundColor:"#5bc0be"
                },
                {   label:"Humidity",
                    type:"bar",
                    data: humidity,
                    lineTension: 0.4,
                    backgroundColor:"#0b132b"
                }],
                labels: timeValues
            }
        return (
            <Line
                data={dataValues}
                width={100}
                height={300}
                options={{
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'hour'
                        }
                        
                    }],
                    yAxes : [{
                        ticks: {
                            beginAtZero: false
                          },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }],
                },
                    responsive: true,
                    maintainAspectRatio: false
                }}
                
            />
        )
    }
}
export default ChangeChart;