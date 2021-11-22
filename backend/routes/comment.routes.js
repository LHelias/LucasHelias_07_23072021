const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.controller');
const auth = require('../middleware/auth');


// router.post("/accueil", commentCtrl.getAllComments);

router.post("/accueil", commentCtrl.addOneComment);

router.put("/accueil", auth, commentCtrl.editComment);


module.exports = router;