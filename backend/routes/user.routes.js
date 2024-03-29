const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get("/connexion", auth, userCtrl.getAll);

router.post("/connexion", userCtrl.login);

router.post("/inscription", multer, userCtrl.createOne);

router.get("/profil/:email", auth, userCtrl.getUserProfile);

router.put("/profil/:email", auth, userCtrl.modifyUserProfile);

router.delete("/profil/suppression", auth, userCtrl.deleteUser);

module.exports = router;