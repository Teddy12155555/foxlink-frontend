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
    Divider
    } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../components/severity-pill';

import {apiWorkStatus} from "../api.js";

const darkTheme = createTheme({
    palette: {
        mode:'dark',
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

export default function AllStatus({authed, ...rest}) {
    const [statusData, setData] =useState([]);
    useEffect(()=> {
        updataData();
        //return ()
    }, [])
    
    const updataData = () => {
        apiWorkStatus(null).then(res=>{
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

    return (
        <ThemeProvider theme={darkTheme}>
            <Card >
            <CardHeader title="員工狀態總覽" 
            action={(<Button
                    color="primary"
                    size="large"
                    variant="text"
                    onClick={updataData}
                    sx={{mr:3}}
                >
                    Update
                </Button>)}/>
                
                <Divider sx={{ borderBottomWidth: 3 }}/>
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 800 }}>
                        <Table>
                        <TableHead sx={{background:"#272d3a"}}>
                            <TableRow>
                            <TableCell>
                                Worker ID
                            </TableCell>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell >
                                Last Event End Date
                            </TableCell>
                            <TableCell >
                                At Device
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>
                            <TableCell>
                                Total Dispatches
                            </TableCell>
                            <TableCell>
                                Mission Duration
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
                                {worker.last_event_end_date}
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
                                {worker.mission_duration}
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