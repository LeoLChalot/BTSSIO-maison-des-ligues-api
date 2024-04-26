const express = require('express');
const router = express.Router();
const boutiqueController = require('../controller/boutiqueController');
const cookieParser = require('cookie-parser');

router.use(
   cookieParser(null, {
      sameSite: 'None',
      secure: true,
   })
);

// ? Get All
router.get('/categories/all', boutiqueController.getAllCategories)
router.get('/articles/all', boutiqueController.getAllArticles)



// ? Get One by id
router.get('/categorie/id/:id', boutiqueController.getCategoryById)
router.get('/article/id/:id', boutiqueController.getArticleById)


// ? Get One by name
router.get('/categorie/nom/:nom', boutiqueController.getCategoryByName)
router.get('/article/nom/:nom', boutiqueController.getArticleByName)


// ? Get articles by category
router.get('/articles/categorie/id/:id', boutiqueController.getArticlesByIdCategory)



module.exports = router;
