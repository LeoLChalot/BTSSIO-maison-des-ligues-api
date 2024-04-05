const ConnexionDAO = require('../models/ConnexionDAO');
const UtilisateurDAO = require('../models/UtilisateurDAO');
const PanierDAO = require('../models/PanierDAO');

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const UTILISATEUR_DAO = new UtilisateurDAO();
const PANIER_DAO = new PanierDAO();

/**
 * ## Inscrire un utilisateur
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {Promise<void>} Une promesse qui contient le résultat.
 */
exports.register = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const { prenom, nom, pseudo, email, mot_de_passe } = req.body;
      const findWithMail = { email: email };
      const findWithPseudo = { pseudo: pseudo };
      const registerDate = new Date();
      // ? Veiller d'avoir un prenom, un nom, un pseudo, un email et un mot de passe
      if (prenom && nom && pseudo && email && mot_de_passe) {
         // ? Verifier si le mail existe
         const existMail = await UTILISATEUR_DAO.find(connexion, findWithMail);
         // ! Envoyer une erreur si le mail existe
         if (existMail[0].length !== 0) return res.status(404).json({
            success: false,
            message: 'Cet email est déjà utilisé',
         });

         // ? Verifier si le pseudo existe
         const existPseudo = await UTILISATEUR_DAO.find(connexion, findWithPseudo);
         // ! Envoyer une erreur si le pseudo existe
         if (existPseudo[0].length !== 0) return res.status(404).json({
            success: false,
            message: 'Ce pseudo est déjà utilisé',
         });
         const user = {
            id_utilisateur: uuidv4(),
            prenom: prenom,
            nom: nom,
            pseudo: pseudo,
            email: email,
            mot_de_passe: await bcrypt.hash(mot_de_passe, 10),
            is_admin: false,
            register_date: registerDate,
         };
         // ? Creer l'utilisateur
         await UTILISATEUR_DAO.create(connexion, user);
         return res.status(200).json({
            success: true,
            message: 'Le compté à été créé avec succès'
         });
      } else {
         // ! Envoyer une erreur si l'un des champs du formulaire est manquant
         return res.status(404).end({
            success: false,
            message: 'Informations erronées',
         });
      }
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
 * ## Connexion d'un utilisateur
 *
 * @param {object} req - L'objet de requête.
 * @param {object} res - L'objet de réponse.
 * @return {Promise<void>} - Une promesse qui contient le résultat.
 */
exports.login = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const currentDate = new Date();

      const { login, mot_de_passe } = req.body;

      // ? Veiller d'avoir un login et un mot de passe
      if (!login || !mot_de_passe) return res.status(205).json({
         success: false,
         msg: 'Email et mot de passe requis',
      })

      const findWithMail = { email: login };
      const findWithPseudo = { pseudo: login };

      // ? Trouver l'utilisateur
      let utilisateur = await UTILISATEUR_DAO.find(connexion, findWithMail);

      if (utilisateur[0].length === 0) utilisateur = await UTILISATEUR_DAO.find(connexion, findWithPseudo);

      // ! Envoyer une erreur si le couple login/mdp ne correspond pas
      if (utilisateur[0].length === 0) return res.status(205).json({
         success: false,
         message: "L'email et le mot de passe ne correspondent pas",
      })

      utilisateur = {
         id_utilisateur: utilisateur[0][0].id_utilisateur,
         pseudo: utilisateur[0][0].pseudo,
         email: utilisateur[0][0].email,
         isAdmin: utilisateur[0][0].is_admin,
         hash: utilisateur[0][0].mot_de_passe,
      };

      // ? Vérifier le mot de passe
      if (!bcrypt.compareSync(mot_de_passe, utilisateur['hash'])) return res.status(205).json({
         success: false,
         message: 'Mot de passe incorrect',
      })

      // ? Récupérer le panier de l'utilisateur
      const findWithIdUtilisateur = { id_utilisateur: utilisateur['id_utilisateur'] };
      let panier = await PANIER_DAO.find(connexion, findWithIdUtilisateur);

      // ? Creer un nouveau panier si aucun panier n'est trouvé
      if (panier[0].length === 0) {
         const newPanier = {
            id_panier: uuidv4(),
            id_utilisateur: utilisateur['id_utilisateur'],
            date: currentDate,
         };
         await PANIER_DAO.create(connexion, newPanier);
         panier = await PANIER_DAO.find(connexion, findWithIdUtilisateur);
      }

      // ? Création du token
      const jwt_token = jwt.sign(
         {
            email: utilisateur.email,
            pseudo: utilisateur.pseudo,
            role: utilisateur.isAdmin ? true : false,
            panier: panier[0][0].id_panier,
         },
         process.env.SECRET_KEY,
         {
            expiresIn: '1h',
         }
      );

      console.log('jwt_token:', jwt_token);

      return res.status(200).json({
         success: true,
         message: 'Utilisateur connecté',
         isAdmin: utilisateur.isAdmin ? true : false,
         infos: {
            utilisateur: {
               pseudo: utilisateur.pseudo,
               panier: panier[0][0].id_panier,
               jwt_token: jwt_token,
            },
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

exports.getAllUsers = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const utilisateurDAO = new UtilisateurDAO();

      let result = await utilisateurDAO.find_all(connexion);
      res.status(200).json(result[0]);
   } catch (error) {
      console.error('Error connecting user:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};


exports.getUserFromEmail = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const utilisateurDAO = new UtilisateurDAO();

      const { pseudo } = req.params;
      const findWithMail = { pseudo: pseudo };

      let result = await utilisateurDAO.find(connexion, findWithMail);

      if (result[0].length === 0) {
         res.status(404).json({
            success: false,
            message: "Cet utilisateur n'existe pas",
         });
         return;
      }

      res.status(200).json(result[0][0]);
   } catch (error) {
      console.error('Error connecting user:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};


exports.deleteUserWithPseudo = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();

      const { pseudo } = req.params;
      const findWithPseudo = { pseudo: pseudo };

      let result = await UTILISATEUR_DAO.delete(connexion, findWithPseudo);

      if (!result) return res.status(404).json({
         success: false,
         message: "Cet utilisateur n'existe pas",
      });

      return res.status(200).json({
         success: true,
         message: "Utilisateur supprimé",
      });

   } catch (error) {
      console.error('Error connecting user:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
};


