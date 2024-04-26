const { Op } = require("sequelize");
const Reservation = require("../models/reservation");
const Salle = require("../models/Salle");
const Creneau = require("../models/creneau");
const TypeReunion = require("../models/type_reunion");
const Equipement = require("../models/equipement");

exports.getAllSalles = async (req, res) => {
  try {
    const salles = await Salle.findAll({
      include: Equipement, // Inclure la table Equipement dans la requête
    });
    res.json(salles);
    console.log(salles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des salles." });
  }
};
exports.findAvailableSalles = async (req, res) => {
  const  reservations  = req.body; // Assurez-vous d'envoyer un tableau de réservations dans le corps de la requête
  try {
    const availableSalles = [];

    for (const reservation of reservations) {
      const { date_debut, creneau_str, type_reunion_str, nbr_personnes } = reservation;

      // Récupérer les informations du créneau
      const creneau = await Creneau.findOne({ where: { type: creneau_str } });

      if (!creneau) {
        return res.status(400).json({ message: "Le créneau spécifié n'existe pas." });
      }

      // Récupérer les informations du type de réunion
      const typeReunion = await TypeReunion.findOne({
        where: { type: type_reunion_str },
      });
      if (!typeReunion) {
        return res.status(400).json({ message: "Le type de réunion spécifié n'existe pas." });
      }

      // Récupérer les salles disponibles qui répondent aux critères spécifiés
      const sallesDisponibles = await Salle.findAll({
        where: {
          equipement_fk: typeReunion.equipement_fk,
          nbr_places_provisoires: { [Op.gte]: nbr_personnes },
        },
      });

      // Récupérer les id des salles disponibles
      const salleIds = sallesDisponibles.map((salle) => salle.id);

      // Vérifier si le créneau et la date de début ne sont pas déjà réservés pour les salles disponibles
      const reservationsExistantes = await Reservation.findAll({
        where: {
          salle_fk: { [Op.in]: salleIds },
          date_debut,
          crenau_fk: creneau.id,
        },
      });

      // Filtrer les réservations existantes pour récupérer les ID des salles réservées
      const sallesReservees = reservationsExistantes.map(
        (reservation) => reservation.salle_fk
      );

      // Filtrer les salles disponibles pour exclure celles qui sont déjà réservées
      const sallesDisponiblesLibres = sallesDisponibles.filter(
        (salle) => !sallesReservees.includes(salle.id)
      );

      availableSalles.push({
        type_reunion_str,
        nbr_personnes,
        salles: sallesDisponiblesLibres.map((salle) => {
          return {
            id: salle.id,
            nom: salle.name,
          };
        })
      });
    }
    res.json(availableSalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la recherche des salles disponibles." });
  }
};
