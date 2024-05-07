const { DataTypes } = require('sequelize');
const sequelize = require('../db/db').sequelize;

const User = sequelize.define('users', {
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = User;
