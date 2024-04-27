const request = require('supertest');
const app = require('../../app'); 
const Reservation = require('../../models/reservation');


describe('Reservation Controller', () => {
  // Test pour la récupération de toutes les réservations
  it('should get all reservations', async () => {
    const response = await request(app).get('/api/reservations');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return error message with status code 500 when database error occurs', async () => {
    // Injectez une méthode qui va échouer dans votre modèle ou simulez une erreur de base de données
    jest.spyOn(Reservation, 'findAll').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).get('/api/reservations');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Erreur lors de la récupération des réservations.' });
  });

  // Test pour la création de réservations
  it('should create reservations', async () => {
    // Préparez des données de réservation pour le test
    const reservationData = {
        IsCorona: true,
        reservations: [
          {
            name: 'Réunion 1',
            date_debut: '2024-04-30',
            creneau_str: '9h-10h',
            type_reunion_str: 'VC',
            nbr_personnes: 8,
          }
        ]
      };

    // Envoyez une demande pour créer des réservations avec les données de test
    const response = await request(app)
      .post('/api/reserver')
      .send(reservationData);

    // Vérifiez que la demande a réussi
    expect(response.status).toBe(200);
    // Assurez-vous que la réponse contient les salles disponibles et les réservations non disponibles
    expect(response.body).toHaveProperty('availableSalles');
    expect(response.body).toHaveProperty('unavailableReservations');
  });
});
