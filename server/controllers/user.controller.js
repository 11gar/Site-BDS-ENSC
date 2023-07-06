const User = require("../models/user.model.js");

exports.createUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log("controller", req.body.user);

  const user = new User({
    pseudo: req.body.pseudo,
    nom: req.body.nom,
    prenom: req.body.prenom,
  });

  User.createUser(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while adding the user.",
      });
    else res.send(data);
  });
};

exports.getAllUsers = async (req, res) => {
  User.getAllUsers((err, data) => {
    if (err)
      res({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else {
      res.send(data);
    }
  });
};

exports.getUserById = (req, res) => {
  User.getUserById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    else res.send(data);
  });
};

exports.getAllUsersFromFamille = (req, res) => {
  User.getAllUsersFromFamille(req.params.id, (err, data) => {
    if (err)
      res({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else {
      res.send(data);
    }
  });
};

exports.getAllUsersFromEquipe = (req, res) => {
  User.getAllUsersFromEquipe(req.params.id, (err, data) => {
    if (err)
      res({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else {
      res.send(data);
    }
  });
};
