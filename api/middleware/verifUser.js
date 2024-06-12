const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const bearerUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "No JWT found" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.id != req.params.id) return res.status(401).json({ message: "Unauthorized" });

    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(401).json({ message: "Something went wrong..." });
  }
};

module.exports = bearerUser;


