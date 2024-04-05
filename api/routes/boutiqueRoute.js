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

router.get('/categories', async (req, res) => {
   try {
      const { nom, id } = req.query;
      if (nom) {
         boutiqueController.getCategoryByName(req, res);
      } else if (id) {
        boutiqueController.getCategoryById(req, res);
      } else {
         boutiqueController.getAllCategories(req, res);
      }
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   }
});


router.get('/categories/all', boutiqueController.getAllCategories)
router.get('/categorie/id/:id', boutiqueController.getCategoryById)
router.get('/categorie/nom/:nom', boutiqueController.getCategoryByName)

router.get('/articles/all', boutiqueController.getAllArticles)
router.get('/articles/categorie/id/:id', boutiqueController.getArticlesByIdCategory)

router.get('/article/id/:id', boutiqueController.getArticleById)
router.get('/article/nom/:nom', boutiqueController.getArticleByName)


module.exports = router;
