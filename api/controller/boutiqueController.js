const ConnexionDAO = require('../models/ConnexionDAO');
const CategorieDAO = require('../models/CategorieDAO');
const ArticleDAO = require('../models/ArticleDAO');
const CATEGORIE_DAO = new CategorieDAO();
const ARTICLE_DAO = new ArticleDAO();
const ft = require('../lib/lib');


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
      const result = await CATEGORIE_DAO.find_all(connexion);

      if (result[0].length === 0) return res.status(404).json({
         success: false,
         message: 'Aucune categorie en base de données',
      });

      const categories = [];

      for (let i = 0; i < result[0].length; i++) {
         categories.push({
            id: result[0][i].id,
            nom: result[0][i].nom,
         });
      }

      return res.status(200).json({
         success: true,
         message: 'Liste des categories',
         infos: {
            nombreCategories: categories.length,
            categories: categories
         },
      })

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
         id: req.params.id,
      };

      const result = await CATEGORIE_DAO.find(connexion, findById);
      if (result[0].length === 0) return res.status(404).json({
         success: false,
         message: 'Categorie non trouvé',
      });

      console.log(result);

      const categorie = {
         id: result[0][0].id,
         nom: result[0][0].nom,
      };

      return res.status(200).json({
         success: true,
         message: "Informations sur la catégorie",
         infos: {
            categorie: categorie,
         },
      });

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
      const result = await CATEGORIE_DAO.find(connexion, findByNom);
      console.log(result);
      if (result[0].length === 0) return res.status(404).json({
         success: false,
         message: 'Categorie non trouvé',
      })

      const categorie = {
         id: result[0][0].id,
         nom: result[0][0].nom,
      };

      return res.status(200).json({
         success: true,
         message: "Informations sur la catégorie",
         infos: { categorie: categorie },
      })
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

   const orderBy = req.query.orderBy;

   try {
      connexion = await ConnexionDAO.connect();
      let result

      if (orderBy) {
         result = await ARTICLE_DAO.find_all(connexion, orderBy);
      } else {
         result = await ARTICLE_DAO.find_all(connexion);
      }



      if (result[0].length === 0) return res.status(404).json({
         success: false,
         message: 'Aucun articles en base de données',
      });

      const categorie = await ft.getCategoryById(connexion, result[0][0].categorie_id);

      let articles = [];
      let nombreArticles = 0;
      let quantiteTotal = 0;
      let prixTotal = 0;

      for (const data of result[0]) {
         const article = {
            id: data.id,
            nom: data.nom,
            description: data.description,
            image: data.photo,
            prix: data.prix,
            quantite: data.quantite,
            categorie: {
               id: categorie.id,
               nom: categorie.nom,
            }
         };
         nombreArticles++;
         quantiteTotal += article.quantite;
         prixTotal += article.prix * article.quantite;
         articles.push(article);
      }

      const categories = {};

      for (const data of result[0]) {
         const categorieNom = (await ft.getCategoryById(connexion, data.categorie_id)).nom;
         categories[categorieNom] = categories[categorieNom] ? categories[categorieNom] + 1 : 1;
      }

      return res.status(200).json({
         success: true,
         message: 'Informations des articles',
         infos: {
            statistiques: {
               categories: categories,
               nombreArticles: nombreArticles,
               quantiteTotal: quantiteTotal,
               prixTotal: prixTotal.toFixed(2),
            },
            articles: articles,
         },
      });

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
 * ## Retourne l'article en fonction de son identifiant
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {Promise<void>} - Une promesse qui contient le résultat.
 */
exports.getArticleById = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();

      const findByIdArticle = {
         id: req.params.id,
      };

      const result = await ARTICLE_DAO.find(
         connexion,
         findByIdArticle
      );

      if (result[0].length === 0) return res.status(404).json({
         success: false,
         message: 'Article non trouvé',
      });

      const categorie = await ft.getCategoryById(connexion, result[0][0].categorie_id);

      const article = {
         id: result[0][0].id,
         nom: result[0][0].nom,
         description: result[0][0].description,
         image: result[0][0].photo,
         prix: result[0][0].prix,
         quantite: result[0][0].quantite,
         categorie: {
            id: categorie.id,
            nom: categorie.nom,
         }
      };

      return res.status(200).json({
         success: true,
         message: 'Informations de l\'article',
         infos: { article: article },
      });

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
 * ## Retourne l'article en fonction de son nom
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {Promise<void>} - Une promesse qui contient le résultat.
 */
exports.getArticleByName = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const findByNom = {
         nom: req.params.nom,
      };
      result = await ARTICLE_DAO.find(connexion, findByNom);
      if (result[0].length === 0) return res.status(404).json({
         success: false,
         message: 'Article non trouvé',
      });

      const categorie = await ft.getCategoryById(connexion, result[0][0].categorie_id);

      const article = {
         id: result[0][0].id,
         nom: result[0][0].nom,
         description: result[0][0].description,
         image: result[0][0].photo,
         prix: result[0][0].prix,
         quantite: result[0][0].quantite,
         categorie: {
            id: categorie.id,
            nom: categorie.nom,
         }
      };

      return res.status(200).json({
         success: true,
         message: 'Informations de l\'article',
         infos: { article: article },
      });

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
 * ## Retourne la liste des articles en fonction de la catégorie.
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @returns {Promise<void>} Une promesse qui contient la liste des articles.
 */
exports.getArticlesByIdCategory = async (req, res) => {
   let connexion;

   const orderBy = req.query.orderBy;

   try {
      connexion = await ConnexionDAO.connect();
      let result;

      const findByIdCategorie = {
         categorie_id: req.params.id,
      };

      if (orderBy) {
         result = await ARTICLE_DAO.find(
            connexion,
            findByIdCategorie,
            orderBy
         );
      } else {
         result = await ARTICLE_DAO.find(connexion, findByIdCategorie);
      }

      if (result[0].length === 0) return res.status(404).json({
         success: false,
         message: 'Categorie ou articles inexistants',
      });

      const categorie = await ft.getCategoryById(connexion, result[0][0].categorie_id);

      let articles = [];

      for (let i = 0; i < result[0].length; i++) {
         const article = {
            id: result[0][i].id,
            nom: result[0][i].nom,
            description: result[0][i].description,
            image: result[0][i].photo,
            prix: result[0][i].prix,
            quantite: result[0][i].quantite,
            categorie: {
               id: categorie.id,
               nom: categorie.nom,
            }
         };
         articles.push(article);
      }
      return res.status(200).json({
         success: true,
         message:
            articles.length > 1
               ? 'Informations des articles'
               : 'Informations de l\'article',
         infos: { articles: articles },
      });

   } catch (error) {
      console.error('Error connecting shop:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};
