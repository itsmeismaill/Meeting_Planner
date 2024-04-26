## Description 
L'objectif du projet est de créer un utilitaire de gestion des salles simplifié pour aider notre client à mieux gérer l'utilisation de ses espaces, en particulier pendant la période de perturbation causée par la pandémie de COVID-19.
## Diagramme de classe
![DC](https://github.com/itsmeismaill/Meeting_Planner/assets/114484969/e1764905-5065-495f-8bca-bd76a3ee8a74)

## Architecture
![Architecture](https://github.com/itsmeismaill/Meeting_Planner/assets/114484969/0d76f424-73b8-4762-8993-2499c161593e)


## Installation 
### Développement
Pour installer les dépendances du projet, exécutez la commande suivante dans le répertoire racine :
```bash
 npm install
```
### Base de données
Pour commencer à utiliser la base de données, vous pouvez simplement créer une nouvelle base de données Mysql , et en exécutant le script DbShema.sql situé dans le dossier database , vous pouvez  créer les tables nécessaires et aussi  remplir les données initiales.

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
### `/api/available-salles`

- **POST /** : 
  - **Description** : endpoint pour récupèrer la liste des salles disponibles pour des réservations.
  - **Corps de la Requête** :
    - **IsCorona (booléen)** : Indique si la réservation est liée à la pandémie de COVID-19.
    - **reservations (tableau)** : Un tableau contenant les détails de la réservation, y compris le nom de la réunion, la date de début, l'heure de début, le type de réunion et le nombre de personnes.

Exemple d'input :

```json
{
  "IsCorona": true,
  "reservations": [
    {
      "name": "Reunion1",
      "date_debut": "2024-04-30",
      "creneau_str": "8h-9h",
      "type_reunion_str": "RS",
      "nbr_personnes": 3
    }
  ]
}
```
  - **Réponse** :
    - **Corps de la Réponse** : Liste des salles disponibles au format JSON.
  ```json
  [
    {
      "type_reunion_str": "RS",
      "nbr_personnes": 3,
      "salles": [
        {
          "id": 1,
          "nom": "E1001"
        },
        {
          "id": 7,
          "nom": "E2003"
        },
        {
          "id": 10,
          "nom": "E3002"
        }
      ]
    }
  ]
```
### `/api/reserver`

- **POST /** : 
  - **Description** : Endpoint pour réserver des salles pour des réunions.
  - **Corps de la Requête** :
    - **IsCorona (booléen)** : Indique si la réservation est liée à la pandémie de COVID-19.
    - **reservations (tableau)** : Un tableau contenant les détails de la réservation, y compris le nom de la réunion, la date de début, l'heure de début, le type de réunion et le nombre de personnes.
      Exemple :
      ```json
      {
        "IsCorona": false,
        "reservations": [
          {
            "name": "Réunion 1",
            "date_debut": "2024-04-30",
            "creneau_str": "9h-10h",
            "type_reunion_str": "VC",
            "nbr_personnes": 8
          },
          ...
        ]
      }
      ```
- **Réponse** :
    - **Corps de la Réponse** : Liste des salles disponibles et les réservations impossibles au format JSON.
      ```json
      {
        "availableSalles": [
          {
            "name": "Réunion 4",
            "type_reunion_str": "RS",
            "nbr_personnes": 2,
            "salle": {
              "id": 7,
              "nom": "E2003"
            },
            "etat": "Réservée",
            "reservation_id": 64
          },
          ...
        ],
        "unavailableReservations": [
          {
            "name": "Réunion 1",
            "raison": "il existe des salles pour ce type de réunion mais elles sont toutes réservées"
          },
          ...
        ]
      }
      ```




      
      


  
