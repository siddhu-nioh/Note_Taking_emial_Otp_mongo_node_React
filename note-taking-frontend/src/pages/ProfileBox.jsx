import React, { useContext, useEffect } from 'react';
import { ApiContext } from '../context/ApiContext';
import { Box, Typography, Avatar, CircularProgress } from '@mui/material';

const ProfileBox = () => {
  const { user, fetchProfile, isLoading, error } = useContext(ApiContext);

  
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: '#ffff',
        padding: 3,
        borderRadius: 2,
        boxShadow:" rgba(50, 50, 93, 0.2) 0px 10px 100px -20px, rgba(0, 0, 0, 0.1) 0px 30px 60px -30px, rgba(10, 37, 64, 0.2) 0px -2px 6px 0px inset",
        marginBottom: 4,
      }}
    >
     <Typography variant='h2'  sx={{
            fontSize: { xs: '9vw', sm: '4vw' },}} gutterbottom> welcome {user.name} !  </Typography>
      <Typography variant="h6" gutterBottom sx={{color:'gray'}}>
        Email : {user.email}
        
      </Typography>
     
    </Box>
  );
};

export default ProfileBox;