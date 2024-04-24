// models/types_reunion.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Equipement = require('./equipement');

const TypeReunion = sequelize.define('types_reunions', { // Modifier le nom de la table ici
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING(255)
  },
  equipement_fk: {
    type: DataTypes.INTEGER,
    references: {
      model: Equipement,
      key: 'id'
    }
  },
}, {
  tableName: 'types_reunions', // Spécifie le nom de la table dans la base de données
  timestamps: false // Désactive les timestamps
});

module.exports = TypeReunion;
