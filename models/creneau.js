// models/creneau.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Creneau = sequelize.define('creneau', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING(255)
  },
  heure: {
    type: DataTypes.INTEGER
  },
}, {
  tableName: 'creneaux', // Spécifie le nom de la table dans la base de données
  timestamps: false // Désactive les timestamps
});

module.exports = Creneau;
