import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import APIController from "../../api/APIController";
import moment from 'moment';
const QUERY_TYPE = 'Resources';

class RamChart extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { data } = this.props;

        let ramDataValues = {};
        if (data) {
            const ram_usage = data[0]?._source.ram;
           

            ramDataValues = {
                datasets: [{
                    data: [ram_usage, 100 - ram_usage],
                    backgroundColor: ['#3498db', '#2980b9']
                }]
                , labels: ["Usage", "Remaining"]
            }
        }

        return (
            <>
                <Doughnut
                    data={ramDataValues}
                    width={100}
                    height={300}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false
                    }}
                />
            </>
        )
    }
}
export default RamChart;