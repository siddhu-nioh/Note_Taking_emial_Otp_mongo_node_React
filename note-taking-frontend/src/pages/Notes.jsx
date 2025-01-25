import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../context/ApiContext'; // Import ApiContext
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';
import ProfileBox from './ProfileBox';
import CreateNoteModal from './CreateNoteModal';
import axios from 'axios';
const Notes = () => {
  const [openModal, setOpenModal] = useState(false);
  
  const { get, isLoading, error,fetchNotes,user,notes,signOut,apiBaseURL } = useContext(ApiContext); 

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${apiBaseURL}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchNotes();
      toast.success('Note deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete note');
    }
  };

  return (
    <Box>
      <Header />
      <Box sx={{ padding: 3 }}>
        <ProfileBox />
        <Button
          
          onClick={() => setOpenModal(true)}
          sx={{
            width: { xs: '100%', sm: '20%' },
            height: { xs: '10vw', sm: '3vw' }, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            boxShadow:"rgba(17, 12, 46, 0.18) 0px 40px 50px 0px",            marginBottom: 4, borderRadius: 3 ,color:'white', backgroundColor: '#1877F2', 
            '&:hover': {
              backgroundColor: '#1F75FE', 
            },}}
        >
          Create Note
        </Button>
        <CreateNoteModal open={openModal} handleClose={() => setOpenModal(false)} />
        <Typography variant="h5" gutterBottom sx={{ color: 'grey' }}>
          Notes
        </Typography>
        <List>
          {notes.map((note) => (
            <Box
              key={note._id}
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: " rgba(10, 37, 64, 0.2) 0px -2px 6px 0px inset, rgba(17, 12, 46, 0.1) 0px 4px 50px 0px",
                marginBottom: 2,
                padding: 2,
              }}
            >
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => deleteNote(note._id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={note.title}
                  secondary={note.content}
                  sx={{ wordWrap: 'break-word' }}
                />
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Notes;