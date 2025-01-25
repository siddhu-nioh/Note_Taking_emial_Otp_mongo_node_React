import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../context/ApiContext'; // Import ApiContext
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import { useAuth } from './AuthContext';
// import { useNavigate } from 'react-router-dom';

const Header = () => {
  
    const { removeAuthToken } = useContext(ApiContext); // Use ApiContext
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Signed out successfully');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff',boxShadow: 1,  }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' ,alignItems:'center'}}>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'black',alignItems:'center',display:'flex'}}> 
          
    <img height={45} width={45} src="https://logo-icons.com/cdn/shop/files/2563-logo-1713636811.632color-00a3e4.svg?v=1713642971&width=823" alt="" />
          {/* <DashboardIcon sx={{ marginRight: 1 ,color:'#1F75FE' }} /> */}
          Dashboard
        </Typography>
        <Button variant="h6" onClick={handleSignOut} sx={{ color: '#1F75FE',  textDecoration: 'underline', }}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;