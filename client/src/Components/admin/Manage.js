import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const info = useSelector((state) => state.user.userInfo);

  console.log('this is user form list', info);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/all-users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/user/delete-user/${userId}`);
      fetchUsers();
      setShowDeleteConfirmation(false);
      setSuccessMessage('User has been deleted successfully');
      setShowSuccessSnackbar(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openDeleteConfirmation = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setSelectedUser(null);
    setShowDeleteConfirmation(false);
  };

  const openUpdateDialog = (user) => {
    setSelectedUser(user);
    formik.setValues({
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: '',
    });
    setShowUpdateDialog(true);
  };

  const closeUpdateDialog = () => {
    setShowUpdateDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'surname', headerName: 'Surname', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 350,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => openDeleteConfirmation(params.row)}
          >
            Delete
          </Button>
          <Box ml={1}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => openUpdateDialog(params.row)}
            >
              Update
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

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
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setStatus }) => {
      try {
        await axios.put(`http://localhost:3001/user/update-admin/${selectedUser.id}`, values);
        fetchUsers();
        setShowUpdateDialog(false);
        setSuccessMessage('User has been updated successfully');
        setShowSuccessSnackbar(true);
        
      } catch (error) {
        console.error('Error updating user:', error);
        setStatus({ type: 'error', message: 'Failed to update user' });
      }
    },
  });

  return (
    <Container maxWidth="lg">
      <Box mt={5} mb={4} textAlign="center">
        <Typography variant="h4">Manage Users</Typography>
      </Box>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirmation} onClose={closeDeleteConfirmation}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogActions>
          <Button onClick={() => deleteUser(selectedUser.id)} variant="contained" color="error">
            Yes
          </Button>
          <Button onClick={closeDeleteConfirmation} variant="outlined">
            No
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={showUpdateDialog} onClose={closeUpdateDialog}>
        <DialogTitle>Update User Information</DialogTitle>
        <DialogContent>
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
            {formik.status && (
              <Box mt={2} textAlign="center">
                <Typography style={{ backgroundColor: formik.status.type === 'success' ? 'green' : 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>
                  {formik.status.message}
                </Typography>
              </Box>
            )}
            <DialogActions>
              <Button onClick={closeUpdateDialog}>Cancel</Button>
              <Button type="submit" color="primary">Update</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSuccessSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Center the Snackbar
      >
        <Alert onClose={() => setShowSuccessSnackbar(false)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageUsers;
