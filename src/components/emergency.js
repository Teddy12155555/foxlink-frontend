import React, { useState } from "react";

import { Avatar, Box, Card, CardContent, Grid, CardHeader, Typography, Divider } from '@mui/material';
import ReportGmailerrorredSharpIcon from '@mui/icons-material/ReportGmailerrorredSharp';
import PerfectScrollbar from 'react-perfect-scrollbar';

export function Emergency({rate, list_data, ...rest}) {
  const data = list_data.map(mission => {
    return(<Grid item>
      <Card>
        <CardHeader title={mission['mission_id']}/>
      </Card>
    </Grid>)
  })
  
  const _data = [
    (<Grid item>
              <Card>
                <CardHeader title="A" />
                <Divider />
                <Typography>
                  Device ID : 11111
                </Typography>
              </Card>
    </Grid>), (<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>),(<Grid item>
              <Card>
                <CardHeader title="A" />
              </Card>
    </Grid>)
  ]
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
              緊急通報
            </Typography>
            
          </Grid>
          <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <ReportGmailerrorredSharpIcon />
          </Avatar>
        </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'left' }}
        >     
          {_data}
        </Grid>
      </CardContent>
    </Card>
  );
} 
