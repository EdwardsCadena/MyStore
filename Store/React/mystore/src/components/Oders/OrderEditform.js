import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const OrderEditForm = ({ order, fetchOrders }) => {
  const [editedOrder, setEditedOrder] = useState(order);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder({ ...editedOrder, [name]: value });
  };

  const updateOrder = async () => {
    try {
      await axios.patch(`http://localhost:9000/api/order/${editedOrder.OrderID}`, editedOrder);
      fetchOrders();
      handleClose();
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<EditIcon />}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Order
          </Typography>
          <TextField
            name="UserId"
            label="User ID"
            value={editedOrder.UserId}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            name="ProductID"
            label="Product ID"
            value={editedOrder.ProductID}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            name="Quantity"
            label="Quantity"
            value={editedOrder.Quantity}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            name="OrderDate"
            label="Order Date"
            type="date"
            value={editedOrder.OrderDate}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button variant="contained" color="primary" onClick={updateOrder} sx={{ mt: 2 }}>Save</Button>
        </Box>
      </Modal>
      {showAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={() => setShowAlert(false)}
          sx={{
            mt: 2,
            position: 'fixed',
            bottom: '20px',
            right: '20px',
          }}
        >
          Order updated successfully!
        </Alert>
      )}
    </div>
  );
};

export default OrderEditForm;
