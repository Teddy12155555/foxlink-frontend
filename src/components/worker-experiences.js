import React, { useState, useEffect } from "react";

import { Table, TableRow, TableHead, TableCell,  Box, Card, CardContent, Grid, 
  Typography, Dialog, DialogTitle, DialogContent, Button, DialogActions, TableBody
} from '@mui/material';
import BrokenImageSharpIcon from '@mui/icons-material/BrokenImageSharp';

export function WorkExperiences({list_data, ...rest}) {
  useEffect(()=> {
    let keys = ["project", "process", "line", "exp"]

    const display = list_data.map(
      exp => {
        return (
          <Card sx={{m:1, 
          }}
          key={exp.project}>
            <CardContent >
                <Table>
                  <TableHead sx={{background:"#272d3a"}}> 
                    <TableRow>
                      {
                        keys.map((key, index) => {
                          return <TableCell key={index}>{key}</TableCell>
                      })
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {
                        keys.map((key, index) => {
                          return <TableCell key={exp[key]}>{exp[key]}</TableCell>
                      })
                      }
                    </TableRow>
                  </TableBody>
                </Table>
            </CardContent>
          </Card>
        )
      }
    )
    setData(display);
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
    <Box sx={{ pt: 3,minWidth:'100%' }}>
      <Button variant="contained" onClick={handleClickOpen}>
        查看
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{minWidth:'900px'}}
      >
        <DialogTitle id="alert-dialog-title">
          經驗
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
  );
} 
