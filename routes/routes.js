const express = require('express');
const router = express.Router();
const equipementController = require('../controllers/equipements');
const reservationController = require('../controllers/reservationController');
const salleController = require('../controllers/salleController');

router.get('/equipements', equipementController.getAllEquipements);
router.get('/salles', salleController.getAllSalles);

//post 1 : il faut envoyer un tableau de réservations (date_debut, creneau_str, type_reunion_str, nbr_personnes)
// dans le corps de la requête
router.post('/available-salles', salleController.findAvailableSalles);

module.exports = router;
