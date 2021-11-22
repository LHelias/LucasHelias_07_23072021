const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const auth = require('../middleware/auth');


router.get("/accueil", auth, postCtrl.getAll);

// router.delete('/accueil', postCtrl.deleteOnePost);

// router.post("/inscription", postCtrl.createOne);

module.exports = router;