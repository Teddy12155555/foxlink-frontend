import React, { useState, useEffect } from "react";

import * as XLSX from 'xlsx';

import { styled } from '@mui/material/styles';
import { Box, 
    Card, 
    CardContent, 
    CardHeader, 
    Divider, 
    Typography, 
    createTheme, 
    ThemeProvider,
    FormControl,
    InputLabel,
    Select,
    MenuItem 
} from '@mui/material';

import ExcelTableView from "../components/excel-table-view";

import LoadingButton from '@mui/lab/LoadingButton';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {Upload} from '../icons/upload';

import {apiWorkerinfos} from "../api.js";

const darkTheme = createTheme({
    palette: {
        mode:'dark',
        primary: {
            main: '#5048E5',
            light: '#828DF8',
            dark: '#7582EB',
            contrastText: '#FFFFFF'
          },
        background: {
            default: '#1a1e2b',
            paper: '#1a1e2b',
          },
          text: {
            primary: '#fff',
          }
    },
});

const Input = styled('input')({
    display: 'none',
});

export default function WorkerinfoUpload({token, ...rest}) {
    const [dataStatus, setDataStatus] = useState(" No File Chosen");
    const [uploading, setUpload] = useState(false);
    // handle data
    const [excelData, setExcelData] = useState({}); // alldata
    const [hasData, setHasData] = useState(false);
    
    const [sheetName, setSheetName] = useState();
    const [sheet, setSheet] = useState();

    useEffect(()=> {
        if(Object.keys(excelData).length === 0){
            // first render
            setDataStatus("No File Chosen");
            document.getElementById('contained-button-file').value = "";
        } else {
            setSheetName(Object.keys(excelData).map(sheetvalue=>{
                     return(<MenuItem key={sheetvalue} value={sheetvalue}>{sheetvalue}</MenuItem>)
                 }));
            setHasData(true);
        }
    }, [excelData])


    const handleFile = (file) => {
        /* Boilerplate to set up FileReader */
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;
            reader.onload = e => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

                let  allData = new Object();
                wb.SheetNames.map(sheet=>{
                    const ws = wb.Sheets[sheet];
                    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                    console.log(data);
                    allData[sheet] = {
                        data:data,
                        cols:make_cols(ws["!ref"])
                    };
                })
                setExcelData(allData);
                resolve();
            };
            if (rABS) reader.readAsBinaryString(file);
            else reader.readAsArrayBuffer(file);
        })
    }
    const onSheetChange = (e) => {
        setSheet(e.target.value);
    }

    const make_cols = (refstr) => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
    };

    const changeHandler = (e) => {
        if(e.target.files.length > 0){
            setDataStatus(e.target.files[0].name);
            setUpload(true);
            
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            
            let data = {};
            data['token'] = token;
            data['file'] = formData;
            
            apiWorkerinfos(data).then(res=>{
                setUpload(false);

                handleFile(file).then(success => {
                    
                }).catch(fail=>{
    
                });
             }).catch(err => {
                console.log(err.response.data);
             })
        } else {
            setDataStatus("No File Chosen");
        }
    }
    
    
    return(
        <ThemeProvider theme={darkTheme}>
            <Card >
            <CardHeader title="車間員工資訊表上傳" />
            <Divider sx={{ borderBottomWidth: 3 }}/>
            <CardContent>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    
                }}
                >
                <Upload fontSize="large"/>
                </Box> 
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 2
                }}
                >
                <label htmlFor="contained-button-file">
                    <Input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="contained-button-file"  onChange={changeHandler} /> 
                    <LoadingButton
                        color="success" 
                        variant="contained" 
                        size="large" 
                        component="span" 
                        startIcon={<CloudUploadOutlinedIcon sx={{mr:1}}/>}
                        sx={{
                            borderRadius: 4,
                            minWidth: 200,
                            justifyContent: 'center',
                            letterSpacing: 3,
                        }}
                        type="input"
                        loading={uploading}
                        >
                        {
                            uploading ? "上傳中..." : "選擇檔案" 
                        }
                    </LoadingButton>
                </label>
                </Box>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 2
                }}
                >   
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {dataStatus}
                    </Typography>
                </Box> 
                <Box>
                    {
                        hasData && 
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">試算表</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sheet}
                            label="Age"
                            onChange={onSheetChange}
                        >
                            {
                                sheetName
                            }
                        </Select>
                        </FormControl>
                    }
                    {
                        hasData && <ExcelTableView data={excelData} sheetName={sheet} />
                    }
                </Box>
            </CardContent>
            </Card>
        </ThemeProvider>
        )
}