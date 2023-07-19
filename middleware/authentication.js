const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader || !authheader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authheader.split(" ")[1];

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userid: verifyToken.userId, name: verifyToken.name };
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
