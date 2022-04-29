import React, { useState, useEffect } from "react";

import { saveAs } from 'file-saver';

import { Box, Card, CardContent, CardHeader, Divider, Typography, createTheme, TextField, ThemeProvider,InputLabel, MenuItem, Select,FormControl } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { QRCode as QRCodeIcon } from '../icons/qrcode';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import {apiWorkShopList, apiQRCode} from "../api.js";

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



export default function QrcodeDownload({token, ...rest}) {
    const [downloading, setDownload] = useState(false);
    const [workshop, setWorkshop] = useState("");
    
    const [selectItem, setSelectItem] = useState("");

    let displayWorkShop = "";

    useEffect(()=> {
        apiWorkShopList(token).then(res => {
            setSelectItem(res.data.map(name=>{
                return(<MenuItem key={name} value={name}>{name}</MenuItem>)
            }))
        }).catch(err => {

        });
    }, [])

    const handleChange = (event) => {
        setWorkshop(event.target.value)
    }

    const qrCodeHandler = () => {
        //let data = `grant_type=&username=${account}&password=${password}&scope=&client_id=&client_secret=`
        if(workshop != ""){
            setDownload(true);
            const data = {
                "name" : workshop,
                "token" : token
            }
            apiQRCode(data)
            .then(res => {
                    saveAs(res.data, `${workshop}.zip`);
                    setDownload(false);
                }
            ).catch(
                err => {
                    alert("workshop is not found!");
                }
            )
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Card >
                <CardHeader title="QR Code 下載" />
                <Divider sx={{ borderBottomWidth: 3 }}/>
                <CardContent>
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                    >
                    <QRCodeIcon fontSize="large" />
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                    >   
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            請選取要下載的 Workshop Name (Ex. 第九車間)
                        </Typography>
                    </Box>  
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                    >
                        <FormControl >
                                <InputLabel id="demo-simple-select-label">WorkShop</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={workshop}
                                label="WorkShop"
                                onChange={handleChange}
                                >
                                    {
                                        selectItem
                                    }
                                </Select>
                                <LoadingButton
                                    onClick={qrCodeHandler}
                                    endIcon={<ArrowCircleDownIcon color="white"/>}
                                    loading={downloading}
                                    loadingPosition="end"
                                    variant="contained"
                                    sx={{m:3}}
                                    color="primary"
                                    size="large"
                                >
                                    下載
                                </LoadingButton>
                        </FormControl>   
                    </Box>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}
