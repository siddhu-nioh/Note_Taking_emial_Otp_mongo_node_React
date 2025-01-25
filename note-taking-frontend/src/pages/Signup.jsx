import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, CardMedia, Card, Divider ,} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../context/ApiContext'; 
// import GradientGoogleIcon from './GoogleIcon';
import GoogleIcon from '@mui/icons-material/Google'; 
 // Import the 
import myimage from './bck.jpeg';
import '../App.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  // Accessing api  context values
  const { apiBaseURL, isLoading, setIsLoading } = useContext(ApiContext);

  // Function to validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

 
  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const sendOTP = async (email) => {
      if (validateEmail(newEmail) && newEmail.endsWith('.com')) {
        setIsLoading(true); // Set loading state
        try {
          await axios.post(`${apiBaseURL}/api/auth/signup`, {
            name,
            email,
            dateOfBirth,
          });
          setIsOtpSent(true);
          toast.success('OTP sent to your email. Please enter the OTP.');
        } catch (error) {
          toast.error(error.response?.data?.message || 'Failed to send OTP,PLEASE CHECK THE EMAIL ONCE ');
        } finally {
          setIsLoading(false); 
        }
      }
    };
    sendOTP(newEmail);
  };

  
  const handleSignup = async () => {
    setIsLoading(true); 
    try {
      const response = await axios.post(`${apiBaseURL}/api/auth/verify-otp`, {
        email,
        otp,
      });
      localStorage.setItem('token', response.data.token);
      toast.success('Signup successful!');
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
      
    <Box sx={{ padding: 10, display: { xs: 'block', md: 'flex' }, justifyContent: 'center',gap: 3}}  >
    <Box sx={{ padding:{xs:"0vw",md:"0vw 6vw" },justifyContent:"center",alignItems:"center",textAlign:{xs:"center",md:"start"}}}>
      <Typography variant="h3" sx={{fontWeight:"500",justifyContent:"center",textAlign:{xs:"center",md:"start"},marginBottom:'1vw'}} >Signup</Typography>
      <Typography  sx={{color:'gray',opacity:'0.6', marginBottom:'3vw'}} >signup to enjoy the feature of hd</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2,width: { xs: '100%', md: '20vw' },'& .MuiOutlinedInput-notchedOutline': {
          borderRadius: 3, boxShadow: 0} }}
      />
      <TextField
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2,width: { xs: '100%', md: '20vw' },'& .MuiOutlinedInput-notchedOutline': {
          borderRadius: 3, boxShadow: 0} }}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Email"
        value={email}
        onChange={handleEmailChange}
        fullWidth
        sx={{ marginBottom: 2,width: { xs: '100%', md: '20vw' },'& .MuiOutlinedInput-notchedOutline': {
          borderRadius: 3, boxShadow: 0}} }
      />
      
     
        <TextField
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          fullWidth
          sx={{ width: { xs: '100%', md: '20vw' }, marginBottom: 2 ,'& .MuiOutlinedInput-notchedOutline': {
                borderRadius: 3, boxShadow: 0}}}
          disabled={!isOtpSent}
        />
    
      <Button
        
        onClick={handleSignup}
        sx={{ width: { xs: '100%', md: '20vw' },height:{xs:"10vw",md:"3vw"}, backgroundColor: '#1877F2',borderRadius: 3,color:"white", marginBottom: 2,'&:disabled': {
      backgroundColor: '#1877F2',
      color: 'white'  }}}
        disabled={!isOtpSent || isLoading}
      >
        {isLoading ? 'Signing Up...' : 'Signup'}
      </Button>
      <div 
            
          className='divider'
        >
            <Divider  className='divider-main' />
            <Typography 
                
                sx={{ background: "white", color: 'gray', position: 'absolute', zIndex: 10 ,left:{xs:"30vw",md:"10vw"}}}
            >
                or
            </Typography>
            

            
        </div>
        <div 
        className='google'
           
            
        >
            {/* <GoogleIcon sx={{ color: '#DB4437', marginRight: '8px' }} /> Google icon with color */}
            <Typography variant="body1" color="textSecondary">
                Continue with Google
            </Typography>
            <GoogleIcon sx={{ color: '#DB4437', marginLeft: '8px' }} /> 
        </div>
        <Typography variant="body1" color="textSecondary" style={{marginTop:"1vw",marginLeft:"2vw"}} >
                Already have an account ? <a href="/login" style={{color:'#1877F2'}}>sign in</a>
            </Typography>
     
    </Box>
    <Box sx={{ height: "70vh", width: "60vw" ,borderRadius: 2, boxShadow: 0,padding: 3,display: { xs: 'none', md: 'block' }}}>

      <Card sx={{ height: "70vh", width: "60vw" ,borderRadius: 5,border:"none", boxShadow:0}}>
        <CardMedia
            component="img"
            sx={{ height: "70vh", width: "50vw" ,borderRadius: 5, boxShadow:10}}
            
            image={myimage}
            alt="description"
        />
    </Card>
      </Box>
      <ToastContainer />
    </Box>
    </div>
  );
};

export default Signup;