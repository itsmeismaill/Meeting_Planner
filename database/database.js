require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env

const { Sequelize } = require('sequelize');

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false
      });
      Database.instance = this;
    }

    return Database.instance;
  }
}

const database = new Database();
module.exports = database.sequelize;
