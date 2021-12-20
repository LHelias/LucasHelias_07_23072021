const dotenv = require('dotenv');
dotenv.config();
//configure l'utilisation d'un fichier .env pour les variables d'environnement

const bodyParser = require('body-parser');
const express = require('express');
const connection = require('./models/db');
const userRoutes = require('./routes/user.routes');
const postRoutes = require ('./routes/post.routes');
const commentRoutes = require ('./routes/comment.routes');
const app = express();

//permet de résoudre les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});


app.use('/images', express.static(__dirname + '/Images'));


//bodyParser permet de traiter les requêtes POST
app.use(bodyParser.json());

// simple route
// app.get("/", (req, res, next) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });

app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);


module.exports = app;