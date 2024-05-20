import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Avatar, Paper } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const [updatedName, setUpdatedName] = useState('');
  const [updatedSurname, setUpdatedSurname] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const userInfo = useSelector((state) => state.user.userInfo);
  const { _id: userId } = userInfo;
  
  useEffect(() => {
    if (userInfo) {
      setUpdatedName(userInfo.name);
      setUpdatedSurname(userInfo.surname);
      setUpdatedEmail(userInfo.email);
      setUpdatedPassword('');
    }
  }, [userInfo]);

  const updateUser = async () => {
    try {
      const updatedUserData = {
        name: updatedName,
        surname: updatedSurname,
        email: updatedEmail,
        password: updatedPassword,
      };

      console.log('Updated User Data:', updatedUserData);

      const response = await axios.put(`http://localhost:3001/user/update-user/${userId}`, updatedUserData);
      console.log('Update User Response:', response.data);
     
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const name = useSelector((state) => state.user.userInfo.name);
	const color = useSelector((state) => state.user.userInfo.color);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Set height to full viewport height
      }}
    >
      <Paper sx={{ maxWidth: 400, padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
          <Avatar sx={{ width: 70, height: 70, bgcolor: color, fontSize: '2rem', fontWeight: '800' }}>
            {name[0]}
          </Avatar>
        </Box>
        <Typography variant="h6" gutterBottom>Edit Profile</Typography>

        <TextField
          label="Name"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Surname"
          value={updatedSurname}
          onChange={(e) => setUpdatedSurname(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={updatedPassword}
          onChange={(e) => setUpdatedPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={updateUser} color="primary" variant="contained" sx={{ marginTop: 2 }}>Update</Button>
      </Paper>
    </Box>
  );
};

export default EditProfile;
