/* IMPORT REQUIRED MODULES */
const jwt = require("jsonwebtoken");

/* MIDDLEWARE FUNCTION TO VERIFY AUTHENTICiTY OF TOKEN */
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) res.status(403).send("Access Denied");
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token has expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = verifyToken;
