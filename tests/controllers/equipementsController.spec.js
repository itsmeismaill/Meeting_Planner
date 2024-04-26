// Importation des dépendances nécessaires
const request = require('supertest');
const app = require('../../app'); // Le fichier principal de votre application
const Equipement = require('../../models/equipement');

describe('API Equipement', () => {
  it('should return all equipments in a json format with status code 200', async () => {
    const response = await request(app).get('/api/equipements');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Vérifie que la réponse est un tableau
    // Ajoutez d'autres vérifications ici en fonction de votre logique métier
  });

  it('should return error message with status code 500 when database error occurs', async () => {
    // Injectez une méthode qui va échouer dans votre modèle ou simulez une erreur de base de données
    jest.spyOn(Equipement, 'findAll').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).get('/api/equipements');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Erreur lors de la récupération des équipements.' });
  });
});
