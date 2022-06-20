import React, { useState, useEffect } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    createTheme,
    ThemeProvider,
    Divider,
} from '@mui/material';

import { SeverityPill } from '../components/severity-pill';

import { apiWorkStatus } from "../api.js";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#1a1e2b',
            paper: '#1a1e2b',
        },
        text: {
            primary: '#EDF2F7',
        },
        secondary: {
            main: '#10B981',
            light: '#3FC79A',
            dark: '#0B815A',
            contrastText: '#FFFFFF'
        },
        success: {
            main: '#14B8A6',
            light: '#43C6B7',
            dark: '#0E8074',
            contrastText: '#FFFFFF'
        },
        info: {
            main: '#2196F3',
            light: '#64B6F7',
            dark: '#0B79D0',
            contrastText: '#FFFFFF'
        },
        warning: {
            main: '#FFB020',
            light: '#FFBF4C',
            dark: '#B27B16',
            contrastText: '#FFFFFF'
        },
        error: {
            main: '#D14343',
            light: '#DA6868',
            dark: '#922E2E',
            contrastText: '#FFFFFF'
        },
    },
});

const CONTENT = {
    title: "员工状态总览",
    worker_id: "员工 ID",
    name: "姓名",
    last_event_end_date: "上次任务结束时间",
    at_device: "员工位置",
    worker_status: "员工状态",
    total_dispatches: "派工总数",
    mission_duration: "任务执行时长",
    update: "更新资料"
}

export default function AllStatus({ authed, ...rest }) {
    const [statusData, setData] = useState([]);

    useEffect(() => {
        updataData();
        return () => {

        }
    }, [])

    const updataData = () => {
        apiWorkStatus(null).then(res => {
            setData(parseData(res.data));
        })
    }

    const parseData = (data) => {
        return data.map(
            (worker, index) => {
                worker.id = index;
                return worker;
            }
        );
    }
    const parseTimeZone = (time_string) => {
        let dt = new Date(time_string);
        dt.setTime(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
        let formated_str = dt.toLocaleDateString() + "  " + dt.toLocaleTimeString('zh-CN', { hour12: false });
        return formated_str;
    }
    const parseSeconds = (sencond_str) => {
        let sec_num = parseInt(sencond_str);
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        return hours + ':' + minutes + ':' + seconds;
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <Card >
                <CardHeader title={CONTENT.title}
                    action={(<Button
                        color="primary"
                        size="large"
                        variant="text"
                        onClick={updataData}
                        sx={{ mr: 3 }}
                    >
                        {CONTENT.update}
                    </Button>)} />

                <Divider sx={{ borderBottomWidth: 3 }} />
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 800 }}>
                        <Table>
                            <TableHead sx={{ background: "#272d3a" }}>
                                <TableRow>
                                    <TableCell>
                                        {CONTENT.worker_id}
                                    </TableCell>
                                    <TableCell>
                                        {CONTENT.name}
                                    </TableCell>
                                    <TableCell >
                                        {CONTENT.last_event_end_date}
                                    </TableCell>
                                    <TableCell >
                                        {CONTENT.at_device}
                                    </TableCell>
                                    <TableCell>
                                        {CONTENT.worker_status}
                                    </TableCell>
                                    <TableCell>
                                        {CONTENT.total_dispatches}
                                    </TableCell>
                                    <TableCell>
                                        {CONTENT.mission_duration}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {statusData.map((worker) => (
                                    <TableRow
                                        hover
                                        key={worker.worker_id}
                                    >
                                        <TableCell>
                                            {worker.worker_id}
                                        </TableCell>
                                        <TableCell>
                                            {worker.worker_name}
                                        </TableCell>
                                        <TableCell>
                                            {parseTimeZone(worker.last_event_end_date)}
                                        </TableCell>
                                        <TableCell>
                                            {worker.at_device}
                                        </TableCell>
                                        <TableCell>
                                            <SeverityPill
                                                color={(worker.status === 'Working' && 'success')
                                                    || (worker.status === 'Leave' && 'error')
                                                    || 'warning'}
                                            >
                                                {worker.status}
                                            </SeverityPill>
                                        </TableCell>
                                        <TableCell>
                                            {worker.total_dispatches}
                                        </TableCell>
                                        <TableCell>
                                            {worker.mission_duration == null ? "无" : parseSeconds(worker.mission_duration)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>

            </Card>
        </ThemeProvider>

    );
}