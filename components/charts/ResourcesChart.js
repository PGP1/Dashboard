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

    componentDidMount() {
        const { credentials, user, device } = this.props;
        this.setState({ credentials, user, device }, () => this.getData(credentials, user, device, QUERY_TYPE));
    }

    getData = (credentials, user, device, queryType) => {
        return APIController.elasticQuery(credentials, user.idToken, device, queryType).then(res => {
            const data = res.data.hits?.hits;
            this.setState({ data });
        })
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.device !== nextProps.device) {
            const { credentials, user, device } = nextProps;
            this.setState({ credentials, user, device }, () => this.getData(credentials, user, device, QUERY_TYPE));
        }
    }

    render() {

        const { data } = this.state;

        let dataValues = {};

        if (data) {
            const x = data.map(item => moment(item._source.time).format('YYYY-MM-DD h:mm a'));
            const y = data.map(item => item._source.value);

            dataValues = {
                datasets: [{
                    label: 'Ram Usage',
                    data: y,
                    borderColor: 'rgb(52,152,219)',
                    backgroundColor: 'rgba(52,152,219,0.2)'
                },
                {
                    label: 'CPU Usage',
                    data: y,
                    borderColor: 'rgb(0,70,0)',
                    backgroundColor: 'rgba(0,70,0,0.2)'
                }
            ],
                labels: x
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
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        )
    }
}
export default ResourcesChart;