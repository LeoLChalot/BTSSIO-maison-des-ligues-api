const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const cookieJwtAuth = require('../middleware/verifAdmin');
const authenticator = require('../middleware/jwt-authentication');
const panierController = require('../controller/panierController');

// router.use(authenticator.auth);

// ? Get All
router.get('/:pseudo', panierController.getCartContent);
// router.get('/articlesstandby', panierController.getArticleStandby);


// ? Create
router.post('/add/:id_panier', panierController.addToCart);
router.post('/validate/:pseudo', panierController.validateCart)
// router.post('/standby/:id_panier', panierController.articleStandBy);


// ? Delete
router.delete('/delete_one/:id_panier', panierController.deleteToCart);
router.delete('/delete_all/:id_panier', panierController.clearCart);
router.delete('/delete/:id_panier', panierController.deleteCart);


module.exports = router;
