const ConnexionDAO = require('../models/ConnexionDAO');
const CategorieDAO = require('../models/CategorieDAO');
const ArticleDAO = require('../models/ArticleDAO');

/**
 * ## Retourne la liste des categories
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de résponse.
 * @return {Promise<void>} - Une promesse qui contient le résultat.
 */
exports.getAllCategories = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const categorieDAO = new CategorieDAO();
      const result = await categorieDAO.find_all(connexion);
      console.log(result);
      res.status(200).json({
         success: true,
         message:
            result[0].length > 1
               ? 'Liste des categories'
               : 'Infos catégorie',
         infos: result[0],
      });
      return;
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};

/**
 * ## Retourne la catégorie en fonction de son identifiant
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de résponse.
 * @return {Promise<void>} - Une promesse qui contient le résultat.
 */
exports.getCategoryById = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const findById = {
         id_categorie: req.query.id,
      };
      const categorieDAO = new CategorieDAO();
      const result = await categorieDAO.find(connexion, findById);
      if (result[0].length === 0) {
         res.status(404).json({
            success: false,
            message: 'Categorie non trouvé',
         });
         return;
      }
      res.status(200).json({
         success: true,
         message:
            result[0].length > 1
               ? 'Liste des categories'
               : 'Infos catégorie',
         infos: result[0],
      });
      return;
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};

/**
 * ## Retourne la catégorie en fonction de son nom
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de résponse.
 * @return {Promise<void>} - Une promesse qui contient le résultat.
 */
exports.getCategoryByName = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const findByNom = {
         nom: req.query.nom,
      };
      const categorieDAO = new CategorieDAO();
      const result = await categorieDAO.find(connexion, findByNom);
      console.log(result);
      if (result[0].length === 0) {
         res.status(404).json({
            success: false,
            message: 'Categorie non trouvé',
         });
         return;
      }
      res.status(200).json({
         success: true,
         message:
            result[0].length > 1
               ? 'Liste des categories'
               : 'Infos catégorie',
         infos: result[0],
      });
      return;
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};

/**
 * ## Retourne la liste des articles
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de résponse.
 * @return {Promise<void>} - Une promesse qui contient le résultat.
 */
exports.getAllArticles = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const articleDAO = new ArticleDAO();
      const result = await articleDAO.find_all(connexion);
      res.status(200).json({
         success: true,
         message: 'Liste des articles',
         infos: result[0],
      });
      return;
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};

/**
 * Retourne l'article en fonction de son identifiant
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {Promise<void>} - Une promesse qui contient le résultat.
 */
exports.getArticleById = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const articleDAO = new ArticleDAO();
      const findByIdArticle = {
         id_article: req.query.id_article,
      };
      const result = await articleDAO.find(
         connexion,
         findByIdArticle
      );
      if (result[0].length === 0) {
         res.status(404).json({
            success: false,
            message: 'Article non trouvé',
         });
         return;
      }
      res.status(200).json({
         success: true,
         message:
            result[0].length > 1
               ? 'Liste des articles'
               : 'Infos article',
         infos: result[0],
      });
      return;
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};

/**
 * Retourne l'article en fonction de son nom
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {Promise<void>} - Une promesse qui contient le résultat.
 */
exports.getArticleByName = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const articleDAO = new ArticleDAO();
      const findByNom = {
         nom: req.query.nom,
      };
      result = await articleDAO.find(connexion, findByNom);
      if (result[0].length === 0) {
         res.status(404).json({
            success: false,
            message: 'Article non trouvé',
         });
         return;
      }
      res.status(200).json({
         success: true,
         message:
            result[0].length > 1
               ? 'Liste des articles'
               : 'Infos article',
         infos: result[0],
      });
      return;
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};

/**
 * Retourne la liste des articles en fonction de la catégorie.
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @returns {Promise<void>} Une promesse qui contient la liste des articles.
 */
exports.getArticlesByIdCategory = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const articleDAO = new ArticleDAO();
      const findByIdCategorie = {
         categorie_id: req.query.id_categorie,
      };
      const result = await articleDAO.find(
         connexion,
         findByIdCategorie
      );
      if (result[0].length === 0) {
         console.log({ res: result[0].length });
         res.status(400).json({
            success: false,
            message: 'Article non trouvé',
         });
         return;
      }
      res.status(200).json({
         success: true,
         message:
            result[0].length > 1
               ? 'Liste des articles'
               : 'Infos article',
         infos: result[0],
      });
      return;
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};
