import React from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Create = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      surname: Yup.string().required('Surname is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    }),
    onSubmit: async (values, { resetForm, setSubmitting, setStatus }) => {
      try {
        await axios.post('http://localhost:3001/user/add-user', values);
        resetForm();
        setStatus({ message: 'User has been created', type: 'success' });
        setTimeout(() => {
          setStatus({ message: '', type: '' });
        }, 1000);
      } catch (error) {
        setStatus({ message: 'Error adding user. Please try again.', type: 'error' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={2} textAlign="center">
        <Typography variant="h4">Add New User</Typography>
      </Box>
      <Paper elevation={3}>
        <Box p={3}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Surname"
              name="surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
            />
            <TextField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box display="flex" justifyContent="space-between" mt={2} ml={120}>
              <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>Add User</Button>
            </Box>
            {formik.status && formik.status.message && (
              <Box mt={2} textAlign="center">
                <Typography style={{ backgroundColor: formik.status.type === 'success' ? 'green' : 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>
                  {formik.status.message}
                </Typography>
              </Box>
            )}
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Create;
