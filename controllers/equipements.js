const Equipement = require('../models/equipement');

// Fonction pour récupérer tous les équipements
exports.getAllEquipements = async (req, res) => {
  try {
    const equipements = await Equipement.findAll();
    res.json(equipements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des équipements.' });
  }
};