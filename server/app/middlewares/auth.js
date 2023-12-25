const {verify} = require("jsonwebtoken");
const config = require("../config/auth.config");
const {Users} = require("../models");

verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token === "") {
    res.status(403).send({
      message: "No token provided!",
    });
  }

  verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.body.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  Users.findByPk(req.body.userId).then((user) => {
    if (user.role === "ADMIN") next();

    res.status(403).send({
      message: "Require Admin Role!",
    });
    return;
  });
};

const auth = {
  verifyToken,
  isAdmin,
};

module.exports = auth;
