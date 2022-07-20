import React, { useState, useEffect, useRef } from "react";

import {
  Box,
  Skeleton,
  Grid,
  Button,
  Typography,
  TextField
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { DateRange } from "../components/dateRange.js";
import { Rate } from "../components/rate.js";
import { Emergency } from "../components/emergency.js";
import { CrashedDevices } from "../components/crashed-devices.js";
import { AcceptMissionEmployees } from "../components/accept-mission-employees.js";
import { RejectMissionEmployees } from "../components/reject-mission-employees.js";
import { AbnormalMissions } from "../components/abnormal-missions.js";
import { AbnormalDevices } from "../components/abnormal-devices.js";
import { MissionNeedRepair } from "../components/mission-need-repair.js";

import { apiStatistics, apiMissionNeedRepair } from "../api.js";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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

export default function Status({ token, ...rest }) {
  const _isMounted = useRef(true);
  const [statusData, setData] = useState();
  const [missionData, setMissions] = useState();

  const [sDate, setSDate] = useState();
  const [eDate, setEDate] = useState();
  const [shift, setShift] = useState(true);
  
  useEffect(() => {
    updatedata();
  }, [])

  const updatedata = () => {
    apiMissionNeedRepair(token).then(res => {
      console.log(res.data);
      setMissions(res.data);
    })
    apiStatistics(null).then(res => {
      console.log(res.data);
      setData(res.data);
    })
  }

  return (
    <ThemeProvider theme={darkTheme}>
      {
        statusData && 
        <Grid
        container
        spacing={3}
      >
        <Grid item xs={8}>
          <DateRange sDate={sDate} eDate={eDate} setSDate={setSDate} setEDate={setEDate} shift={shift} setShift={setShift}/>
        </Grid>
        <Grid item xs={4} justifyContent={"center"}>
          <Button size="large" variant="outlined" onClick={() => {
            // query
            }}>更新资料</Button>
        </Grid>
        <Grid
          item
          lg={4}
        >
          {statusData['current_emergency_mission'] &&
            <Emergency list_data={statusData['current_emergency_mission']} />}
        </Grid>
        <Grid
          item
          lg={4}
        >
          {
            statusData
            && (statusData['login_users_percentage_this_week'] == 0 ? <Rate rate={0} /> :
              <Rate rate={statusData['login_users_percentage_this_week']} />
            )
          }
        </Grid>
        <Grid
          item
          lg={4}
        >
          {
            statusData.devices_stats &&
            <CrashedDevices list_data={statusData.devices_stats.most_frequent_crashed_devices} />
          }
        </Grid>
        <Grid
          item
          lg={4}
        >
          {
            statusData.top_most_accept_mission_employees &&
            <AcceptMissionEmployees list_data={statusData.top_most_accept_mission_employees} />
          }

        </Grid>
        <Grid
          item
          lg={4}
        >
          {
            statusData.top_most_reject_mission_employees &&
            <RejectMissionEmployees list_data={statusData.top_most_reject_mission_employees} />
          }

        </Grid>
        <Grid
          item
          lg={4}
        >
          {
            statusData.devices_stats &&
            <AbnormalMissions list_data={statusData.devices_stats.top_abnormal_missions_this_month} />
          }

        </Grid>
        <Grid
          item
          lg={4}
        >
          {
            statusData.devices_stats &&
            <AbnormalDevices list_data={statusData.devices_stats.top_abnormal_devices} />
          }
        </Grid>
        <Grid
        item
        lg={4}
        >
          {
            missionData ?  
            (
              <MissionNeedRepair list_data={missionData} />
            ) : 
            (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  p: 8,
                }}
              >
                <Skeleton
                  sx={{ bgcolor: 'grey.900' }}
                  variant="rectangular"
                  width={1000}
                  height={80}
                >
                  <Typography>.</Typography>
                </Skeleton>
              </Box>
            )
          }
        </Grid>
        </Grid>
      }
    </ThemeProvider>

  );
}