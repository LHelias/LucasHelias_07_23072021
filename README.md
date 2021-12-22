# Groupomania

## prérequis 
Angular CLI
NodeJS
MySQL
nodemon

## configuration Base de données.
Avant de lancer les installations de dépendances :
créer le fichier: `backend/config/db.config.js`

Dans db.config.js, y intégrer le code suivant : 

`module.exports = {
    HOST: "localhost",
    USER: "exemple",
    PASSWORD: "exempleMDP",
    DB: "groupomania",
    PORT: 3306
  };`

et y rentrer les informations de connexion USER et PASSWORD à votre base de données mySQL.

Lancer le script SQL DBGroupomania.sql se trouvant à la racine du projet.

Voici un schéma des relations entre les tables de la BDD :
<!-- [alt text](https://i.ibb.co/cX8FZJX/relations-db-groupomania.png) -->
<p align="center">
  <img src="https://i.ibb.co/cX8FZJX/relations-db-groupomania" width="350" title="relations BDD groupomania">
</p>

## npm
Dans le dossier racine, ouvrir le terminal et lancer :
npm install

## Angular
Lancer `ng serve` dans /frontend

## serveur
Dans /backend lancer `nodemon server`.
Si le serveur se connecte bien à la base de données, dans la console du terminal doit s'afficher "The solution is: 2"

## localhost/4200
Vous pouvez ouvrir http://localhost:4200 dans votre navigateur et accéder au site.

## admin
Un compte administrateur serà déjà crée lors de l'exécution du script DBGroupomania.sql . Pour vous connecter à ce compte administrateur, voici les identifiants :
Email: `admin@groupomania.com`
password: `admin`

---------------------------------------------------------------------------------------------------------------------------------------
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.1.
