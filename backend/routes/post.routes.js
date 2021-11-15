const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const auth = require('../middleware/auth');


router.get("/accueil",postCtrl.getAll);

router.post("/inscription", postCtrl.createOne);

module.exports = router;