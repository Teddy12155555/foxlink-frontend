import React, { useState, useEffect } from "react";

import { 
    Button,
    Box,
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Form,
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails
 } from '@mui/material';
 import { createTheme, ThemeProvider } from '@mui/material/styles';

 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

 import { Rate } from "../components/rate.js";
 import { Emergency } from "../components/emergency.js";
 import { CrashedDevices } from "../components/crashed-devices.js";
 import { AcceptMissionEmployees } from "../components/accept-mission-employees.js";
 import { RejectMissionEmployees } from "../components/reject_mission_employees.js";
 import { AbnormalMissions } from "../components/abnormal-missions.js";
 import { AbnormalDevices } from "../components/abnormal-devices.js";

import {apiStatistics} from "../api.js";

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
        primary: {
          // Purple and green play nicely together.
          main: '#5048E5',
      },
  },
});

export default function Status({authed, ...rest}) {
    const [value, setvalue] = useState(0);
    const [statusData, setData] =useState({});
    useEffect(()=> {
        apiStatistics(null).then(res=>{
            setData(res.data);
        })
    }, [])
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
    );

    return (
      <ThemeProvider theme={darkTheme}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
          >
            <Emergency list_data={[]} rate={100}/>
          </Grid>
          <Grid
            item
            lg={4}
          >
            {
                statusData['login_users_percentage_this_week'] 
                && <Rate rate={statusData['login_users_percentage_this_week']} />
            }
          </Grid>
          <Grid
          item
          lg={4}
          >
            {
              statusData.devices_stats && 
               <CrashedDevices list_data={statusData.devices_stats.most_frequent_crashed_devices}/>
            }
          </Grid>
          <Grid
          item
          lg={4}
          >
            {
              statusData.top_most_accept_mission_employees &&
              <AcceptMissionEmployees list_data={statusData.top_most_accept_mission_employees}/>
            }
            
          </Grid>
          <Grid
          item
          lg={4}
          >
            {
              statusData.top_most_reject_mission_employees &&
              <RejectMissionEmployees list_data={statusData.top_most_reject_mission_employees}/>
            }
            
          </Grid>
          <Grid
          item
          lg={4}
          >
            {
              statusData.devices_stats &&
              <AbnormalMissions list_data={statusData.devices_stats.top_abnormal_missions_this_month}/>
            }
            
          </Grid>
          <Grid
          item
          lg={4}
          >
            {
              statusData.devices_stats &&
              <AbnormalDevices list_data={statusData.devices_stats.top_abnormal_devices}/>
            }
          </Grid>
        </Grid>
      </ThemeProvider>

    );
}