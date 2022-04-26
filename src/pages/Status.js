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
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

 import { Rate } from "../components/rate.js";
 import { Emergency } from "../components/emergency.js";

import {apiStatistics} from "../api.js";

export default function Status({authed, ...rest}) {
    const [value, setvalue] = useState(0);
    const [statusData, setData] =useState({});
    useEffect(()=> {
        apiStatistics(null).then(res=>{
            setData(res.data);
            console.log(res.data);
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={9}
            sm={12}
            xl={9}
            xs={12}
          >
            <Emergency list_data={[]} rate={100}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            {
                statusData && statusData['login_users_percentage_this_week'] 
                && <Rate rate={statusData['login_users_percentage_this_week']} />
            }
          </Grid>
        </Grid>
        // <Container>
        //     {
        //         authed ? 
        //         <div>
        //             {/*緊急通報*/}
        //             <Accordion>
        //                 <AccordionSummary
        //                 expandIcon={<ExpandMoreIcon />}
        //                 aria-controls="panel1a-content"
        //                 id="panel1a-header"
        //                 >
        //                 <Typography color="red">緊急通報</Typography>
        //                 </AccordionSummary>
        //                 <AccordionDetails>
        //                 <Typography color="red">
        //                 {
        //                     statusData && statusData['current_emergency_mission']
        //                 }
        //                 </Typography>
        //                 </AccordionDetails>
        //             </Accordion>

        //             {/*出勤比例*/}
        //             <Accordion>
        //                 <AccordionSummary
        //                 expandIcon={<ExpandMoreIcon />}
        //                 aria-controls="panel1a-content"
        //                 id="panel1a-header"
        //                 >
        //                 <Typography>出勤人數比例</Typography>
        //                 </AccordionSummary>
        //                 <AccordionDetails>
        //                 <Typography color="red">
        //                 {
        //                     statusData && statusData['login_users_percentage_this_week']
        //                 }
        //                 </Typography>
        //                 </AccordionDetails>
        //             </Accordion>

        //             {/*受指派任務總數的前十員工排名*/}
        //             <Accordion>
        //                 <AccordionSummary
        //                 expandIcon={<ExpandMoreIcon />}
        //                 aria-controls="panel1a-content"
        //                 id="panel1a-header"
        //                 >
        //                 <Typography>受指派任務總數的前十員工排名</Typography>
        //                 </AccordionSummary>
        //                 <AccordionDetails>
        //                     <Typography color="text.secondary">
        //                         User Name {bull} Full Name {bull} Count
        //                     </Typography>
        //                 </AccordionDetails>
        //                 <AccordionDetails>
        //                 {
        //                     statusData['top_most_accept_mission_employees'] &&
        //                     statusData['top_most_accept_mission_employees'].map(
        //                         user => (
        //                             <Typography color="blue">({user['username']} {bull} {user['full_name']} {bull} {user['count']})</Typography>))
        //                 }
                        
        //                 </AccordionDetails>
        //             </Accordion>

        //             {/*拒絕指派任務總數的前三員工排名*/}
        //             <Accordion>
        //                 <AccordionSummary
        //                 expandIcon={<ExpandMoreIcon />}
        //                 aria-controls="panel1a-content"
        //                 id="panel1a-header"
        //                 >
        //                 <Typography>拒絕指派任務總數的前三員工排名</Typography>
        //                 </AccordionSummary>
        //                 <AccordionDetails>
        //                     <Typography color="text.secondary">
        //                         User Name {bull} Full Name {bull} Count
        //                     </Typography>
        //                 </AccordionDetails>
        //                 <AccordionDetails>
        //                 {
        //                     statusData['top_most_reject_mission_employees'] &&
        //                     statusData['top_most_reject_mission_employees'].map(
        //                         user => (
        //                             <Typography color="blue">({user['username']} {bull} {user['full_name']} {bull} {user['count']})</Typography>))
        //                 }
                        
        //                 </AccordionDetails>
        //             </Accordion>

        //             {/*機臺異常處理時間/次數 前十大*/}
        //             <Accordion>
        //                 <AccordionSummary
        //                 expandIcon={<ExpandMoreIcon />}
        //                 aria-controls="panel1a-content"
        //                 id="panel1a-header"
        //                 >
        //                 <Typography>機臺異常處理時間/次數 前十大</Typography>
        //                 </AccordionSummary>
        //                 <AccordionDetails>
        //                     <Typography color="text.secondary">
        //                         Mission Id {bull} Category {bull} Description
        //                     </Typography>
        //                 </AccordionDetails>
        //                 <AccordionDetails>
        //                 {
        //                     statusData['devices_stats'] && 
        //                     statusData['devices_stats']['top_abnormal_missions_this_month'] &&
        //                     statusData['devices_stats']['top_abnormal_missions_this_month'].map(
        //                         mission => (
        //                             <Typography color="blue">({mission['mission_id']} {bull} {mission['category']} {bull} {mission['description']})</Typography>))
        //                 }
                        
        //                 </AccordionDetails>
        //             </Accordion>

        //             {/*前十大歷史機台異常任務*/}
        //             <Accordion>
        //                 <AccordionSummary
        //                 expandIcon={<ExpandMoreIcon />}
        //                 aria-controls="panel1a-content"
        //                 id="panel1a-header"
        //                 >
        //                 <Typography>前十大歷史機台異常任務</Typography>
        //                 </AccordionSummary>
        //                 <AccordionDetails>
        //                     <Typography color="text.secondary">
        //                         Mission Id {bull} Device Id {bull} Category {bull} Description
        //                     </Typography>
        //                 </AccordionDetails>
        //                 <AccordionDetails>
        //                 {   statusData && statusData['devices_stats'] && 
        //                     statusData['devices_stats']['top_abnormal_missions_this_month'] &&
        //                     statusData['devices_stats']['top_abnormal_missions_this_month'].map(
        //                         mission => (
        //                             <Typography color="blue">({mission['mission_id']} {bull} {mission['device_id']} {bull} {mission['category']} {bull} {mission['description']})</Typography>))
        //                 }
                        
        //                 </AccordionDetails>
        //             </Accordion>
                    
        //         </div>
        //         :
        //         <div>No Authed</div>
        //     }

        // </Container>
    );
}