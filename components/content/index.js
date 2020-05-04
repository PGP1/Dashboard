import React, { Component } from 'react';

import SummaryChart from "../charts/SummaryChart";
import AverageChart from "../charts/AverageChart";
import ClusterInfo from "../modules/ClusterInfo";

import ResourcesChart from "../charts/ResourcesChart";
import DeviceStatus from "../modules/DeviceStatus";
import DeviceControl from "../modules/DeviceControl";

import ModuleContent from "../modules/ModuleContent";
import ModuleContentWithFilter from "../modules/ModuleContentWithFilter";

const content = [
        {
            title: "Summary", 
            render: <SummaryChart/>,
            Element: ModuleContentWithFilter
        },
        {
            title: "Average", 
            render: <AverageChart/>,
            Element: ModuleContentWithFilter
        },
        {
            title: "Elastic Cluster Status", 
            render: <ClusterInfo/>,
            Element: ModuleContent
        },
        {
            title: "Device Status", 
            render: <DeviceStatus/>,
            Element: ModuleContent
        },
        {
            title: "Device Information (CPU/RAM)", 
            render: <ResourcesChart/>,
            Element: ModuleContentWithFilter
        },
        {
            title: "Device Controls", 
            render: <DeviceControl/>,
            Element: ModuleContent      
        },
];

export default content;