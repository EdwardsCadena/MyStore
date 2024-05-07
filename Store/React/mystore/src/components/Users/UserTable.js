import React, { useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import UserEditForm from './UserEditForm';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Box } from '@mui/system';

const UserTable = ({ users, fetchUsers }) => {
  const [editedUser, setEditedUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [deletedUserName, setDeletedUserName] = useState('');

  const deleteUser = async (userId, userName) => {
    try {
      await axios.delete(`http://localhost:9000/api/user/${userId}`);
      fetchUsers();
      setDeletedUserName(userName);
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClick = (user) => {
    setEditedUser(user);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.patch(`http://localhost:9000/api/user/${editedUser.userid}`, editedUser);
      fetchUsers();
      setShowAlert(true);
      setEditedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userid}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <UserEditForm user={user} fetchUsers={fetchUsers} />
                    <Button variant="contained" color="error" onClick={() => deleteUser(user.userid, user.name)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Paper>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          User "{deletedUserName}" deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserTable;
