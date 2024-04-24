// models/equipement.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Equipement = sequelize.define('equipements', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  equipement: {
    type: DataTypes.STRING(255)
  },
}, {
  timestamps: false // Disable timestamps
});

module.exports = Equipement;
