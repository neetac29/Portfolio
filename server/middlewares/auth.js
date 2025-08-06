const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ msg: "No token provided. Authorization denied." });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded; // attaches the user payload to the request

    next(); // pass to the next middleware or route handler
  } catch (err) {
    console.error("Auth Middleware Error:", err);

    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ msg: "Token has expired. Please log in again." });
    }

    if (err.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ msg: "Invalid token. Authorization denied." });
    }

    res.status(500).json({ msg: "Server error: " + err.message });
  }
};

module.exports = auth;
