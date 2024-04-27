const request = require('supertest');
const app = require('../../app'); // Assurez-vous d'importer correctement votre application
const Salle = require('../../models/Salle');


describe(' Salles Controller', () => {

  it('should return a non-empty array of available salles with valid data and with status code 200', async () => {
    const response = await request(app).get('/api/salles');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length)==12;
    response.body.forEach((salle) => {
      expect(typeof salle).toBe('object');
      expect(salle).toHaveProperty('id');
      expect(salle).toHaveProperty('name');
      expect(salle).toHaveProperty('nbr_places_provisoires');
      expect(salle).toHaveProperty('nbr_places');
      expect(salle).toHaveProperty('equipement');
    });
  });


  it('should return error message with status code 500 when database error occurs', async () => {
    // Injectez une méthode qui va échouer dans votre modèle ou simulez une erreur de base de données
    jest.spyOn(Salle, 'findAll').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).get('/api/salles');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Erreur lors de la récupération des salles.' });
  });
    
    

    it('should return a non-empty array of available salles with valid data', async () => {
      // Données de test pour la requête
      const requestBody = {
        IsCorona: true,
        reservations: [
          {
            date_debut: "2024-04-30",
            creneau_str: "9h-10h",
            type_reunion_str: "VC",
            nbr_personnes: 8
          }
        ]
      };
      const response = await request(app)
          .post('/api/available-salles')
          .send(requestBody);
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true); // Vérifie que la réponse est un tableau
  
      response.body.forEach((reservation) => {
          expect(typeof reservation).toBe('object'); // Vérifie que chaque élément du tableau est un objet
          expect(reservation).toHaveProperty('type_reunion_str');
          expect(reservation).toHaveProperty('nbr_personnes');
          expect(reservation).toHaveProperty('salles');
          expect(Array.isArray(reservation.salles)).toBe(true); // Vérifie que la propriété salles est un tableau  
      });
});});