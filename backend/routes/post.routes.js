const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const auth = require('../middleware/auth');


router.get("/accueil", auth, postCtrl.getAll);

router.delete('/post/supprimer', auth, postCtrl.deletePost);

router.post("/post/nouveau", auth, postCtrl.createNewPost);

router.put("/post/editer", auth, postCtrl.editPost)

module.exports = router;