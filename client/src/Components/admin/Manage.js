import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedSurname, setUpdatedSurname] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');

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
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:3001/user/update-admin/${selectedUser.id}`, {
        name: updatedName,
        surname: updatedSurname,
        email: updatedEmail,
        password: updatedPassword
      });
      fetchUsers();
      setShowUpdateDialog(false);
    } catch (error) {
      console.error('Error updating user:', error);
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
    setUpdatedName(user.name);
    setUpdatedSurname(user.surname);
    setUpdatedEmail(user.email);
    setUpdatedPassword('');
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
      width: 300,
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

  return (
    <Container maxWidth="lg">
      <Box mt={5} mb={4} textAlign="center">
        <Typography variant="h4">Manage Users</Typography>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog}>Cancel</Button>
          <Button onClick={updateUser} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageUsers;
