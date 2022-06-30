import React, { useState, useEffect, useRef } from "react";

import {
  Box,
  Grid,
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Rate } from "../components/rate.js";
import { Emergency } from "../components/emergency.js";
import { CrashedDevices } from "../components/crashed-devices.js";
import { AcceptMissionEmployees } from "../components/accept-mission-employees.js";
import { RejectMissionEmployees } from "../components/reject_mission_employees.js";
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
  const UPDATE_SECOND = 5;
  const _isMounted = useRef(true);

  const [statusData, setData] = useState();
  const [missionData, setMissions] = useState();
  const [timerId, setTimerId] = useState();
  const [updateCount, setUpdateCount] = useState(UPDATE_SECOND);

  useEffect(() => {
    updatedata();
    setTimerId(startCount());

    return () => {
      window.clearInterval(timerId);
    };
  }, [])

  useEffect(() => {
    if (updateCount == 0) {
      stopCount(timerId);
      setUpdateCount(UPDATE_SECOND);
      setTimerId(startCount);
    }

    return () => {
      window.clearInterval(timerId);
    };
  }, [updateCount])

  const startCount = () => {
    return window.setInterval(() =>
      setUpdateCount(updateCount => updateCount - 1), 1000);
  }
  const stopCount = timerId => {
    window.clearInterval(timerId);
    updatedata();
  }
  const updatedata = () => {
    apiStatistics(null).then(res => {
      setData(res.data);
    })
    apiMissionNeedRepair(token).then(res => {
      setMissions(res.data);
    })
  }

  return (
    <ThemeProvider theme={darkTheme}>
      {
        statusData && missionData && 
        <Grid
        container
        spacing={3}
      >
        <Grid item lg={12}>
          <Button variant="outlined" onClick={updatedata}>更新资料</Button>
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
            statusData['login_users_percentage_this_week']
            && (statusData['login_users_percentage_this_week'] == null ? <Rate rate={0} /> :
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
            missionData &&
            <MissionNeedRepair list_data={missionData} />
           }
        </Grid>
      </Grid>
      }
    </ThemeProvider>

  );
}