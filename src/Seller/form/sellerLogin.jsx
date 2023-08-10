import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Footer from '../../components/TopBottomBars/Footer';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <NavLink color="inherit" to={'/'} style={{textDecoration:'none', color:'inherit'}} >
        BechDO
      </NavLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();


export default function SellerLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    const data = new FormData(event.currentTarget);
    const email= data.get('email');
    const password = data.get('password')

    axios.post('http://localhost:4000/seller/login', {email,password})
    .then((res)=>{
      console.log("RES:", res)
      localStorage.setItem('sellerToken' , res.data.token)
      localStorage.setItem('seller',res.data.id)
      toast.success(`Welcome ${res.data.firstName}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        navigate("/seller/pages/dashboard");
      }, 1500);
    })
    .catch(()=>{
      toast.error("Error", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        navigate("/seller/register");
      }, 1500);
    }).finally(()=>{
      setLoading(false)
    })
  };

  const token = localStorage.getItem('buyerToken')

  return (
    <ThemeProvider theme={defaultTheme}>


      <Grid container component="main" sx={{ height: '80vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.cisco.com/c/en/us/products/security/what-is-single-sign-on-sso/jcr:content/Grid/category_atl/layout-category-atl/anchor_info.img.png/1668556769405.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundColor:'white' , color:'black'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color:'black'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  style: {
                    color: 'black',
                  },
                  placeholder: 'Email Address',
                }}
                InputLabelProps={{
                  style: {
                    color: 'black',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{
                  style: {
                    color: 'black',
                  },
                  placeholder: 'Password',
                }}
                InputLabelProps={{
                  style: {
                    color: 'black',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor:'orange' , color:'black' }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink to={'/seller/register'} variant="body2" style={{textDecoration:'none', color:'inherit'}}>
                    Don't have an account?Sign Up
                  </NavLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 , color:'orange' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer/>
    </ThemeProvider>
  );
}
