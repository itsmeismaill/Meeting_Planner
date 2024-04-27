const request = require('supertest');
const app = require('../../app'); // Assurez-vous que le chemin d'accès à votre application est correct
// const Reservation = require('../../models/reservation');
// const Salle = require('../../models/salle');
// const Creneau = require('../../models/creneau');
// const TypeReunion = require('../../models/type_reunion');

describe('Reservation Controller', () => {
  // Test pour la récupération de toutes les réservations
  it('should get all reservations', async () => {
    const response = await request(app).get('/api/reservations');
    expect(response.status).toBe(200);
    // Assurez-vous que la réponse est un tableau (toutes les réservations)
    expect(Array.isArray(response.body)).toBe(true);
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
