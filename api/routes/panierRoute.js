const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const cookieJwtAuth = require('../middleware/verifAdmin');
const authenticator = require('../middleware/jwt-authentication');
const panierController = require('../controller/panierController');

// router.use(authenticator.auth);

router.get('/:pseudo', panierController.getCartContent);
router.post('/add/:id_panier', panierController.addToCart);
router.delete('/delete_one/:id_panier', panierController.deleteToCart);
router.delete('/delete_all/:id_panier', panierController.clearCart);
router.post('/validate/:pseudo', panierController.validateCart)
router.post('/standby/:id_panier', panierController.articleStandBy);
router.get('/articlesstandby', panierController.getArticleStandby);

module.exports = router;
