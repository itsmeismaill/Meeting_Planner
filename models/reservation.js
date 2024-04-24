// models/reservations.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Salle = require('./Salle');
const Creneau = require('./creneau');
const TypeReunion = require('./type_reunion'); // Importez le modèle TypeReunion

const Reservation = sequelize.define('reservations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255)
  },
  date_debut: {
    type: DataTypes.DATE
  },
  salle_fk: {
    type: DataTypes.INTEGER,
    references: {
      model: Salle,
      key: 'id'
    }
  },
  crenau_fk: {
    type: DataTypes.INTEGER,
    references: {
      model: Creneau,
      key: 'id'
    }
  },
  type_reunion_fk: { // Ajoutez l'attribut type_reunion_fk
    type: DataTypes.INTEGER,
    references: {
      model: TypeReunion,
      key: 'id'
    }
  },
  nbr_personnes: {
    type: DataTypes.INTEGER
  },
}, {
  timestamps: false // Disable timestamps
});

module.exports = Reservation;
