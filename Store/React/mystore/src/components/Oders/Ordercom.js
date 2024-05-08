import React from 'react';
import Grid from '@mui/material/Grid';
import OrderForm from './OrderForm';
import OrderTable from './OrderTable';

const OrderCom = ({ orders, fetchOrders }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={3}>
        <OrderForm orders={orders} fetchOrders={fetchOrders} />
      </Grid>
      <Grid item xs={6}>
        <OrderTable orders={orders} fetchOrders={fetchOrders} />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default OrderCom;
