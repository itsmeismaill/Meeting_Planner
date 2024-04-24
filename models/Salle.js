// models/salles.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Equipement = require('./equipement');

const Salle = sequelize.define('salles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255)
  },
  nbr_places: {
    type: DataTypes.INTEGER
  },
  equipement_fk: {
    type: DataTypes.INTEGER,
    references: {
      model: Equipement,
      key: 'id'
    }
  },
  nbr_places_provisoires: {
    type: DataTypes.INTEGER
},
}, {
  timestamps: false // Disable timestamps
});

module.exports = Salle;
