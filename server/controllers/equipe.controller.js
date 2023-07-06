const Equipe = require("../models/equipe.model.js");

exports.getAllTeams = async (req, res) => {
  Equipe.getAllTeams((err, data) => {
    if (err)
      res({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else {
      res.send(data);
    }
  });
};

exports.getTeamById = (req, res) => {
  Equipe.getTeamById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    else res.send(data);
  });
};

exports.getAllFamilles = async (req, res) => {
  Equipe.getAllFamilles((err, data) => {
    if (err)
      res({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else {
      res.send(data);
    }
  });
};

exports.getFamilleById = (req, res) => {
  Equipe.getFamilleById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    else res.send(data);
  });
};
