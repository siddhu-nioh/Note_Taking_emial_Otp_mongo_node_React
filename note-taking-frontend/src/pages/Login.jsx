import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Card, CardMedia,Divider,Checkbox, FormControlLabel, } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../context/ApiContext'; 

import GoogleIcon from '@mui/icons-material/Google';
import myimage from './bck.jpeg';
const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(false);
  
  
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const { apiBaseURL, } = useContext(ApiContext);

  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

  // Automatically send OTP when email is entered and valid
  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    
    if (validateEmail(newEmail) && newEmail.endsWith('.com')) {
      setIsLoading(true); // Set loading state
      try {
        await axios.post(`${apiBaseURL}/api/auth/login`, { email: newEmail }); 
        setIsOtpSent(true);
        toast.success('OTP sent to your email. Please enter the OTP.');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to send OTP ,PLEASE CHECK THE EMAIL ONCE');
      } finally {
        setIsLoading(false); 
      }
    }
  };

  // Verify OTP and complete login
  const handleLogin = async () => {
    setIsLoading(true); 
    try {
      const response = await axios.post(`${apiBaseURL}/api/auth/verify-otp`, { email, otp }); 
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      navigate('/notes');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className='signup-main' style={{display:'flex',flexDirection:'column',}}>
      
      <div className='signup' style={{display:"flex" ,alignItems:'center',gap:2,padding:"0vw 1vw",height:"2vw"}}>
      <img height={35} width={35} src="https://logo-icons.com/cdn/shop/files/2563-logo-1713636811.632color-00a3e4.svg?v=1713642971&width=823" alt="" />
      <p>HD</p>
      </div>
     <Box sx={{ padding: 10, display: 'flex', justifyContent: 'center',gap: 3 }}>
     <Box sx={{ height: "70vh", width: "60vw" ,borderRadius: 2, boxShadow: 0,padding: 3,display:{xs:"none",md:"block"},textAlign:{xs:"center",md:"start"}}}>
      {/* pic comes */}
      <Card sx={{ height: "70vh", width: "60vw" ,borderRadius: 5,border:"none", boxShadow:0}}>
        <CardMedia
            component="img"
            sx={{ height: "70vh", width: "50vw" ,borderRadius: 5, boxShadow:10}}
            // height="500vw"
            // width="500"
            image={myimage}
            alt="description"
        />
    </Card>
      </Box>

        <Box sx={{ padding:"0vw 2vw" ,}}>
      <Typography variant="h4" gutterBottom sx={{textAlign:{xs:"center",md:"start"},fontWeight:'600'}}>Sign In</Typography>

      <Typography sx={{textAlign:{xs:"center",md:"start"},color:"grey",opacity:"0.7", marginBottom:"2vw",fontSize:{xs:"3vw",md:"1vw"}}}>Please Login to continue to your account
      </Typography>

      <TextField
        label="Email"
        value={email}
        onChange={handleEmailChange}
        fullWidth
        sx={{ marginBottom: 2,width: { xs: '100%', md: '21vw' },'& .MuiOutlinedInput-notchedOutline': {
          borderRadius: 3, boxShadow: 0} }}
      />
       
        <TextField
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          fullWidth
          sx={{ width:{xs:"100%",md:"21vw"}, marginBottom: 2 ,'& .MuiOutlinedInput-notchedOutline': {
            borderRadius: 3, boxShadow: 0}}}
          disabled={!isOtpSent}
        />
        <Typography sx={{color:"#1877F2",opacity:"0.9", marginBottom:"0.5vw",fontSize:{xs:"3vw",md:"1vw"}}}>Forgot your password?
        </Typography>
        <FormControlLabel 
            control={<Checkbox checked={keepMeLoggedIn} onChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)} />}
            label="Keep me logged in"
          />

      
      <Button
        
        onClick={handleLogin}
        sx={{ width:{ xs:'100%',md:'21vw'},color:"white", backgroundColor: '#1877F2',borderRadius:3, marginBottom: 2,height:{xs:"10vw",md:"3vw"},
        '&:disabled': {
          backgroundColor: '#1877F2',color: 'white'  }}
        }
        disabled={!isOtpSent || isLoading}
      >
        {isLoading ? 'Logging In...' : 'Login'}
      </Button>
      <div 
            
          className='divider'
        >
            <Divider  className='divider-main' />
            <Typography 
                // variant="body1" 
                sx={{ background: "white", color: 'gray', position: 'absolute', zIndex: 10 ,left:{xs:"30vw",md:"10vw"}}}
            >
                or
            </Typography>
            {/* <Divider style={{ width: "20vw", margin: '0 10px' }} /> */}

            
        </div>
        <div 
        className='google'
           
            
        >
            
            <Typography variant="body1" color="textSecondary">
                sign in with Google
            </Typography>
            <GoogleIcon sx={{ color: '#DB4437', marginLeft: '8px' }} /> 
        </div>
        <Typography variant="body1" color="textSecondary" style={{marginTop:"1vw",marginLeft:"3vw"}} >
                Need an account ? <a href="/" style={{color:'#1877F2'}}>Create one</a>
            </Typography>
    </Box>
    
    </Box>
    
      <ToastContainer />
    </div>
  );
};

export default Login;