// controllers/reservationController.js

const { Op } = require('sequelize');
const Reservation = require('../models/reservation');
const Salle = require('../models/Salle');
const Creneau = require('../models/creneau');
const TypeReunion = require('../models/type_reunion');

exports.findAvailableSalles = async (req, res) => {
  const { date_debut, creneau_str, type_reunion_str, nbr_personnes } = req.body;

  try {
    // Récupérer les informations du créneau
    const creneau = await Creneau.findOne({ where: { type: creneau_str } });
    if (!creneau) {
      return res.status(400).json({ message: 'Le créneau spécifié n\'existe pas.' });
    }

    // Récupérer les informations du type de réunion
    const typeReunion = await TypeReunion.findOne({ where: { type: type_reunion_str } });
    if (!typeReunion) {
      return res.status(400).json({ message: 'Le type de réunion spécifié n\'existe pas.' });
    }
    
    reunion_equipment = typeReunion.equipement_fk;
    

    // Récupérer les salles disponibles qui répondent aux critères spécifiés
    const sallesDisponibles = await Salle.findAll({
      where: {
        equipement_fk: reunion_equipment,
        nbr_places_provisoires: { [Op.gte]: nbr_personnes }
      }
    });

    // Récupérer les id des salles disponibles
    const salleIds = sallesDisponibles.map(salle => salle.id);

    // Vérifier si le créneau et la date de début ne sont pas déjà réservés pour les salles disponibles
    const reservationsExistantes = await Reservation.findAll({
      where: {
        salle_fk: { [Op.in]: salleIds },
        date_debut,
        crenau_fk: creneau.id
      }
    });

    // Retirer les id des salles déjà réservées
    const sallesDisponiblesFiltered = sallesDisponibles.filter(salle =>
      !reservationsExistantes.some(reservation => reservation.salle_fk === salle.id)
    );

    res.json(sallesDisponiblesFiltered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la recherche des salles disponibles.' });
  }
};
