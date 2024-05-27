// models/index.js
const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',  // Change to 'postgres', 'sqlite', etc., as needed
});

module.exports = { sequelize };
