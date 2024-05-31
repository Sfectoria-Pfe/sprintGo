import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Avatar, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { _id: userId } = userInfo;

  const formik = useFormik({
    initialValues: {
      name: userInfo.name,
      surname: userInfo.surname,
      email: userInfo.email,
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      surname: Yup.string().required('Surname is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.put(`http://localhost:3001/user/update-user/${userId}`, values);
        console.log('Update User Response:', response.data);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#F0EEE9', // Background color
      }}
    >
      <Paper sx={{ maxWidth: 850, padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
          <Avatar sx={{ width: 70, height: 70, bgcolor: userInfo.color, fontSize: '2rem', fontWeight: '800' }}>
            {userInfo.name[0]}
          </Avatar>
        </Box>
        <Typography variant="h6" gutterBottom>Edit Profile</Typography>
        <Typography variant="body2" gutterBottom>Update your account's information and email address.</Typography>
        
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label="Surname"
            name="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
          />
          <TextField
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" color="primary" variant="contained" sx={{ marginTop: 2 }}>Update</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditProfile;
