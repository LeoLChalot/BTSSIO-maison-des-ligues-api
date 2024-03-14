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

router.get('/articles', async (req, res) => {
   try {
      const { nom, id_categorie, id_article } = req.query;
      if (nom) {
         boutiqueController.getArticleByName(req, res);
      } else if (id_categorie) {
         boutiqueController.getArticlesByIdCategory(req, res);
      } else if (id_article) {
         boutiqueController.getArticleById(req, res);
      } else {
         boutiqueController.getAllArticles(req, res);
      }
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } 
});

module.exports = router;
