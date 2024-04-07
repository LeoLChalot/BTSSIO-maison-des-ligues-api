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
      const login = req.body.login;

      let utilisateur = await UTILISATEUR_DAO.find(
         connexion,
         'pseudo',
         login
      );

      if (utilisateur[0].length === 0) {
         utilisateur = await UTILISATEUR_DAO.find(
            connexion,
            'email',
            login
         );
      }

      return (utilisateur[0].length === 0)
         ? res.status(404).json({
            success: false,
            message: 'Utilisateur non trouvé',
         })
         : res.status(200).json({
            success: true,
            message: "Informations de l'utilisateur",
            infos: { utilisateur: utilisateur[0][0] }
         });

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
      const { pseudo } = req.body;

      const findWithPseudo = { pseudo: pseudo };
      const user = await UTILISATEUR_DAO.find(
         connexion,
         findWithPseudo
      );

      if (user.length === 0)
         return res.status(404).json({
            message: 'Utilisateur non trouvé',
         });

      const result = await UTILISATEUR_DAO.delete(
         connexion,
         findWithPseudo
      );

      return res.status(200).json({
         success: true,
         message: 'Utilisateur supprimé',
      });

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

      if (!nom)
         return res
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
      if (exists[0].length > 0)
         return res
            .status(404)
            .json({
               success: false,
               message: 'La catégorie existe déjà',
            });

      const categorie = {
         id: uuidv4(),
         nom: nom,
      };

      const result = await CATEGORIE_DAO.create(
         connexion,
         categorie
      );

      return (result)
         ? res.status(200).json({
            success: true,
            message: 'Categorie ajoutée !',
         })
         : res.status(404).json({
            success: false,
            message: 'Categorie non ajoutée',
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
      const id = req.params.id;
      const findWithId = { id: id };
      const result = await CATEGORIE_DAO.delete(
         connexion,
         findWithId
      );

      return (!result)
         ? res.status(404).json({
            success: false,
            message: 'La catégorie n\'existe pas !',
         })
         : res.status(200).json({
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

/**
 * Update a category in the database.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Object} JSON object with success status and message
 */
exports.updateCategory = async (req, res) => {
   try {
      const connexion = await ConnexionDAO.connect();
      const id = req.params.id;
      const nom = req.body.nom;

      const updatedCategory = { nom: nom, id: id };
      console.log(updatedCategory);
      const result = await CATEGORIE_DAO.update(
         connexion,
         updatedCategory,
      )

      return (!result)
         ? res.status(404).json({
            success: false,
            message: 'La catégorie n\'existe pas !',
         })
         : res.status(200).json({
            success: true,
            message: 'Categorie mise à jour !',
         })
   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      ConnexionDAO.disconnect();
   }
}

/**
 * A function to create a new article.
 *
 * @param {Object} req - The request object containing article information.
 * @param {Object} res - The response object to send back.
 * @return {Object} The response indicating success or failure of adding the article.
 */

exports.createArticle = async (req, res) => {
   try {
      const connexion = await ConnexionDAO.connect();
      const articleDAO = new ArticleDAO();

      const { nom, description, prix, quantite, categorie_id } =
         req.body;
      const { file } = req;

      // ? Vérifie si l'article existe déjà
      const article = {
         id: uuidv4(),
         nom: nom || 'non nommé',
         photo: file ? file.path : 'images/no-image.png',
         description: description || 'aucune description',
         prix: prix || 0,
         quantite: quantite || 0,
         categorie_id: categorie_id || 'pas de catégorie',
      };

      const findWithNom = {
         nom: article.nom,
      };

      const exists = await ARTICLE_DAO.find(connexion, findWithNom);

      // ! Si l'article existe, on ne l'ajoute pas
      if (exists[0].length > 0)
         return res
            .status(404)
            .json({
               success: false,
               message: "L'article existe déjà",
            });

      // ? Si l'article n'existe pas, on l'ajoute
      const result = await ARTICLE_DAO.create(connexion, article);

      // ? On renvoie le message quand l'article est ajouté
      if (result)
         return res.status(200).json({
            success: true,
            message: 'Article ajouté !',
         });

   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      ConnexionDAO.disconnect();
   }
};

/**
 * Update an article based on the provided request and response objects.
 *
 * @param {Object} req - The request object containing the article information to be updated.
 * @param {Object} res - The response object for sending the result of the update operation.
 * @return {Promise} A promise that resolves with the updated article information if successful, or rejects with an error.
 */

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
         id: req.body.id,
      };

      const filteredArticleData = Object.fromEntries(
         Object.entries(article).filter(
            ([key, value]) => value !== null
         )
      );

      const findWithId = {
         id: article.id,
      };

      const exists = await articleDAO.find(connexion, findWithId);

      if (exists[0].length === 0)
         return res.status(404).json({
            success: false,
            message: 'Article non trouvée',
         });

      const result = await articleDAO.update(
         connexion,
         filteredArticleData
      );

      if (result)
         return res.status(200).json({
            success: true,
            message: 'Article mis à jour !',
         });

   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      ConnexionDAO.disconnect();
   }
};

/**
 * Delete an article by its ID.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {Promise} Promise representing the completion of the deletion process
 */
exports.deleteArticle = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const articleDAO = new ArticleDAO();

      const id = req.params.id;

      const findWithId = {
         id: id,
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

/**
 * Retrieves all users and sends a response with the list of users or a 404 status if no users are found.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {Object} JSON response with success status and either the list of users or an error message
 */
exports.getAllUsers = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const users = await UTILISATEUR_DAO.find_all(connexion);

      if (!users[0])
         return res.status(404).json({
            success: false,
            message: 'Aucun utilisateur',
         });

      return res.status(200).json({
         success: true,
         message: 'Liste des utilisateurs',
         users: users[0]
      });

   } catch (error) {
      console.error('Error connecting user:', error);
      throw error;
   } finally {
      ConnexionDAO.disconnect();
   }
}



