const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authheader = req.headers.authorization;

    if (!authheader) {
      return res.status(401).json({
        message: "Token Not Found"
      });
    }

    const token = authheader.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "Invalid Token"
      });
    }

    const payload = jwt.verify(token, "secretkey");

    req.user = payload;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid Token"
    });
  }
};

module.exports = { verifyToken };