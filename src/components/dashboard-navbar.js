import React from "react";

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';

import { UserCircle as UserCircleIcon } from '../icons/user-circle';


const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
 // backgroundColor: "#0c0d13",
  backgroundColor: "#FFFFFF",
  boxShadow: '0px 1px 4px rgba(100, 116, 139, 0.12)'
}));

export function DashboardNavbar({userinfo, ...rest}){
  return (
    <>
    {
      userinfo && <DashboardNavbarRoot
      sx={{
        left: {
          lg: 280
        },
        width: {
          lg: 'calc(100% - 280px)'
        }
      }}
      >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title={`You are ${userinfo.name} !`}>
          <IconButton sx={{ ml: 1 }}>
            <Typography>
                {userinfo.name}
            </Typography>
          </IconButton>
        </Tooltip>
        <Tooltip title={`Level ${userinfo.level}`}>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Tooltip>
      </Toolbar>
    </DashboardNavbarRoot>
    }
    </>
  );
};

