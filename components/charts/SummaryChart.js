import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import APIController from "../../api/APIController";
import moment from 'moment';
import { UNITS } from '../../constants';

class SummaryChart extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { aggregation, currentType } = this.props;

        let dataValues = {};

        if (aggregation) {
            const x = aggregation.map(item => moment(item.key_as_string).format('YYYY-MM-DD h:mm a'));
            const y = aggregation.map(item => item.average.value);

            dataValues = {
                datasets: [{
                    label: UNITS[currentType],
                    data: y,
                    borderColor: 'rgb(155, 89, 182)',
                    backgroundColor: 'rgb(155, 89, 182, 0.2)',
                    lineTension: 0.4,
                }],
                labels: x
            }
        }

        return (
            <Line
                data={dataValues}
                width={100}
                height={300}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'hour'
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        )
    }
}
export default SummaryChart;