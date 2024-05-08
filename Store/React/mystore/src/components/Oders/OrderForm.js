import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const OrderForm = ({ fetchOrders }) => {
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/order', { userId, productId, quantity, orderDate });
      fetchOrders();
      setUserId('');
      setProductId('');
      setQuantity('');
      setOrderDate('');
      setShowAlert(true);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="User ID"
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product ID"
              type="number"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Order Date"
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              variant="filled"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Create Order
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Order created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrderForm;
