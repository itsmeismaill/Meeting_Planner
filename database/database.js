// database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('meeting_planner', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
