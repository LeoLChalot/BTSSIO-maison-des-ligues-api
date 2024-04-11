const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser');

const userController = require('../controller/userController');

router.get('/pseudo/:pseudo', userController.getUser);
router.put('/update/profil/:id', userController.updateUserWithId);
router.put('/update/password/:id', userController.updatePasswordWithId);
router.post('/inscription', userController.register);
router.post('/connexion', cookieParser(), userController.login);
router.delete('/delete/:pseudo', userController.deleteUserWithPseudo);

module.exports = router;
