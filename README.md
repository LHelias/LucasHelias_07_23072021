# Groupomania

## configuration Base de données.
Avant de lancer les installations de dépendances :
`touch backend/config/db.config.js`

Dans db.config.js, y intégrer le code suivant : 

`module.exports = {
    HOST: "localhost",
    USER: "exemple",
    PASSWORD: "exempleMDP",
    DB: "groupomania",
    PORT: 3306
  };`

et y rentrer les informations de connexion USER et PASSWORD à votre base de données mySQL.

## npm
Dans le dossier racine, ouvrir le terminal et lancer :
npm install

## Angular

Si vous n'avez pas déjà installé AngularCLI, lancer dans le dossier racine : 
`npm install -g @angular/cli`

puis lancer `ng serve` dans /frontend

## serveur

Dans /backend lancer `nodemon server`.
Si le serveur se connecte bien à la base de données, dans la console du terminal doit s'afficher "The solution is: 2"

## localhost/4200

Vous pouvez ouvrir http://localhost:4200 dans votre navigateur et accéder au site.

## admin

Vous pouvez créer un compte administrateur sur l'adresse admin@groupomania.com qui aura tous les droits d'édition et de suppression des posts et des commentaires.

---------------------------------------------------------------------------------------------------------------------------------------
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
