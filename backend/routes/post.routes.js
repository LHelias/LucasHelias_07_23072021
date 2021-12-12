const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const auth = require('../middleware/auth');


router.get("/accueil", auth, postCtrl.getAll);

router.delete('/post/supprimer', postCtrl.deletePost);

router.post("/post/nouveau", postCtrl.createNewPost);

router.put("/post/editer", postCtrl.editPost)

module.exports = router;