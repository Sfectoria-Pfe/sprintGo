import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const navigate = useNavigate();
	

  const addUser = async () => {
    try {
      await axios.post('http://localhost:3001/user/add-user', { name, surname, email, password });
      clearForm();
      setAlertMessage('User has been created');
      setAlertType('success');
      setTimeout(() => {
        setAlertMessage('');
        navigate(-1);
      }, 1000); 
    } catch (error) {
      setAlertMessage('Error adding user. Please try again.');
      setAlertType('error');
    }
  };

  const clearForm = () => {
    setName('');
    setSurname('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2} textAlign="center">
        <Typography variant="h4">Add New User</Typography>
      </Box>
      <form>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box mt={2} textAlign="center">
          <Button variant="contained" onClick={addUser}>Add User</Button>
        </Box>
        {alertMessage && (
          <Box mt={2} textAlign="center">
            <Typography style={{ backgroundColor: alertType === 'success' ? 'green' : 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>
              {alertMessage}
            </Typography>
          </Box>
        )}
      </form>
    </Container>
  );
};

export default Create;
