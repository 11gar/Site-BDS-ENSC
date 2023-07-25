const connection = require("../db");

const User = function (user) {
  this.id = user.id;
  this.pseudo = user.pseudo;
  this.nom = user.nom;
  this.prenom = user.prenom;
  this.famille = user.famille;
  this.equipe = user.equipe;
  this.password = user.password;
  this.annee = user.annee;
  this.mail = user.mail;
};

User.createUser = (newUser, res) => {
  console.log(newUser);
  connection.query(
    `insert into bds.users(pseudo,nom,prenom, password,annee,mail) values (?,?,?,?,?,?)`,
    [
      newUser.pseudo,
      newUser.nom,
      newUser.prenom,
      newUser.password,
      newUser.annee,
      newUser.mail,
    ],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

User.getUserIdByLoginAndPassword = (login, password, res) => {
  connection.query(
    `select id from bds.users where pseudo = ? and password = ?`,
    [login, password],
    (err, result) => {
      res(result);
    }
  );
};

User.getUserById = (userId, res) => {
  connection.query(
    `select * from bds.users where id = ?`,
    userId,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res(result);
    }
  );
};

User.getAllUsers = async (res) => {
  connection.query(`select * from bds.users`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res(err, result);
  });
};

User.getAllUsersFromFamille = (familleId, res) => {
  connection.query(
    `select * from bds.users where famille = ?`,
    familleId,
    (err, result) => {
      res(result);
    }
  );
};

User.getAllUsersFromEquipe = (equipeId, res) => {
  connection.query(
    `select * from bds.users where equipe = ?`,
    equipeId,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
};

module.exports = User;
