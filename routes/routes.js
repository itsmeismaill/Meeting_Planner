const express = require("express");
const router = express.Router();
const equipementController = require("../controllers/equipementsController");
const reservationController = require("../controllers/reservationController");
const salleController = require("../controllers/salleController");

router.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'API de l'application Meeting Planner.",
  });
});

router.get("/equipements", equipementController.getAllEquipements);
router.get("/salles", salleController.getAllSalles);
router.post("/available-salles", salleController.findAvailableSalles);
router.post("/reserver", reservationController.Reserver);
router.get("/reservations", reservationController.getAllReservations);

module.exports = router;
