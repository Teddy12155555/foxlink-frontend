import React, { useState } from "react";
import Login from './LoginPage';
import Status from "./Statistics";
import AllStatus from "./AllStatus";
import QrcodeDownload from "./Qrcode";
import Map from "./Map";

import EventbookUpload from "./EventbookUpload";
import DevicesUpload from "./DevicesUpload";
import WorkerinfoUpload from "./WorkinfoUpload";
import MapUpload from "./MapUpload";
import WhiteList from "./WhiteList";

import MuiAlert from '@mui/material/Alert';
import { Container,Snackbar,Box } from "@mui/material";

import {DashboardLayout} from "../components/dashboard-layout";


export default function Homepage() {
    const DEBUG = false;
    const [token, setToken] = useState("");
    const [authed, setAuth] = useState(DEBUG);
    const [user, setUser] = useState({});
    // page conditional render
    const [pageIdx, setIdx] = useState(-1);

    // bar
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal} = state;

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setOpen(false);
    }

    const conditionalRender = (idx) => {
        switch(idx) {
            case -1: return (<AllStatus token={token} />);
            case 0: return(<WorkerinfoUpload token={token}/>);
            case 1: return(<DevicesUpload token={token}/>);
            case 2: return(<EventbookUpload token={token} />); // not used, only for testing
            case 3: return(<Status token={token} />);
            case 4: return(<QrcodeDownload token={token}/>);
            case 5: return(<Map token={token}/>);
            case 6: return(<MapUpload token={token} />);
            case 7: return(<WhiteList token={token} />);
        }
    }

    return (
        <div>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    登入成功
                </Alert>
            </Snackbar> 
            {
                authed ? 
                (
                    <DashboardLayout idx={pageIdx} setIdx={setIdx} userinfo={user}>
                        {
                            <Box
                                component="main"
                                sx={{
                                flexGrow: 1,
                                py: 6
                                }}
                            >
                                 <Container maxWidth={false}>
                                    {conditionalRender(pageIdx)}
                                 </Container>
                            </Box>
                            
                        }
                    </DashboardLayout>
                ):
                (
                    <Login setAuth={setAuth} setUser={setUser} auth={authed} setIdx={setIdx} setOpen={setOpen} setToken={setToken}/>
                )
            }
        </div>
    );
}