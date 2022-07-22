import React, { useState, useRef, useEffect } from "react";

import { Box, Button, Container, Card, CardHeader, TextField, Typography, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Logo } from "../components/logo.js";

import {apiUserLogin, apiUserLevel} from "../api.js";

  const darkTheme = createTheme({
    palette: {
        mode:'dark',
        background: {
            default: '#1a1e2b',
            paper: '#1a1e2b',
          },
          text: {
            primary: '#EDF2F7',
          },
          primary: {
            // Purple and green play nicely together.
            main: '#5048E5',
        },
    },
  });

const Login = ({setAuth, authed, setUser, setIdx, setOpen, setToken, ...rest}) => {
    const _isMounted = useRef(true);

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => { // ComponentWillUnmount in Class Component
        _isMounted.current = false;
    }
  }, []);

  function handleOnClick(){
        let account = document.getElementById('account').value;
        let password = document.getElementById('password').value;
        
        setAccount(account);
        setPassword(password);

        let data = `grant_type=&username=${account}&password=${password}&scope=&client_id=&client_secret=`
        apiUserLogin(data)
        .then(res=> {
            if (_isMounted.current){
                if(res.status == 200){
                    let tk = res.data['access_token'];
                    setToken(tk);
                    apiUserLevel(tk).then(res2=> {
                        if(res2.data['level'] >= 2){
                            setUser({
                                name: res2.data['username'],
                                level: res2.data['level']
                            });
                            setAuth(true);
                            setOpen(true);
                        }else {
                            alert("权限不足");
                            return;
                        }
                    }).catch(err =>{
                        console.log(err);
                        alert("网路连线异常");
                        return;
                    })
                }
            }
        })
        .catch(err=> {
            console.log(err);
            if(err.response.status == 401){
                alert("帐密错误");
            } else if (err.response.status == 422){
                alert("验证错误，请重试");
            }
            
            document.getElementById('account').value = "";
            document.getElementById('password').value = "";
    })

  }


  return (
    <>
    <ThemeProvider theme={darkTheme}>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', background:'#121212' }}
            >
            <Grid item xs={3}>
                <Box
                        component="main"
                        sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexGrow: 1,
                        minHeight: '100%',
                        maxWidth:'sm',
                        background:'#1a1e2b',
                        borderRadius:4,
                        border:'solid',
                        borderColor:'#2D3748'
                        }}
                    >
                <Container maxWidth="sm">
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{pt:5}}
                        >
                            <Grid item xs={3}>
                                <Logo/>
                            </Grid>
                    </Grid>
                    <Box sx={{ 
                        pt:5,
                        my: 3 }}>
                        <Typography
                        color="textPrimary"
                        variant="h4"
                        >
                        系统登入
                        </Typography>
                        <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                        >
                        使用主管级帐户进入
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                        pb: 1,
                        pt: 3
                        }}
                    >
                    </Box>
                    <TextField
                        fullWidth
                        label="帐户"
                        margin="normal"
                        name="account"
                        id="account"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="密码"
                        margin="normal"
                        name="password"
                        id="password"
                        type="password"
                        variant="outlined"
                    />
                    <Box sx={{ py: 2 }}>
                        <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={handleOnClick}
                        >
                        登入
                        </Button>
                    </Box>
                </Container>
                </Box>
            </Grid>  
        </Grid> 
             
    </ThemeProvider>
    </>
  );
}

export default Login;