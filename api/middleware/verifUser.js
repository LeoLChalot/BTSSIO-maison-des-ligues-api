const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');

/*
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

    console.log("Decoded user from token:", decoded);
    (decoded.role == true) ? next() : res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    console.error('Error verifying token:', err);
  }
};

module.exports = bearerAdmin;


