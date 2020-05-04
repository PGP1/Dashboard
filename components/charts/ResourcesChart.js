import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import APIController from "../../api/APIController";
import moment from 'moment';
const QUERY_TYPE = 'Resources';

class ResourcesChart extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

   
    render() {

        const { data } = this.props;

        let dataValues = {};
        
        console.log(data);
        if (data) {
            
            // const x = data.map(item => moment(item._source.time).format('YYYY-MM-DD h:mm a'));
            // const y = data.map(item => item._source.value);


            dataValues = {
                datasets: [{
                    label: 'Ram Usage',
                    data: [30],
                    borderColor: 'rgb(52,152,219)',
                    backgroundColor: 'rgba(52,152,219,0.2)'
                },
                {
                    label: 'CPU Usage',
                    data: [70],
                    borderColor: 'rgb(0,70,0)',
                    backgroundColor: 'rgba(0,70,0,0.2)'
                }
            ],
               
            }
        }

        return (
            <Bar
                data={dataValues}
                width={100}
                height={300}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max: 100
                            }
                        }]
                    }
                }}
            />
        )
    }
}
export default ResourcesChart;