import React, { useState,useContext  } from 'react';
import { Box, Typography, TextField, Button, Modal } from '@mui/material';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiContext } from '../context/ApiContext'; // Import ApiContext
// import { useAuth } from './AuthContext';
import axios from 'axios'
const CreateNoteModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isFormValid = title.trim() !== '' && content.trim() !== '';
  const { post,fetchNotes } = useContext(ApiContext); // Use ApiContext

  const createNote = async () => {
    if (!isFormValid) {
        toast.error('Please fill in both the title and content fields.');
        return;
      }
    try {
      await post('/api/notes', { title, content }); // Use the post function from ApiContext
      setTitle('');
      setContent('');
      handleClose();
    //   fetchNotes();
      fetchNotes(); // Refresh the notes list
      toast.success('Note created successfully');
    } catch (error) {
      console.error('Failed to create note', error);
    }
  };
//   const createNote = async () => {
//     try {
//       await axios.post(
//         '/api/notes',
//         { title, content },
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );
//       setTitle('');
//       setContent('');
   
//       handleClose();
//     } catch (error) {
//       console.error('Failed to create note', error);
//     }
//   };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create a New Note
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }} require
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: 2 }} require
        />
        <Button sx={{backgroundColor:'#1F75FE',color:'white', '&:disabled': {
      backgroundColor: '#1F75FE', // Gray background when disabled
      color: 'white'  },
    borderRadius:3,}} onClick={createNote}  disabled={!isFormValid} >
          Create Note
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateNoteModal;