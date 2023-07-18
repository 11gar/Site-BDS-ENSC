const connection = require("../db");

const User = function (user) {
  this.id = user.id;
  this.pseudo = user.pseudo;
  this.nom = user.nom;
  this.prenom = user.prenom;
  this.famille = user.famille;
  this.equipe = user.equipe;
};

User.createUser = (newUser, res) => {
  console.log("model", newTask.content);
  connection.query(
    `insert into sql7633633.users(pseudo,nom,prenom) values (?,?,?)`,
    [newUser.pseudo, newUser.nom, newUser.prenom],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

User.getUserIdByLoginAndPassword = (login, password, res) => {
  connection.query(
    `select id from sql7633633.users where pseudo = ? and password = ?`,
    [login, password],
    (err, result) => {
      res(result);
    }
  );
};

User.getUserById = (userId, res) => {
  connection.query(
    `select * from sql7633633.users where id = ?`,
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
  connection.query(`select * from sql7633633.users`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res(err, result);
  });
};

User.getAllUsersFromFamille = (familleId, res) => {
  connection.query(
    `select * from sql7633633.users where famille = ?`,
    familleId,
    (err, result) => {
      res(result);
    }
  );
};

User.getAllUsersFromEquipe = (equipeId, res) => {
  connection.query(
    `select * from sql7633633.users where equipe = ?`,
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
