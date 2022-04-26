import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import React, { useState } from "react";
import foxlinkLogo from '../assets/foxlink_logo.png';

export const Logo = ({handler}) => {
  return (
    <Button onClick={handler}>
      <img src={foxlinkLogo}width="178" height="46"/>
    </Button>
  );
};


