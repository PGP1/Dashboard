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
            const ram_usage = data[data.length - 1]?._source.ram;
           

            ramDataValues = {
                datasets: [{
                    data: [ram_usage, 100 - ram_usage],
                    backgroundColor: ['rgba(154, 236, 219,0.6)', 'rgba(88, 177, 159,0.6)']
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