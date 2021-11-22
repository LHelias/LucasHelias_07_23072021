const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.get("/connexion", auth, userCtrl.getAll);

router.post("/connexion", userCtrl.login);

router.post("/inscription", userCtrl.createOne);

router.get("/profil/:email", auth, userCtrl.getUserProfile);

// router.get("/accueil", userCtrl.getUserProfile);

router.put("/profil/:email", auth, userCtrl.modifyUserProfile);

module.exports = router;


// module.exports = app => {
//     const users = require("../controllers/user.controller.js");
  
//     // Create a new user
//     app.post("/inscription", users.create);

//     // Retrieve all users
//     app.get("/connexion", users.getAll);

// };