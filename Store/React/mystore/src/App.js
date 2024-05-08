import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Usercom from './components/Users/Usercom';
import ProductForm from './components/Products/ProductForm';
import OrderCom from './components/Oders/Ordercom';
import Navbar from './components/Navbar/Navbar';


const App = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); 

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/order');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
  }, []); 

  return (
    <Router>
      <div>
        <Navbar />
        <h1>Management System</h1>
        <Switch>
          <Route path="/users">
            <Usercom users={users} fetchUsers={fetchUsers}/>
          </Route>
          <Route path="/products">
            <ProductForm products={products} fetchProducts={fetchProducts}/>
          </Route>
          <Route path="/orders">
            <OrderCom orders={orders} fetchOrders={fetchOrders}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
