const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.controller');

// router.post("/accueil", commentCtrl.getAllComments);

router.post("/accueil", commentCtrl.addOneComment);


module.exports = router;