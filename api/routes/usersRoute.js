const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

const verifUserIdentity = require('../middleware/verifUser');

// ? Get one by pseudo
router.get('/pseudo/:pseudo', userController.getUser);


// ? Login / Register
router.post('/inscription', userController.register);
router.post('/connexion', userController.login);


// ? Update by id
router.put('/update/profil/:id', verifUserIdentity, userController.updateUserWithId);
router.put('/update/password/:id', verifUserIdentity, userController.updatePasswordWithId);


// ? Delete
router.delete('/:id', verifUserIdentity, userController.deleteUserWithId);

// ? Post Comment
router.post('/createCommentaire', verifUserIdentity, userController.postComment);

module.exports = router;
