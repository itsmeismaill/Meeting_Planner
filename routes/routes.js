const express = require('express');
const router = express.Router();
const equipementController = require('../controllers/equipements');
const reservationController = require('../controllers/reservationController');

router.get('/equipements', equipementController.getAllEquipements);
router.post('/available-salles', reservationController.findAvailableSalles);
module.exports = router;
