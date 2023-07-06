module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  app.post("/user", user.createUser);
  //   app.get("/users", user.getAllUsers);
  app.get("/users", user.getAllUsers);
  //   app.get("/user/:id", user.getUserById);
  //   app.get("/user", user.getUserByConnection);

  app.delete("/user/:id", (req, res) => {
    res.send("delete user");
  });
  app.get("/user/:id", user.getUserById);
  app.get("/users/famille/:id", user.getAllUsersFromFamille);
  app.get("/users/equipe/:id", user.getAllUsersFromEquipe);
};
