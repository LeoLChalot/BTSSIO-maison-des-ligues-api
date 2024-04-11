const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');


// cookieAdmin = (req, res, next) => {
//   cookieParser()(req, res, () => {
//     const token = req.cookies.jwt_token;
//     console.log('Token from cookies:', token);

//     try {
//       const user = jwt.verify(token, process.env.SECRET_KEY);
//       console.log('Decoded user from token:', user);
//       console.log('User role:', user.role);

//       (user.role == 1) ? next() : res.status(401).json({ message: "Unauthorized" });
//       // req.user = user;
//       // next();
//     } catch (err) {
//       console.error('Error verifying token:', err);
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   });
// };

// module.exports = cookieAdmin;


// Méthode avec les headers, c'est à dire le jwt est envoyé
// dans le header de la requete via Authorization: Bearer <token>

/**
 * Middleware function to check if the user is an admin based on the JWT token.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const bearerAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // On récupère la partie du header qui nous intéresse, c'est à dire le token
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    (decoded.role == true) ? next() : res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    console.error('Error verifying token:', err);
  }
};

module.exports = bearerAdmin;


