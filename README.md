## Description 
L'objectif du projet est de créer un utilitaire de gestion des salles simplifié pour aider notre client à mieux gérer l'utilisation de ses espaces, en particulier pendant la période de perturbation causée par la pandémie de COVID-19.

## Installation 
### Développement
Pour installer les dépendances du projet, exécutez la commande suivante dans le répertoire racine :
```bash
npm install
bash```
## Envirenment Variable :
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
bash```
