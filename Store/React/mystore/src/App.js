import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Usercom from './components/Users/Usercom';
import Navbar from './components/Navbar/Navbar';


const App = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Se ejecuta solo una vez al cargar el componente

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
            
          </Route>
          <Route path="/orders">
            
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
