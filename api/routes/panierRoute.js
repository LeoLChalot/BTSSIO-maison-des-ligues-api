const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');

const cookieJwtAuth = require('../middleware/verifAdmin');

const authenticator = require('../middleware/jwt-authentication');
const panierController = require('../controller/panierController');

// router.use(authenticator.auth);

router.get('/cart/:pseudo', panierController.getCartContent);

router.post('/add/:id_panier', panierController.addToCart);

router.delete('/one/:id_panier', panierController.deleteToCart);

router.delete('/all/:id_panier', panierController.clearCart);

router.post('/validate/:id_panier', async (req, res) => panierController.validateCart)

router.post('/standby/:id_panier', panierController.articleStandBy);

router.get(
   '/articlesstandby', panierController.getArticleStandby
)

module.exports = router;
