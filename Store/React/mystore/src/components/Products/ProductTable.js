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
import ProductEditForm from './ProductEditform';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Box } from '@mui/system';

const ProductTable = ({ products, fetchProducts }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [deletedProductName, setDeletedProductName] = useState('');

  const deleteProduct = async (productId, productName) => {
    try {
      await axios.delete(`http://localhost:9000/api/products/${productId}`);
      fetchProducts();
      setDeletedProductName(productName);
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting product:', error);
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
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.ProductID}>
                  <TableCell>{product.Name}</TableCell>
                  <TableCell>{product.Price}</TableCell>
                  <TableCell>
                  <ProductEditForm product={product} fetchUsers={fetchUsers} />
                    <Button variant="contained" color="error" onClick={() => deleteProduct(product.productid, product.name)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
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
        <MuiAlert onClose={handleCloseAlert} severity="success">
          Product "{deletedProductName}" deleted successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ProductTable;
