import React, { Component } from 'react';
import {Line, Bar} from 'react-chartjs-2';
import APIController from "../../api/APIController";
import moment from 'moment';
import {TYPES, SCALE} from '../../constants'
const QUERY_TYPE = 'Resources';

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
        this.obtainAllData();
    }



    obtainAllData = () => {

        const {credentials, user, device} = this.props;
    
        Object.values(TYPES).forEach(type => {
            console.log(type,TYPES.WATER);
            if (type !== TYPES.WATER ) {
                APIController.elasticQuery(credentials, user.idToken, device, type).then(res => {
                    // const hits = res.data.hits?.hits; // array
                    const aggregation = res.data.aggregations?.avgBucket.buckets;
                    const data = aggregation.map(e => e.average.value);  
                    const val_normalised = data.map( e => ((e/(SCALE[type])) - 0.5)*2);
                    console.log(type,val_normalised);
                    this.setState({timeValues: aggregation.map(e => moment(e.key_as_string).format('YYYY-MM-DD h:mm a'))});
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
                    type: "line",
                    data: temp,
                    lineTension: 0.4,
                    borderDash: [10, 10],
                    borderColor: 'rgba(231, 76, 60,1.0)',
                    backgroundColor:"rgba(231, 76, 60,0.4)"
                }, 
                {   label:"pH",
                    type:"line",
                    data: ph,
                    lineTension: 0.4,
                    borderDash: [4, 4],
                    borderColor: ['rgba(230, 126, 34,1.0)'],
                    backgroundColor:"rgba(230, 126, 34,0.4)"
                },
               {    label:"Ldr",
                    type:"line",
                    data: ldr,
                    lineTension: 0.4,
                    borderDash: [10, 10],
                    borderColor: 'rgba(241, 196, 15,1.0)',
                    backgroundColor:"rgba(241, 196, 15,0.4)"
                },
                {   label:"Humidity",
                    type:"line",
                    data: humidity,
                    lineTension: 0.4,
                    borderDash: [10, 10],
                    borderColor: ['rgba(46, 204, 113,1.0)'],
                    backgroundColor:"rgba(46, 204, 113,0.4)"
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