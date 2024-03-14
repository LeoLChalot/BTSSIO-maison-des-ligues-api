const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



/**
 * ## Middleware pour l'authentification JWT.
 *
 * @param {object} req - L'objet de requête.
 * @param {object} res - L'objet de réponse.
 * @param {function} next - La fonction next().
 * @return {void}
 */
exports.auth = (req, res, next) => {
  const { jwt_token } = req.cookies;
  console.log({ token: jwt_token });
  
  try {
    console.log("Authenticating...");
    jwt.verify(jwt_token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        req.user = decoded;
        console.log({ user: req.user });
        next();
      }
    })
  } catch(err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
