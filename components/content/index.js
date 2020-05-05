import React, { Component } from 'react';

import SummaryChart from "../charts/SummaryChart";
import RamChart from "../charts/RamChart";
import CpuChart from "../charts/CpuChart";
import ClusterInfo from "../modules/ClusterInfo";

import ResourcesChart from "../charts/ResourcesChart";
import DeviceStatus from "../modules/DeviceStatus";
import DeviceControl from "../modules/DeviceControl";
import CurrentModule from '../modules/CurrentModule';

import ModuleContent from "../modules/ModuleContent";
import ModuleContentWithFilter from "../modules/ModuleContentWithFilter";
import ModuleSummary from "../modules/ModuleSummary";

const content = [
    {
        title: "Current Stats",
        render: <CurrentModule />,
        Element: ModuleSummary
    },
    {
        title: "Summary",
        render: <SummaryChart />,
        Element: ModuleContentWithFilter
    },
    {
        title: "Server Information",
        render: <ClusterInfo />,
        Element: ModuleContent
    },
    {
        title: "Device Status",
        render: <DeviceStatus />,
        Element: ModuleContent
    },
    {
        title: "Device Controls",
        render: <DeviceControl />,
        Element: ModuleContent
    },
    {
        title: "CPU Information",
        render: <CpuChart />,
        Element: ModuleContent
    },
    {
        title: "RAM Information",
        render: <RamChart />,
        Element: ModuleContent
    }
];

export default content;