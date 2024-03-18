// authMiddleware.js
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    if (!token) throw new Error("Not authenticated!");
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) throw new Error(err);
      req.user = user;
      next();
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = authMiddleware;
