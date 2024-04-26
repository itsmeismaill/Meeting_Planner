## Description 
L'objectif du projet est de créer un utilitaire de gestion des salles simplifié pour aider notre client à mieux gérer l'utilisation de ses espaces, en particulier pendant la période de perturbation causée par la pandémie de COVID-19.

## Installation 
### Développement
Pour installer les dépendances du projet, exécutez la commande suivante dans le répertoire racine :
```bash
 npm install
```

## Variables d'environnement :
Lorsque vous travaillez avec des informations sensibles telles que les identifiants de base de données, il est important de les garder sécurisées. Une façon de le faire est d'utiliser un fichier `.env` pour stocker les variables d'environnement.

### Étapes pour Configurer un Fichier .env :

1. **Créer le Fichier `.env`** : Commencez par créer un fichier nommé `.env` à la racine de votre répertoire de projet.

2. **Définir les Variables d'Environnement** : Dans le fichier `.env`, définissez les variables d'environnement nécessaires pour la configuration de votre base de données. Par exemple :
```bash
DB_USER=root
DB_PASSWORD=
DB_NAME=meeting_planner
DB_HOST=localhost
DB_DIALECT=mysql
```
## Exécuter l'application
Pour exécuter l'application, vous pouvez utiliser la commande suivante dans votre terminal, à condition d'être dans le répertoire racine de votre projet :
```bash
node app.js
```
## Documentation des endpoints de l'API

### `/api/`

- **GET /** : 
  - **Description** : Cet endpoint permet de vérifier si l'API fonctionne correctement.
  - **Réponse** :
    - **Corps de la Réponse** :
      ```json
      {
          "message": "Bienvenue sur l'API de l'application Meeting Planner. !"
      }
      ```

### `/api/equipements`

- **GET /** : 
  - **Description** : endpoint pour récupérer la liste des équipements disponibles.
  - **Réponse** :
    - **Corps de la Réponse** : Liste des équipements disponibles au format JSON.
      ```json
      [
         
          {
              "id": 1,
              "equipement": "Ecran"
          },
          {
              "id": 2,
              "equipement": "Pieuvre"
          }
      ]
      ```

### `/api/salles`

- **GET /** : 
  - **Description** : endpoint pour récupérer la liste des salles disponibles.
  - **Réponse** :
    - **Corps de la Réponse** : Liste des salles disponibles au format JSON.
      ```json
      [
          {
              "id": 1,
              "name": "E1001",
              "nbr_places": 23,
              "equipement_fk": 1,
              "nbr_places_provisoires": 16,
              "equipement": {
                  "id": 1,
                  "equipement": "Néant"
              }
          },
          {
              "id": 2,
              "name": "E1002",
              "nbr_places": 10,
              "equipement_fk": 2,
              "nbr_places_provisoires": 7,
              "equipement": {
                  "id": 2,
                  "equipement": "Ecran"
              }
          }
      ]
      ```
      ### `/api/reservations`

- **GET /** : 
  - **Description** : endpoint pour récupérer la liste des réservations.
  - **Réponse** :
    - **Corps de la Réponse** : Liste des réservations au format JSON.
      ```json
      [
          {
              "id": 53,
              "name": "Réunion 1",
              "date_debut": "2024-04-30",
              "salle_fk": 9,
              "crenau_fk": 2,
              "type_reunion_fk": 1,
              "nbr_personnes": 8,
              "salle": {
                  "id": 9,
                  "name": "E3001",
                  "nbr_places": 13,
                  "equipement_fk": 6,
                  "nbr_places_provisoires": 9
              },
              "creneau": {
                  "id": 2,
                  "type": "9h-10h",
                  "heure": 9
              },
              "types_reunion": {
                  "id": 1,
                  "type": "VC",
                  "equipement_fk": 6
              }
          }
      ]
      ```

      
      


  
