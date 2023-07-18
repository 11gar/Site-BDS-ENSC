const connection = require("../db");
// const name = require("../db");

const Defi = function (defi) {
  this.id = defi.id;
  this.nom = defi.nom;
  this.description = defi.description;
  this.points = defi.points;
};

Defi.getAllDefis = async (res) => {
  connection.query(`select * from sql7633633.defis`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res(err, result);
  });
};

Defi.getDefiById = async (idDefi, res) => {
  connection.query(
    `select * from sql7633633.defis where id = ?`,
    idDefi,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res(result);
    }
  );
};

Defi.searchDefi = async (search, res) => {
  connection.query(
    `select * from sql7633633.defis where (description like ?) or (nom like ?)`,
    ["%" + search + "%", "%" + search + "%"],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res(result);
    }
  );
};

Defi.getDefisFromEquipe = async (idEquipe, res) => {
  connection.query(
    `select idDefi from sql7633633.defis_equipes where idequipe = ?`,
    idEquipe,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res(result);
    }
  );
};

Defi.remplirDefi = async (idDefi, idEquipe, preuve, res) => {
  console.log("model", idDefi, idEquipe);
  connection.query(
    `insert into sql7633633.defis_equipes(idequipe, iddefi,preuve) values (?,?,?)`,
    [idDefi, idEquipe, preuve],
    (err, result) => {
      console.log(result);
      res(null);
    }
  );
};

Defi.updatePointsEquipe = async (idEquipe, points, res) => {
  console.log("model", idEquipe);
  connection.query(
    `update sql7633633.equipes set points = ? where id = ?`,
    [points, idEquipe],
    (err, result) => {
      console.log(result);
      res(null);
    }
  );
};

module.exports = Defi;
