import React from "react";

import { Box, Divider, Drawer } from '@mui/material';
import { ChartBar as StatusIcon } from '../icons/chart-bar';
import { Layout as LayoutIcon } from '../icons/layout';
import { QRCode as QRCodeIcon } from '../icons/qrcode';
import { Info as InfoIcon } from '../icons/info';

import SummarizeIcon from '@mui/icons-material/Summarize';
import MapIcon from '@mui/icons-material/Map';

import { Logo } from './logo';

import { DashboardNavbar } from './dashboard-navbar';

import { NavItem } from './nav-item';


export const DashboardSidebar = ({idx, setIdx}) => {

    const items = [
        {
          index: 3,
          icon: (<StatusIcon fontSize="small" />),
          title: '统计资料',
          active: false
        },
        {
          index: 4,
          icon: (<QRCodeIcon fontSize="small" />),
          title: 'QR Code 下载',
          active: false
        },
        {
          index: 5,
          icon: (<MapIcon fontSize="small" />),
          title: '车间地图',
          active: false
        },
        {
          index : 7,
          icon: (<SummarizeIcon fontSize="small"/>),
          title: '白名單',
          active: false
        }
      ];

    const upload_items = [
      {
        index: 1,
        icon: (<LayoutIcon fontSize="small" />),
        title: 'Layout 座标表 上传',
        active: false
      },
      {
        index: 0,
        icon: (<InfoIcon fontSize="small" />),
        title: '员工专职表 上传',
        active: false
      },
      /*
      {
        index: 2,
        icon: (<DeviceIcon fontSize="small" />),
        title: '专案 Device 事件簿 上传',
        active: false
      },
      */
      {
        index : 6,
        icon: (<MapIcon fontSize="small"/>),
        title: '车间地图 上传',
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