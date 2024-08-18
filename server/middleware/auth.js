const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    console.log("hello ");

    if (!token) {
      return res.status(401).send("Access Denied"); // Changed to 401 Unauthorized
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trimStart(); // Modern method for trimming
    } else {
      return res.status(401).send("Access Denied"); // Ensure it's a Bearer token
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Server error" }); // Generic server error
  }
};

module.exports = verifyToken;

const verifyTokenWeb = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRETAdmin);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  verifyToken,
  verifyTokenWeb,
};
