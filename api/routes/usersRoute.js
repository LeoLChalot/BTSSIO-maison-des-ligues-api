const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser');

const userController = require('../controller/userController');

// ? Get one by pseudo
router.get('/pseudo/:pseudo', userController.getUser);


// ? Login / Register
router.post('/inscription', userController.register);
router.post('/connexion', cookieParser(), userController.login);


// ? Update by id
router.put('/update/profil/:id', userController.updateUserWithId);
router.put('/update/password/:id', userController.updatePasswordWithId);


// ? Delete
router.delete('/delete/:pseudo', userController.deleteUserWithPseudo);

module.exports = router;
