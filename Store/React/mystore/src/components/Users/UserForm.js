import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button } from '@mui/material'; // Importar Grid, TextField y Button desde Material-UI
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const UserForm = ({ fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/user', { name, email });
      fetchUsers(); // Recargar la lista de usuarios después de agregar uno nuevo
      setName('');
      setEmail('');
      setShowAlert(true); // Mostrar la alerta
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
    <h1>Register</h1>
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
              fullWidth // Para que ocupe todo el ancho disponible
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-email-input"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              fullWidth // Para que ocupe todo el ancho disponible
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
            User registered successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserForm;



