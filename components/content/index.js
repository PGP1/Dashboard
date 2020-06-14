import React, { Component } from 'react';

import SummaryChart from "../charts/SummaryChart";
import RamChart from "../charts/RamChart";
import CpuChart from "../charts/CpuChart";
import ClusterInfo from "../modules/ClusterInfo";

import DeviceStatus from "../modules/DeviceStatus";
import DeviceControl from "../modules/DeviceControl";
import CurrentModule from '../modules/CurrentModule';
import ChangeChart from '../charts/ChangeChart';

import ModuleContent from "../modules/ModuleContent";
import ModuleContentWithFilter from "../modules/ModuleContentWithFilter";
import ModuleSummary from "../modules/ModuleSummary";

import LiveStream from "../modules/LiveStream";

/** @constant {content} 
 * holds the content of the Dashboard (title, render function, element)
 */
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
        title: "Percentage change over time (0-median) ",
        render: <ChangeChart />,
        Element: ModuleSummary
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
        title: "CPU Information (%)",
        render: <CpuChart />,
        Element: ModuleContent
    },
    {
        title: "Live Stream",
        render: <LiveStream />,
        Element: ModuleSummary
    },
    {
        title: "RAM Information (%)",
        render: <RamChart />,
        Element: ModuleContent
    },
   
];

export default content;