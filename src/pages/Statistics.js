import React, { useState, useEffect, useRef } from "react";

import {
  Box,
  Card,
  Skeleton,
  Grid,
  Button,
  Typography,
  FormControl,
  InputLabel
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { DateRange } from "../components/date-range.js";
import { Rate } from "../components/rate.js";
import { Emergency } from "../components/emergency.js";
import { CrashedDevices } from "../components/crashed-devices.js";
import { AcceptMissionEmployees } from "../components/accept-mission-employees.js";
import { RejectMissionEmployees } from "../components/reject-mission-employees.js";
import { AbnormalMissions } from "../components/abnormal-missions.js";
import { AbnormalDevices } from "../components/abnormal-devices.js";
import { MissionNeedRepair } from "../components/mission-need-repair.js";
import { WorkshopPicker } from "../components/workshop-picker.js";

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
  const [workshop, setWorkshop] = useState("");

  const [sDate, setSDate] = useState(new Date());
  const [eDate, setEDate] = useState(new Date());
  const [shift, setShift] = useState(true);
  
  useEffect(() => {
    //updatedata();
  }, [])

  const updatedata = (data) => {
    apiMissionNeedRepair(token).then(res => {
      //console.log(res.data);
      setMissions(res.data);
    }).catch(err => {
      console.log(err);
    })
    apiStatistics(data).then(res => {
      //console.log(res.data);
      setData(res.data);
    }).catch(err => {
      if(workshop === ""){
        alert("请选取车间");
      }
      console.log(err);
      // need error handling
    })
  }
  const handleOnClick = () => {
    const data = {
      start: new Date(sDate).toISOString(),
      end: new Date(eDate).toISOString(),
      workshop: workshop
    }
    updatedata(data);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid
        container
        spacing={3}
        sx={{pb:5}}
        >
          <Grid item xs={8}>
            <DateRange sDate={sDate} eDate={eDate} setSDate={setSDate} setEDate={setEDate} shift={shift} setShift={setShift}/>
          </Grid>
        <Grid item xs={4} justifyContent={"center"}>
          <Card >
            <Box>
              <FormControl sx={{mt:3, mb:3, mr:3, ml: 3}}>
                  <InputLabel id="demo-simple-select-label" >WorkShop</InputLabel>
                  <WorkshopPicker token={token} workshop={workshop} setWorkshop={setWorkshop} />
              </FormControl>
              <Button sx={{mt:3, mb:3}} size="large"  variant="contained" onClick={handleOnClick}>更新资料</Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
      {
        statusData && 
        <Grid
        container
        spacing={3}
        >
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