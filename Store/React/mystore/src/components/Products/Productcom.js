import React from 'react';
import Grid from '@mui/material/Grid';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

const Productcom = ({ products, fetchProducts }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={3}>
        <ProductForm products={products} fetchProducts={fetchProducts} />
      </Grid>
      <Grid item xs={6}>
        <ProductTable products={products} fetchProducts={fetchProducts} />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Productcom;
