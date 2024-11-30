const jwt = require("jsonwebtoken");

const JWTMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized entry!" });
    }

    const token = authHeader.split(" ")[1];
    const response = jwt.verify(token, process.env.JWT_PASSWORD);

    if (!response) {
      return res.status(402).json({ message: "Verification failed" });
    }

    if (response.admin === true) {
      return next(); 
    } else {
      return res.status(403).json({ message: "Admin access only" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = JWTMiddleware;
