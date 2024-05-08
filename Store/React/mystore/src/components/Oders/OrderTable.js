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
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Box } from '@mui/system';

const OrderTable = ({ orders, fetchOrders }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [deletedOrderId, setDeletedOrderId] = useState('');

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:9000/api/order/${orderId}`);
      fetchOrders();
      setDeletedOrderId(orderId);
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Product ID</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.OrderID}> 
                  <TableCell>{order.UserId}</TableCell>
                  <TableCell>{order.ProductID}</TableCell>
                  <TableCell>{order.Quantity}</TableCell>
                  <TableCell>{order.OrderDate}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => deleteOrder(order.OrderID)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
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
          Order "{deletedOrderId}" deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderTable;
