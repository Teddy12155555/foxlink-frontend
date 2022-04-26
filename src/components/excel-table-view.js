import React, { useState, useEffect } from "react";

import * as XLSX from 'xlsx';

import { styled } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Container
} from '@mui/material';

export default function ExcelTableView({sheetName, data, ...rest}) {
    const [state, setState] = useState({}); 

    useEffect(()=>{
        if(sheetName != "" && data[sheetName]){
            console.log(data[sheetName]['data']);
            console.log(data[sheetName]['cols']);
            setState({
                data:data[sheetName]['data'],
                cols:data[sheetName]['cols']
            })
        }
    }, [sheetName])

    return((Object.keys(state) != 0) && 
        (<Container sx={{overflowX: 'scroll'}}>
            <Table >
            <TableHead sx={{background:"#272d3a"}}>
                <TableRow>
                    {
                        state.cols.map(c => (
                        <TableCell key={c.key}>{state.data[0][c.key]}</TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
                <TableBody>
                    {state.data.map((r, i) => {
                        if(i != 0){
                            return (
                                <TableRow key={i}>
                                    {state.cols.map(c => (
                                        <TableCell key={c.key}>{r[c.key]}</TableCell>
                                    ))}
                                </TableRow>
                                )
                        }
                    })}
                </TableBody>
           
        </Table>
        </Container>
        ));
        

}