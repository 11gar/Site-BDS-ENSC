const Defi = require("../models/defi.model.js");

exports.getAllDefis = async (req, res) => {
  Defi.getAllDefis((err, data) => {
    if (err)
      res({
        message: err.message || "Some error occurred while retrieving defis.",
      });
    else {
      res.send(data);
    }
  });
};

exports.getDefisFromEquipe = (req, res) => {
  Defi.getDefisFromEquipe(req.params.idEquipe, (data, err) => {
    if (err)
      res({
        message: err.message || "Some error occurred while retrieving defis.",
      });
    else {
      res.send(data);
    }
  });
};

exports.getDefiById = (req, res) => {
  Defi.getDefiById(req.params.idDefi, (data, err) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving defi.",
      });
    else res.send(data);
  });
};

exports.remplirDefi = (req, res) => {
  Defi.remplirDefi(
    req.body.idDefi,
    req.params.idEquipe,
    req.body.preuve,
    (data, err) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while posting defi rempli",
        });
      else res.send(data);
    }
  );
};

exports.updatePointsEquipe = (req, res) => {
  Defi.updatePointsEquipe(req.params.idEquipe, req.body.points, (data, err) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while posting defi rempli",
      });
    else res.send(data);
  });
};
