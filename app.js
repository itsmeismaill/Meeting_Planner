const express = require('express');
const app = express();
const routes = require('./routes/routes');
const sequelize = require('./database/database');

// Middleware pour gérer le corps des requêtes au format JSON
app.use(express.json());

// Utilisation des routes définies dans routes.js
app.use('/api', routes);

// Synchronisation avec la base de données
sequelize.sync().then(() => {
    console.log('Base de données synchronisée.');
}).catch(err => {
    console.error('Erreur lors de la synchronisation de la base de données :', err);
});

// Port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
