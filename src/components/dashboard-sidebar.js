import React, { useState } from "react";

import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as StatusIcon } from '../icons/chart-bar';
import { Layout as LayoutIcon } from '../icons/layout';
import { QRCode as QRCodeIcon } from '../icons/qrcode';
import { Info as InfoIcon } from '../icons/info';
import { Device as DeviceIcon } from '../icons/device';

import { Selector as SelectorIcon } from '../icons/selector';


import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';

import { DashboardNavbar } from './dashboard-navbar';

import { NavItem } from './nav-item';


export const DashboardSidebar = ({idx, setIdx}) => {

    const items = [
        {
          index: 3,
          icon: (<StatusIcon fontSize="small" />),
          title: '統計資料',
          active: false
        },
        {
          index: 4,
          icon: (<QRCodeIcon fontSize="small" />),
          title: 'QR Code 下載',
          active: false
        }
      ];

    const upload_items = [
      {
        index: 0,
        icon: (<InfoIcon fontSize="small" />),
        title: '車間員工資訊表 上傳',
        active: false
      },
      {
        index: 1,
        icon: (<LayoutIcon fontSize="small" />),
        title: '車間 Layout 座標表 上傳',
        active: false
      },
      {
        index: 2,
        icon: (<DeviceIcon fontSize="small" />),
        title: '專案 Device 事件簿 上傳',
        active: false
      }
    ];

    const handleLogo = () => {
      setIdx(-1);
    }
    const content = (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
          >
            <div>
              <Box sx={{ p: 3 }}>
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42
                    }}
                    handler={handleLogo}
                  />
                </a>
              </Box>
            </div>
            <Divider
              sx={{
                borderColor: '#2D3748',
                my: 3,
                height:1.5
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              {items.map((item) => (
                <NavItem
                  key={item.title}
                  icon={item.icon}
                  index={item.index}
                  title={item.title}
                  globalIdx={idx}
                  setIdx={setIdx}
                />
              ))}
            </Box>
            <Divider
              sx={{
                borderColor: '#2D3748',
                my: 3,
                height:1.5
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
                {upload_items.map((item) => (
                  <NavItem
                    key={item.title}
                    icon={item.icon}
                    index={item.index}
                    title={item.title}
                    globalIdx={idx}
                    setIdx={setIdx}
                  />
                ))}
              </Box>
          </Box>
        </>
      );

    return (
      <>
        
        <Drawer
          anchor="left"
          PaperProps={{
            sx: {
              backgroundColor: '#111827',
              color: '#FFFFFF',
              width: 280
            }
          }}
          variant="permanent"
        >
          {content}
        </Drawer>
        <DashboardNavbar  />
      </>
      
    );
  };