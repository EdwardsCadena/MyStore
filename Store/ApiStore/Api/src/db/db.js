const { Pool } = require('pg');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración del pool de conexiones de PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Puerto predeterminado de PostgreSQL
});

// Configuración de Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = { pool, sequelize };
