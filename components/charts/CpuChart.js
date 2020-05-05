import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import APIController from "../../api/APIController";
import moment from 'moment';
const QUERY_TYPE = 'Resources';

class CpuChart extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

        const { data } = this.props;

        let cpuDataValues = {};

        if (data) {
            const cpu_usage = data[data.length - 1]?._source["cpu-percent"];
            cpuDataValues = {
                datasets: [{
                    data: [cpu_usage, 100 - cpu_usage],
                    backgroundColor: ['#27ae60', '#2ecc71']
                }],
                labels: ["Usage", "Remaining"]
            }
        }
        return (
            <Doughnut
                data={cpuDataValues}
                width={100}
                height={300}
                options={{
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />
        )
    }
}
export default CpuChart;