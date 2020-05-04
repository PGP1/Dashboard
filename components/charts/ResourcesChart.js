import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
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

        let cpuDataValues = {};
        let ramDataValues = {};
        if (data) {
            const cpu_usage = data[0]._source.cpu_percent;
            const ram_usage = data[0]._source.ram;

            ramDataValues = {
                datasets: [{
                    data: [ram_usage, 100 - ram_usage],
                    backgroundColor: ['rgba(52,152,219,1)', '#ffff00']
                }]
                , labels: ["Usage", "Remaining"]
            }

            cpuDataValues = {
                datasets: [{
                    data: [cpu_usage, 100 - cpu_usage],
                    backgroundColor: ['rgba(0,70,0,1)', '#0000ff']
                }],
                labels: ["Usage", "Remaining"]
            }
        }
        
        return (
            <div style={{ display: "flex" }}>
                <Doughnut
                    data={ramDataValues}
                    width={100}
                    height={300}
                    options={{
                        responsive: false,
                        maintainAspectRatio: true
                    }}
                />
                <Doughnut
                    data={ramDataValues}
                    width={100}
                    height={300}
                    options={{
                        responsive: false,
                        maintainAspectRatio: true
                    }}
                />
            </div>
        )
    }
}
export default ResourcesChart;