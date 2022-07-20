import React, { useState, useEffect } from "react";

import { styled } from '@mui/material/styles';
import {
    Box,
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
    MenuItem,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import ExcelTableView from "../components/excel-table-view";
import { Parameter } from "../components/parameter";
import { AlertComponent } from "../components/alert-component";

import { Upload } from '../icons/upload';
import { apiDevices, apiWorkShopList, apiDevicesData } from "../api.js";

const CONTENT = {
    id: "装置 ID",
    project: "专案",
    process: "制程段",
    line: "产线",
    device_name: "装置代号",
    device_cname: "装置名称",
    workshop: "车间",
    x_axis: "X 轴座标",
    y_axis: "Y 轴座标",
    is_rescue: "是否为救援站",
    sop_link: "SOP 链接"
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
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

export default function DevicesUpload({ token, ...rest }) {
    const [dataStatus, setDataStatus] = useState("No File Chosen");
    const [uploading, setUpload] = useState(false);
    // init workshop
    const [selectItem, setSelectItem] = useState("");
    const [workshop, setWorkshop] = useState("");
    const [keys, setKeys] = useState();
    const [id2words, setId2Word] = useState();
    const [datas, setDatas] = useState();

    const [parameter, setParameter] = useState();

    const [alert, setAlert] = useState(false);
    const [errmsg, setErrMsg] = useState();

    useEffect(() => {
        updateData();
    }, [])

    useEffect(()=>{
        if(errmsg){
            setAlert(true);
        }
    }, [errmsg])

    const updateData = () => {
        setUpload(false);
        setWorkshop(null);
        setKeys(null);
        setDatas(null);
        apiWorkShopList(token).then(res => {
            setSelectItem(res.data.map(name => {
                return (<MenuItem key={name} value={name}>{name}</MenuItem>)
            }))
        }).catch(err => {
        });
    }
    const fetchData = (name) => {
        let data = {
            name: name,
            token: token
        }
        apiDevicesData(data).then(res => {
            let keys = Object.keys(res.data[0]);
            let newKeys = []
            keys.map(key => {
                newKeys.push(CONTENT[key]);
            })
            setKeys(keys);
            setId2Word(newKeys);
            setDatas(res.data);
        }).catch(err => {
            setErrMsg(err.response.statusText);
        })
    }

    const handleWorkshopChange = (event) => {
        setWorkshop(event.target.value);
        fetchData(event.target.value);
    }

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {

            setDataStatus(e.target.files[0].name);

            setUpload(true);

            const file = e.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            formData.append("clear_all", true);

            let data = {};
            data['token'] = token;
            data['file'] = formData;

            apiDevices(data).then(res => {
                if (res.status === 201) {
                    setUpload(false);
                    updateData();
                    let rawdata = res.data['parameter'].split(/\n/);
                    let processed_data = [];
                    let keys = []
                    rawdata.map((line, i) => {
                        if (i == 0) {
                            keys = line.split(',');
                            keys[0] = 'idx';
                        } else {
                            let temp = line.split(',');
                            let obj = {};
                            temp.map((item, j) => {
                                obj[keys[j]] = temp[j];
                            })
                            processed_data.push(obj);
                        }
                    });
                    let csv_data = {
                        'keys': keys,
                        'datas': processed_data
                    }

                    setParameter(csv_data);
                }
            }).catch(err => {
                console.log(err);
                setErrMsg("档案格式有误, 请重新上传！");
                updateData();
            })
        } else {
            setDataStatus("No File Chosen");
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <AlertComponent open={alert} setOpen={setAlert} message={errmsg} severity={"error"}/>
            <Card >
                <CardHeader title="车间 Layout 座标表上传" />
                <Divider sx={{ borderBottomWidth: 3 }} />
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',

                        }}
                    >
                        <Upload fontSize="large" />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 2
                        }}
                    >
                        <label htmlFor="contained-button-file">
                            <Input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="contained-button-file" onChange={handleFileChange} />
                            <LoadingButton
                                color="success"
                                variant="contained"
                                size="large"
                                component="span"
                                startIcon={<CloudUploadOutlinedIcon sx={{ mr: 1 }} />}
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
                    {
                        parameter && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    pt: 2
                                }}
                            >
                                <Divider sx={{ borderBottomWidth: 3 }} />
                                <Parameter csv_data={parameter} />
                            </Box>
                        )
                    }
                    <Divider sx={{ borderBottomWidth: 3, m: 3 }} />
                    {
                        selectItem &&
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                m: 2
                            }}
                        >
                            <Typography sx={{ m: 1 }}>
                                现有资料 :
                            </Typography>
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel id="workshop-label">Workshop</InputLabel>
                                <Select
                                    labelId="workshop-label"
                                    id="workshop-select"
                                    value={workshop == null ? '' : workshop}
                                    onChange={handleWorkshopChange}
                                >
                                    {
                                        selectItem
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    }
                    <Box>
                        {
                            keys && datas && id2words &&
                            <ExcelTableView keys={keys} datas={datas} id2words={id2words} />
                        }
                    </Box>
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}