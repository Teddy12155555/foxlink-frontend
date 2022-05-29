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
    MenuItem,
    TextField
} from '@mui/material';


import LoadingButton from '@mui/lab/LoadingButton';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {Upload} from '../icons/upload';

import {apiMapPost, apiWorkShopList, apiDevicesData} from "../api.js";
import { Alert } from "bootstrap";

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

export default function MapUpload({token, ...rest}) {
    const [dataStatus, setDataStatus] = useState(" No File Chosen");
    const [uploading, setUpload] = useState(false);
    // init workshop
    const [selectItem, setSelectItem] = useState("");
    const [workshop, setWorkshop] = useState("");
    const [keys, setKeys] = useState();
    const [datas, setDatas] = useState();

    useEffect(()=>{
        updateData();
    }, [])

    const updateData = () => {
        setWorkshop(null);
        apiWorkShopList(token).then(res => {
            setSelectItem(res.data.map(name=>{
                return(<MenuItem key={name} value={name}>{name}</MenuItem>)
            }))
        }).catch(err => {
        });
    }
    const fetchData = (name) => {
        let data = {
            name:name,
            token:token
        }
        apiDevicesData(data).then(res=>{
            let keys = Object.keys(res.data[0]);
            setKeys(keys);
            setDatas(res.data);
        }).catch(err=>{

        })
    }

    const handleFileChange = (e) => {
        if(e.target.files.length > 0){
            var filename = e.target.files[0].name;
            setDataStatus(filename);
            filename = filename.match(/(.*)\.[^.]+$/)[1];
            setUpload(true);

            const file = e.target.files[0];
            let formData = new FormData();
            formData.append("image", file);
            
            let data = {};
            data['token'] = token;
            data['file'] = formData;
            data['name'] = filename;
            
            apiMapPost(data).then(res=>{
                setUpload(false);
                updateData();
                setDataStatus("上传完毕");
                console.log(res);
             }).catch(err => {
                 // 後端沒有擋擋名錯誤
                console.log(err.response.data);
                alert('档名有误');
             })
        } else {
            setDataStatus("No File Chosen");
        }
    }
    
    return(
        <ThemeProvider theme={darkTheme}>
            <Card >
            <CardHeader title="车间 Layout 图上传" />
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
                        <Input type="file" accept="image/png" id="contained-button-file"  onChange={handleFileChange} /> 
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
            </CardContent>
            </Card>
        </ThemeProvider>
        )
}