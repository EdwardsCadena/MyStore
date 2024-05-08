import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button } from '@mui/material'; // Importar Grid, TextField y Button desde Material-UI
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const ProductForm = ({ fetchProducts }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/Products', { name, price });
      fetchProducts();
      setName('');
      setPrice('');
      setShowAlert(true); 
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <h1>Register Product</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="filled-name-input"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="filled"
              fullWidth 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-price-input"
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Register
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
          Product registered successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductForm;
