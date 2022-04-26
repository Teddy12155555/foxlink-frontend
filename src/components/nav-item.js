import { Box, Button, ListItem } from '@mui/material';
import React, { useState } from "react";
export const NavItem = (props) => {
  const { index, icon, title, globalIdx, setIdx, ...others } = props;
  const active = index == globalIdx ? true : false;

  const handleClick = () => {
    setIdx(index);
  }

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color: active ? '#10B981' : '#D1D5DB',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? '#10B981' : '#9CA3AF'
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
          onClick={handleClick}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
      </Button>
    </ListItem>
  );
};

