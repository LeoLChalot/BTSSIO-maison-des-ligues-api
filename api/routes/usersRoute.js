const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser');

const userController = require('../controller/userController');

router.get('/', userController.getAllUsers, async (req, res) => {
   res.status(200).json({ success: true });
});

router.post('/inscription', userController.register);
router.post('/connexion', cookieParser(), userController.login);
router.delete('/delete/:pseudo', userController.deleteUserWithPseudo);

module.exports = router;
