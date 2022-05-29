import React, { useState, useEffect } from "react";

import { saveAs } from 'file-saver';

import { Box, Card, CardContent, CardHeader, Divider, Typography, createTheme, Container, ThemeProvider,InputLabel, MenuItem, Select,FormControl } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import MapIcon from '@mui/icons-material/Map';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import {apiWorkShopList, apiMapGet} from "../api.js";
import { width } from "@mui/system";

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

export default function Map({token, ...rest}) {
  const [downloading, setDownload] = useState(false);
    const [workshop, setWorkshop] = useState("");
    
    const [selectItem, setSelectItem] = useState("");
    const [img, setImg] = useState();

    let displayWorkShop = "";
    const style = {
        'max-width': '100%',
      };
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

    const arrayBufferToBase64 = (buffer) =>  {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      const img_component = <img src={`data:image/png;base64,${window.btoa(binary)}`} style={style} />;
      setImg(img_component);
  };

    const mapHandler = () => {
        if(workshop != ""){
            setDownload(true);
            const data = {
                "name" : workshop,
                "token" : token
            }
            apiMapGet(data)
            .then(res => {
                    //saveAs(res.data, `${workshop}.png`);
                    arrayBufferToBase64(res.data);
                    //setImg(res.data);
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
                <CardHeader title="车间地图显示" />
                <Divider sx={{ borderBottomWidth: 3 }}/>
                <CardContent>
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                    >
                    <MapIcon fontSize="large" />
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                    >   
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            请选取要显示的车间
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
                                    onClick={mapHandler}
                                    endIcon={<ArrowCircleDownIcon color="white"/>}
                                    loading={downloading}
                                    loadingPosition="end"
                                    variant="contained"
                                    sx={{m:3}}
                                    color="primary"
                                    size="large"
                                >
                                    显示
                                </LoadingButton>
                        </FormControl>   
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    >
                    <Container sx={{
                    width: '-webkit-fill-available',
                    overflowX:'scroll'}}>
                        {img}
                    </Container>
                    </Box>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}