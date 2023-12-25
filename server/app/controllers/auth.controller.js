const {SHA256, PBKDF2} = require("crypto-js");
const {Users} = require("../models");
const {sign} = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.register = (req, res) => {
  if (!req.body.name || req.body.name === "") {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }
  if (!req.body.username || req.body.username === "") {
    res.status(400).send({
      message: "Username can not be empty!",
    });
    return;
  }
  if (!req.body.password || req.body.password === "") {
    res.status(400).send({
      message: "Password can not be empty!",
    });
    return;
  }

  const salt = SHA256(req.body.username).toString();
  const encryptedPassword = PBKDF2(req.body.password, salt, {
    keySize: 256 / 32,
  }).toString();

  Users.create({
    name: req.body.name,
    username: req.body.username,
    password: encryptedPassword,
    passwordSalt: salt,
    role: "STAFF",
  })
    .then(() => {
      res.status(201).send({message: "User was registered successfully!"});
    })
    .catch((e) => {
      res.status(500).send({message: e.message});
    });
};

exports.login = (req, res) => {
  if (!req.body.username || req.body.username === "") {
    res.status(400).send({
      message: "Username can not be empty!",
    });
    return;
  }
  if (!req.body.password || req.body.password === "") {
    res.status(400).send({
      message: "Password can not be empty!",
    });
    return;
  }

  Users.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      const encryptedPassword = PBKDF2(req.body.password, user.passwordSalt, {
        keySize: 256 / 32,
      }).toString();

      if (user.password !== encryptedPassword) {
        return res.status(401).send({
          message: "Invalid username / password!",
        });
      }

      const token = sign({id: user.id}, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        accessToken: token,
      });
    })
    .catch(() => {
      res.status(500).send({message: "Invalid username / password!"});
    });
};
