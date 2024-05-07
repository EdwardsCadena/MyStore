const { DataTypes } = require('sequelize');
const sequelize = require('../db/db').sequelize;

const Order = sequelize.define('order', {
  orderid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderdate: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});

module.exports = Order;
