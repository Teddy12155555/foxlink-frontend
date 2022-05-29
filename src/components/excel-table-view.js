import React, { useState, useEffect } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Container
} from '@mui/material';

export default function ExcelTableView({keys, datas, ...rest}) {
    const [table, setTable] = useState();

    return (<Container sx={{overflowX: 'scroll'}}>
    <Table >
    <TableHead sx={{background:"#272d3a"}}>
        <TableRow>
            {
                keys.map((key, index) => {
                    return <TableCell key={index}>{key}</TableCell>
                })
            }
        </TableRow>
    </TableHead>
        <TableBody>
            {
                 datas.map((data, i) => {
                    return (
                        <TableRow key={i+1}>
                            {
                                keys.map((key, j)=>{
                                    return (
                                        <TableCell key={key}>
                                            {
                                                data[key]
                                            }
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    )
                })
            }
        </TableBody>
   
    </Table>
    </Container>);
        
}