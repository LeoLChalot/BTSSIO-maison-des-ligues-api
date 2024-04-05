const ConnexionDAO = require('../models/ConnexionDAO');
const UtilisateurDAO = require('../models/UtilisateurDAO');
const CategorieDAO = require('../models/CategorieDAO');
const ArticleDAO = require('../models/ArticleDAO');

const { v4: uuidv4 } = require('uuid');

const UTILISATEUR_DAO = new UtilisateurDAO();
const CATEGORIE_DAO = new CategorieDAO();
const ARTICLE_DAO = new ArticleDAO();


/**
 * Retourne un utilisateur par son login.
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {JSON} L'objet de réponse et l'utilisateur.
 */
exports.getUserByLogin = async (req, res) => {
   try {
      const connexion = await ConnexionDAO.connect();
      const utilisateurDAO = new UtilisateurDAO();

      const login = req.body.login;

      let utilisateur = await utilisateurDAO.find(
         connexion,
         'pseudo',
         login
      );
      if (utilisateur[0].length === 0) {
         utilisateur = await utilisateurDAO.find(
            connexion,
            'email',
            login
         );
      }

      if (utilisateur[0].length === 0) {
         return res.status(404).json({
            message: 'Utilisateur non trouvé',
         });
      }

      return res.status(200).json(utilisateur[0][0]);
   } catch (error) {
      console.error('Error connecting user:', error);
      throw error;
   } finally {
      await ConnexionDAO.disconnect();
   }
};

/**
 * Supprime un utilisateur par son pseudo.
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {JSON} L'objet de réponse et le message.
 */
exports.deleteUserByPseudo = async (req, res) => {
   try {
      const connexion = await ConnexionDAO.connect();
      const utilisateurDAO = new UtilisateurDAO();

      const { pseudo } = req.body;

      const findWithPseudo = { pseudo: pseudo };
      const user = await utilisateurDAO.find(
         connexion,
         findWithPseudo
      );

      if (user.length === 0) {
         res.status(404).json({
            message: 'Utilisateur non trouvé',
         });
         return;
      }

      const result = await utilisateurDAO.delete(
         connexion,
         findWithPseudo
      );
      res.status(200).json(result);
   } catch (error) {
      console.error('Error connecting user:', error);
      throw error;
   } finally {
      ConnexionDAO.disconnect();
   }
};

/**
 * Crée une nouvelle categorie.
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {JSON} L'objet de réponse et le message.
 */
exports.createCategory = async (req, res) => {
   let connexion
   try {
      connexion = await ConnexionDAO.connect();
      const nom = req.body.nom;

      if (!nom) return res
         .status(404)
         .json({
            success: false,
            message: 'Categorie non trouvée',
         });

      const findWithNom = {
         nom: nom,
      };
      const exists = await CATEGORIE_DAO.find(
         connexion,
         findWithNom
      )
      if (exists[0].length > 0) return res
         .status(404)
         .json({
            success: false,
            message: 'La catégorie existe déjà',
         });

      const categorie = {
         id_categorie: uuidv4(),
         nom: nom,
      };

      const result = await CATEGORIE_DAO.create(
         connexion,
         categorie
      );

      if (result) return res.status(200).json({
         success: true,
         message: 'Categorie ajoutée !',
      });

   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      ConnexionDAO.disconnect();
   }
};

/**
 * Supprime une categorie de la base de données.
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {JSON} L'objet de réponse et le message.
 */
exports.deleteCategory = async (req, res) => {
   try {
      const connexion = await ConnexionDAO.connect();
      const categorieDAO = new CategorieDAO();
      const id = req.params.id;
      const findWithId = { id_categorie: id };
      const result = await categorieDAO.delete(
         connexion,
         findWithId
      );

      return (result[0].length == 0) ? res.status(404).json({
         success: false,
         message: 'La catégorie n\'existe pas !',
      }) : res.status(200).json({
         success: true,
         message: 'Categorie supprimée !',
      })


   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      ConnexionDAO.disconnect();
   }
};

exports.createArticle = async (req, res) => {
   try {
      const connexion = await ConnexionDAO.connect();
      const articleDAO = new ArticleDAO();

      const { nom, description, prix, quantite, categorie } =
         req.body;
      const { file } = req;

      // ? Vérifie si l'article existe déjà
      const article = {
         id_article: uuidv4(),
         nom: nom || 'non nommé',
         photo: file ? file.path : 'images/no-image.png',
         description: description || 'aucune description',
         prix: prix || 0,
         quantite: quantite || 0,
         categorie_id: categorie || 'pas de catégorie',
      };

      const findWithNom = {
         nom: article.nom,
      };

      const exists = await articleDAO.find(connexion, findWithNom);

      // ! Si l'article existe, on ne l'ajoute pas
      if (exists[0].length > 0) {
         return res
            .status(404)
            .json({
               success: false,
               message: "L'article existe déjà",
            });
      }

      // ? Si l'article n'existe pas, on l'ajoute
      const result = await articleDAO.create(connexion, article);

      // ? Si l'article a été ajouté, on renvoie le message
      if (result) {
         return res.status(201).json({
            success: true,
            message: 'Article ajouté !',
         });
      }
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      ConnexionDAO.disconnect();
   }
};

exports.updateArticle = async (req, res) => {
   try {
      const connexion = await ConnexionDAO.connect();
      const articleDAO = new ArticleDAO();

      const article = {
         nom: req.body.nom || null,
         photo: req.file ? req.file.path : null,
         description: req.body.description || null,
         prix: req.body.prix || null,
         quantite: req.body.quantite || null,
         categorie_id: req.body.categorie_id || null,
         id_article: req.body.id,
      };

      const filteredArticleData = Object.fromEntries(
         Object.entries(article).filter(
            ([key, value]) => value !== null
         )
      );

      const findWithId = {
         id_article: article.id_article,
      };

      const exists = await articleDAO.find(connexion, findWithId);

      if (exists[0].length === 0) {
         return res.status(404).json({
            success: false,
            message: 'Article non trouvée',
         });
      }

      const result = await articleDAO.update(
         connexion,
         filteredArticleData
      );

      if (result) {
         res.status(201).json({
            success: true,
            message: 'Article mis à jour !',
         });
      }
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      ConnexionDAO.disconnect();
   }
};

exports.deleteArticle = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const articleDAO = new ArticleDAO();

      const id = req.params.id;

      const findWithId = {
         id_article: id,
      };

      const article = await articleDAO.find(
         connexion,
         findWithId
      );
      if (article[0].length === 0) {
         res.status(404).json({
            success: false,
            message: 'Article non trouvée',
         });
         return;
      }

      await articleDAO.delete(
         connexion,
         findWithId
      );

      res.status(200).json({
         success: true,
         message: 'Référence supprimées !',
      });

   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      ConnexionDAO.disconnect();
   }
};





