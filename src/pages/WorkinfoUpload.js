import React, { useState, useEffect } from "react";

import { styled } from '@mui/material/styles';
import { Box, 
    Card, 
    CardContent, 
    CardHeader, 
    Divider, 
    Typography, 
    createTheme, 
    ThemeProvider,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';


import { WorkExperiences } from "../components/worker-experiences";
import { Parameter } from "../components/parameter";

import LoadingButton from '@mui/lab/LoadingButton';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {Upload} from '../icons/upload';

import {apiWorkerinfos, apiWorkerAll} from "../api.js";

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

const infotable = (datas) => {
    let keys = ["username", "full_name", "workshop", "level", "shift", "superior", "experiences"]
    return (
        <div>
            <Divider sx={{ borderBottomWidth: 3, m: 3 }}/>
            <Table >
            <TableHead>
                <TableRow>
                    <TableCell>
                    日班
                    </TableCell>
                </TableRow>
            </TableHead>
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
                        datas['day_shift'].map((data, i) => {
                            return (
                                <TableRow key={i+1}>
                                    {
                                        keys.map((key, j)=>{
                                            if(key != "experiences"){
                                                return (
                                                    <TableCell key={key}>
                                                        {
                                                            data[key]
                                                        }
                                                    </TableCell>
                                                )
                                            } else {
                                                return (
                                                    <TableCell key={`${key}_btn`}>
                                                        {
                                                            <WorkExperiences list_data={data["experiences"]}>Experiences</WorkExperiences>
                                                        }
                                                    </TableCell>
                                                )
                                            }
                                            
                                        })
                                    }
                                </TableRow>
                            )
                        })
                    }
            </TableBody>
            </Table>

            <Divider sx={{ borderBottomWidth: 3, m: 3 }}/>
            <Table >
            <TableHead>
                <TableRow>
                    <TableCell>
                    夜班
                    </TableCell>
                </TableRow>
            </TableHead>
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
                        datas['night_shift'].map((data, i) => {
                            return (
                                <TableRow key={i+1}>
                                    {
                                        keys.map((key, j)=>{
                                            if(key != "experiences"){
                                                return (
                                                    <TableCell key={key}>
                                                        {
                                                            data[key]
                                                        }
                                                    </TableCell>
                                                )
                                            } else {
                                                return (
                                                    <TableCell key={`${key}_btn`}>
                                                        {
                                                            <WorkExperiences list_data={data["experiences"]}>Experiences</WorkExperiences>
                                                        }
                                                    </TableCell>
                                                )
                                            }
                                            
                                        })
                                    }
                                </TableRow>
                            )
                        })
                    }
            </TableBody>
            </Table>
        </div>
    )
}

const Input = styled('input')({
    display: 'none',
});

export default function WorkerinfoUpload({token, ...rest}) {
    const [dataStatus, setDataStatus] = useState("正在加载现有资料 ....");
    const [uploading, setUpload] = useState(false);

    const [data, setData] = useState();

    const [parameter, setParameter] = useState();

    const [btnStatus, setBtn] = useState(true);

    useEffect(()=> {
        UpdateData();
    }, [])

    String.prototype.replaceAt=function(index, char) {
        var a = this.split("");
        a[index] = char;
        return a.join("");
    }

    const UpdateData = () => {
        let data = {};
        data['token'] = token;
        apiWorkerAll(data).then(res => {
            setData(res.data);
            setDataStatus("No file chosen !");
            setBtn(false);
        }).catch(err => {

        })
    }

    const fileHandler = (e) => {
        if(e.target.files.length > 0){
            setDataStatus(e.target.files[0].name);
            setUpload(true);
            setData(null);
            
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            
            let data = {};
            data['token'] = token;
            data['file'] = formData;
            
            apiWorkerinfos(data).then(res=>{
                if(res.status === 201){
                    setUpload(false);
                    setDataStatus("正在加载现有资料 ....");
                    setBtn(true);
                    UpdateData();
                    
                    // fucking rule based code ==
                    let rawdata = res.data.split(/\n/);
                    let processed_data = [];
                    let keys = []
                    rawdata.map((line, i) => {
                        if(i==0){
                            keys = line.split(',');
                            keys[0] = 'idx';
                        }
                        else{
                            let flag = false;
                            for (let i = 0; i < line.length; i++) {
                                if(line[i] == '('){
                                    flag = true;
                                }
                                if(flag == true){
                                    if(line[i] == ',') continue;
                                    if(line[i] == ')') flag = false;
                                } else{
                                    if(line[i] == ',') line = line.replaceAt(i, '@');
                                }
                            }
                            let temp = line.split('@');
                            let obj= {}
                            temp.map((item, j)=> {
                                obj[keys[j]] = temp[j];
                            })
                            processed_data.push(obj);
                        }

                    })
                    let csv_data = {
                        'keys' : keys,
                        'datas' : processed_data
                    }
                    setParameter(csv_data)
                }
             }).catch(err => {
                console.log(err.response.data);
             })
        } else {
            setDataStatus("No File Chosen");
            setBtn(false);
        }
    }
    
    
    return(
        <ThemeProvider theme={darkTheme}>
            <Card >
            <CardHeader title="员工专职表上传" />
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
                    <Input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="contained-button-file"  onChange={fileHandler} disabled={btnStatus}/> 
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
                        disabled={btnStatus}
                        >
                        {
                            uploading ? "上传中..." : "选择档案" 
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
                {
                    parameter && (
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                    >
                        <Divider sx={{ borderBottomWidth: 3 }}/>
                        <Parameter csv_data={parameter}/>
                    </Box>
                    )
                }
                <Box>
                    {
                        data && infotable(data)
                    }
                </Box>
            </CardContent>
            </Card>
        </ThemeProvider>
        )
}