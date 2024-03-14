const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');


cookieJwtAuth = (req, res, next) => {
  cookieParser()(req, res, () => {
    const token = req.cookies.jwt_token;
    console.log('Token from cookies:', token);

    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      console.log('Decoded user from token:', user);

      req.user = user;
      next();
    } catch (err) {
      console.error('Error verifying token:', err);
      res.status(401).json({ message: "Unauthorized" });
    }
  });
};

// Méthode avec les headers, c'est à dire le jwt est envoyé
// dans le header de la requete via Authorization: Bearer <token>

// const decodeToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//
//   On récupère la partie du header qui nous intéresse, c'est à dire le token
//   const token = authHeader.split(" ")[1];
//
//   On vérifie le token
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);
//
//     On ajoute l'id de l'utilisateur à la requete
//     req.userId = decoded.id;
//
//     On passe au middleware suivant
//     next();
//
//   } catch (err) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

module.exports = cookieJwtAuth;
