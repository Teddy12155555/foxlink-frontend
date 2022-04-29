import React, { useState, useEffect } from "react";

import { Avatar, Box, Card, CardContent, Grid, 
  Typography, Dialog, DialogTitle, DialogContent, Button, DialogActions
} from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

export function AbnormalMissions({list_data, ...rest}) {
  useEffect(()=> {
    if(list_data.length > 0){
      const display = list_data.map(
        mission => {
          return (
            <Card sx={{m:1
            }}
            key={mission.mission_id}>
              <CardContent>
                  <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="overline"
                      fontSize="large"
                  >
                    任務 ID : {mission.mission_id}
                  </Typography>
                  <Typography>
                    裝置 ID : {mission.device_id}
                  </Typography>
                  <Typography>
                  category : {mission.category}
                  </Typography>
                  <Typography>
                  訊息 : {mission.message}
                  </Typography>
              </CardContent>
            </Card>
          )
        }
      )
        setData(display);
    }
}, [])
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Card
    sx={{ height: '100%' }}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
            fontSize="large"
          >
            前十大歷史機台異常任務
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {list_data.length}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'info.main',
              height: 56,
              width: 56
            }}
          >
            <AssignmentLateIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
      <Button variant="contained" onClick={handleClickOpen}>
        查看
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Top Abnormal Missions This Month"}
        </DialogTitle>
        <DialogContent>
          {
            data
          }
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose} autoFocus variant="contained">
            關閉
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </CardContent>
  </Card>
  );
} 
