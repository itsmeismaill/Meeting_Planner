const request = require('supertest');
const app = require('../../app'); // Assurez-vous d'importer correctement votre application


describe('findAvailableSalles Controller', () => {
  it('should return available salles for valid request', async () => {
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

    // Envoi de la requête au contrôleur
    const response = await request(app)
      .post('/api/available-salles') // Assurez-vous de définir la bonne route
      .send(requestBody);

    // Vérifiez que la demande a réussi
    expect(response.status).toBe(200);
    // Vérifiez que la réponse est en format JSON
    expect(response.body).toBeInstanceOf(Object);
    // Ajoutez d'autres assertions pour vérifier les détails des salles disponibles si nécessaire
  });

  // Ajoutez d'autres tests pour gérer d'autres cas de figure si nécessaire
});
