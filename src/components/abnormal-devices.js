import React, { useState, useEffect } from "react";

import { Avatar, Box, Card, CardContent, Grid, 
  Typography, Dialog, DialogTitle, DialogContent, Button, DialogActions
} from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export function AbnormalDevices({list_data, ...rest}) {
  useEffect(()=> {
    if(list_data.length > 0){
      const display = list_data.map(
        device => {
          return (
            <Card sx={{m:1
            }}
            key={device.device_id}>
              <CardContent>
                  <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="overline"
                      fontSize="large"
                  >
                    装置 ID : {device.device_id}
                  </Typography>
                  <Typography>
                  category : {device.category}
                  </Typography>
                  <Typography>
                  信息 : {device.message}
                  </Typography>
                  <Typography>
                  top_great_assignees : {
                    device.top_great_assignees && 
                    device.top_great_assignees.map(user=>{
                      return (
                        <Card key={user.username}>
                          <CardContent>
                          <Typography
                              color="textSecondary"
                              gutterBottom
                              variant="overline"
                              fontSize="small"
                          >
                            ID : {user.username}
                          </Typography>
                          <Typography fontSize="small">
                            full_name : {user.full_name}
                          </Typography>
                          <Typography fontSize="small">
                          duration : {user.duration}
                          </Typography>
                          </CardContent>
                        </Card>
                      )
                    })
                  }
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
            机台异常处理时间/次数
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
            <InsertChartIcon />
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
          {"Top Abnormal Devices"}
        </DialogTitle>
        <DialogContent>
          {
            data
          }
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose} autoFocus variant="contained">
          关闭
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </CardContent>
  </Card>
  );
} 
