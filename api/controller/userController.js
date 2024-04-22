const ConnexionDAO = require('../models/ConnexionDAO');
const UtilisateurDAO = require('../models/UtilisateurDAO');
const PanierDAO = require('../models/PanierDAO');
const Details_CommandesDAO = require('../models/Details_CommandesDAO');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const UTILISATEUR_DAO = new UtilisateurDAO();
const PANIER_DAO = new PanierDAO();
const DETAILS_COMMANDE_DAO = new Details_CommandesDAO();


exports.getUser = async (req, res) => {
console.log("ft_getUser")
	let connexion;
	try {
		connexion = await ConnexionDAO.connect();
		const { pseudo } = req.params;
		console.log(pseudo);
		const findWithPseudo = {pseudo: pseudo};
		const user = await UTILISATEUR_DAO.find(connexion, findWithPseudo);

		const utilisateur = {
			"id": user[0][0].id,
			"prenom": user[0][0].prenom,
			"nom": user[0][0].nom,
			"pseudo": user[0][0].pseudo,
			"email":user[0][0].email,
			"isAdmin": user[0][0].is_admin
		 }

		return res.status(200).json({
		"success": true,
		"message": "Informations de l'utilisateur",
		"infos": {
			"utilisateur": utilisateur
		}
		});
	}catch(err){
		return res.status(404).json({
			"success": false,
			"message": err
		});
	}finally{
		if (connexion) {
         		ConnexionDAO.disconnect(connexion);
		}
	}
}


/**
 * ## Inscrire un utilisateur
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {Promise<void>} Une promesse qui contient le résultat.
 */
exports.register = async (req, res) => {
	console.log("ft_register");
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
            id: uuidv4(),
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
console.log("ft_login")   
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

      // ! Envoyer une erreur si le couple login
      if (utilisateur[0].length === 0) return res.status(404).json({
         success: false,
         message: "Le login est incorrect",
      })

      loggedUser = {
         id: utilisateur[0][0].id,
         pseudo: utilisateur[0][0].pseudo,
         email: utilisateur[0][0].email,
         isAdmin: utilisateur[0][0].is_admin,
         hash: utilisateur[0][0].mot_de_passe,
      };

      console.log({ "UTILISATEUR": loggedUser })

      // ? Vérifier le mot de passe
      if (!bcrypt.compareSync(mot_de_passe, loggedUser.hash)) return res.status(404).json({
         success: false,
         message: 'Mot de passe incorrect',
      })

      // ? Récupérer le panier de l'utilisateur
      const findWithIdUtilisateur = { id_utilisateur: loggedUser.id };
      let panier = await PANIER_DAO.find(connexion, findWithIdUtilisateur);

      // ? Creer un nouveau panier si aucun panier n'est trouvé
      if (panier[0].length === 0) {
         const newPanier = {
            id: uuidv4(),
            id_utilisateur: loggedUser.id,
            date: currentDate,
         };
         await PANIER_DAO.create(connexion, newPanier);
         panier = await PANIER_DAO.find(connexion, findWithIdUtilisateur);
      }

      console.log("PANIER: ", panier)

      // ? Création du token
      const jwt_token = jwt.sign(
         {
            email: loggedUser.email,
            pseudo: loggedUser.pseudo,
            role: loggedUser.isAdmin ? true : false,
            panier: panier[0][0].id,
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
         infos: {
            utilisateur: {
               isAdmin: loggedUser.isAdmin,
               pseudo: loggedUser.pseudo,
               panier: panier[0][0].id,
               token: jwt_token,
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

/**
 * Function to get all users asynchronously.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} returns a Promise that resolves when all users are fetched
 */
exports.getAllUsers = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
      const utilisateurDAO = new UtilisateurDAO();

      let result = await utilisateurDAO.find_all(connexion);
	// let userList = result
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



/**
 * Get user details based on the provided email address.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} JSON response with user details or error message
 */
exports.getUserWithEmail = async (req, res) => {
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



/**
 * Delete a user with the provided pseudo.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} JSON response indicating success or failure of user deletion.
 */
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


/**
 * Update a user with the provided ID using the information in the request body.
 *
 * @param {Object} req - The request object containing user information.
 * @param {Object} res - The response object to send back the result.
 * @return {Object} The updated user information or an error message.
 */
exports.updateUserWithId = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();

      const id = req.params.id
      const findWithid = { id: id };
      console.log({ "REQ.BODY": req.body, "ID": id });
      const userData = await UTILISATEUR_DAO.find(connexion, findWithid);
	console.log(userData);
      if (userData[0].length === 0) return res.status(404).json({
         success: false,
         message: "Cet utilisateur n'existe pas",
      });

      // ? Vérifier le mot de passe
      if (!bcrypt.compareSync(req.body.mot_de_passe, userData[0][0].mot_de_passe)) return res.status(404).json({
         success: false,
         message: 'Mot de passe incorrect',
      })


      const old_email = userData[0][0].email
      const new_email = req.body.email ? req.body.email : userData[0][0].email

      const findWithMail = { email: new_email };

      const existMail = await UTILISATEUR_DAO.find(connexion, findWithMail);

      if (existMail[0].length !== 0) return res.status(404).json({
         success: false,
         message: 'Cet email est déjà utilisé',
      })

      const newUserData = {
         prenom: req.body.prenom ? req.body.prenom : userData[0][0].prenom,
         nom: req.body.nom ? req.body.nom : userData[0][0].nom,
         pseudo: req.body.pseudo ? req.body.pseudo : userData[0][0].pseudo,
         email: new_email,
         id: id
      };

      console.log({ "newUserData": newUserData });

      const filteredUserData = Object.fromEntries(
         Object.entries(newUserData).filter(
            ([key, value]) => value !== null
         )
      );

      const result = await UTILISATEUR_DAO.update(connexion, filteredUserData);

      return (!result)
         ? res.status(404).json({
            success: false,
            message: "[User.update] Une erreur est survenue au moment de la mise à jour des informations",
         })
         : res.status(200).json({
            success: true,
            message: "Informations mises à jour",
         })

   } catch (error) {
      console.error('Error connecting user:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
}

/**
 * Update user password with the provided ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} The updated user information.
 */
exports.updatePasswordWithId = async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();

      const id = req.params.id

      const { current_password, new_password } = req.body

      if (!current_password || !new_password)
         return res.status(404).json({
            success: false,
            message: "Veuillez renseigner tous les champs",
         });

      const findWithid = { id: id };

      console.log({ "REQ.BODY": req.body, "ID": id });

      const userData = await UTILISATEUR_DAO.find(connexion, findWithid);

      if (userData[0].length === 0) return res.status(404).json({
         success: false,
         message: "Cet utilisateur n'existe pas",
      });

      // ? Vérifier le mot de passe
      if (!bcrypt.compareSync(req.body.current_password, userData[0][0].mot_de_passe)) return res.status(404).json({
         success: false,
         message: 'Mot de passe incorrect',
      })

      const newUserData = {
         mot_de_passe: bcrypt.hashSync(new_password, 10),
         id: id
      };

      const filteredUserData = Object.fromEntries(
         Object.entries(newUserData).filter(
            ([key, value]) => value !== null
         )
      );

      const result = await UTILISATEUR_DAO.update(connexion, filteredUserData);

      if (!result) return res.status(404).json({
         success: false,
         message: "Cet utilisateur n'existe pas",
      });

      return res.status(200).json({
         success: true,
         message: "Mot de passe mis à jour",
      });

   } catch (error) {
      console.error('Error connecting user:', error);
      throw error;
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
}
