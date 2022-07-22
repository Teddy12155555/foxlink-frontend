import React from "react";

import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography, TextField, Stack, Switch, SwitchProps } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const DateRange = ({sDate, eDate, setSDate, setEDate, shift, setShift}) => {

  const handleChange = (event) => {
    setShift(event.target.checked);
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
              日期设定
            </Typography>
          </Grid>
          <Box sx={{ pt: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="开始日期"
                  value={sDate}
                  onChange={(newValue) => {
                    setSDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="结束日期"
                value={eDate}
                onChange={(newValue) => {
                  setEDate(newValue);
                  //console.log(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
              <Typography>夜</Typography>
              <Switch checked={shift} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
              <Typography>日</Typography>
          </Stack>
        </Grid>
      </CardContent>
    </Card>
  );
} 
