const Reservation = require("../models/reservation");
const Salle = require("../models/salle");
const Creneau = require("../models/creneau");
const TypeReunion = require("../models/type_reunion");
const { Op } = require("sequelize");

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [Salle, Creneau, TypeReunion],
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des réservations." });
  }
};

exports.Reserver = async (req, res) => {
  const reservations = req.body.reservations;
  const IsCorona = req.body.IsCorona;

  try {
    const availableSalles = [];
    const unavailableReservations = [];

    for (const reservation of reservations) {
      const { name, date_debut, creneau_str, type_reunion_str, nbr_personnes } =
        reservation;

      // Récupérer les informations du créneau
      const creneau = await Creneau.findOne({ where: { type: creneau_str } });

      if (!creneau) {
        return res
          .status(400)
          .json({ message: "Le créneau spécifié n'existe pas." });
      }

      // Récupérer les informations du type de réunion
      const typeReunion = await TypeReunion.findOne({
        where: { type: type_reunion_str },
      });
      if (!typeReunion) {
        return res
          .status(400)
          .json({ message: "Le type de réunion spécifié n'existe pas." });
      }

      let sallesDisponibles;

      // Récupérer les salles disponibles qui répondent aux critères spécifiés (en fonction de la pandémie)
      if (IsCorona) {
        if (typeReunion.type === "RS") {
          sallesDisponibles = await Salle.findAll({
            where: {
              equipement_fk: typeReunion.equipement_fk,
              nbr_places_provisoires: { [Op.gte]: 3 },
            },
          });
        } else {
          sallesDisponibles = await Salle.findAll({
            where: {
              equipement_fk: typeReunion.equipement_fk,
              nbr_places_provisoires: { [Op.gte]: nbr_personnes },
            },
          });
        }
      } else {
        if (typeReunion.type === "RS") {
          sallesDisponibles = await Salle.findAll({
            where: {
              equipement_fk: typeReunion.equipement_fk,
              nbr_places: { [Op.gte]: 3 },
            },
          });
        } else {
          sallesDisponibles = await Salle.findAll({
            where: {
              equipement_fk: typeReunion.equipement_fk,
              nbr_places: { [Op.gte]: nbr_personnes },
            },
          });
        }
      }

      // Vérifier si des salles sont disponibles initialement
      if (sallesDisponibles.length === 0) {
        unavailableReservations.push({ name });
        continue; // Passer à la réservation suivante
      }

      // Récupérer les id des salles disponibles
      const salleIds = sallesDisponibles.map((salle) => salle.id);

      // Vérifier si le créneau et la date de début ne sont pas déjà réservés pour les salles disponibles
      const reservationsExistantes = await Reservation.findAll({
        where: {
          salle_fk: { [Op.in]: salleIds },
          date_debut: date_debut + "T00:00:00.000Z",
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

      // Vérifier si des salles sont disponibles après avoir filtré celles déjà réservées
      if (sallesDisponiblesLibres.length === 0) {
        unavailableReservations.push({ name });
        continue; // Passer à la réservation suivante
      }

      // Sélectionner la première salle disponible libre
      const premiereSalleDisponible = sallesDisponiblesLibres[0];

      // Créer une nouvelle réservation
      const nouvelleReservation = await Reservation.create({
        name,
        date_debut,
        salle_fk: premiereSalleDisponible.id,
        crenau_fk: creneau.id,
        type_reunion_fk: typeReunion.id,
        nbr_personnes,
      });
      if (IsCorona) {
        // Vérifier si le créneau actuel est l'heure finale
        const isDernierCreneau = creneau_str === "19h-20h"; // true ou false

        // Si le créneau actuel n'est pas l'heure finale, créer une réservation de nettoyage
        if (!isDernierCreneau) {
          // Créer une deuxième réservation pour le nettoyage
          const creneauNettoyage = await Creneau.findOne({
            where: { id: creneau.id + 1 },
          });
          if (!creneauNettoyage) {
            // Si le créneau suivant n'existe pas, retourner une erreur
            return res
              .status(400)
              .json({ message: "Le créneau de nettoyage n'existe pas." });
          }

          const nettoyageReservation = await Reservation.create({
            name: "nettoyage",
            date_debut,
            salle_fk: premiereSalleDisponible.id,
            crenau_fk: creneauNettoyage.id,
            type_reunion_fk: typeReunion.id,
            nbr_personnes: 1, // Supposons que le nettoyage ne nécessite qu'une personne
          });
        }
      }

      // Ajouter la salle disponible à la liste des salles disponibles
      availableSalles.push({
        name,
        type_reunion_str,
        nbr_personnes,
        salle: {
          id: premiereSalleDisponible.id,
          nom: premiereSalleDisponible.name,
        },
        etat: "Réservée",
        reservation_id: nouvelleReservation.id,
      });
    }

    res.json({ availableSalles, unavailableReservations });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la recherche des salles disponibles." });
  }
};
