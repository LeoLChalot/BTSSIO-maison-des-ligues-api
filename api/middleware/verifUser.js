const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const bearerAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.id !== req.params.id) throw new Error();

    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = bearerAdmin;


