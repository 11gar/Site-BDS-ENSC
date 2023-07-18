const connection = require("../db");

const Equipe = function (equipe) {
  this.id = equipe.id;
  this.nom = equipe.nom;
  this.points = equipe.points;
};

Equipe.getTeamById = (teamId, res) => {
  connection.query(
    `select * from sql7633633.equipes where id = ?`,
    teamId,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
};

Equipe.getFamilleById = (teamId, res) => {
  connection.query(
    `select * from sql7633633.familles where id = ?`,
    teamId,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
};

Equipe.getAllFamilles = async (res) => {
  connection.query(`select * from sql7633633.familles`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res(err, result);
  });
};

Equipe.getAllTeams = async (res) => {
  connection.query(`select * from sql7633633.equipes`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res(err, result);
  });
};

module.exports = Equipe;
