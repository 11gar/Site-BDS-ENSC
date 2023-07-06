module.exports = (app) => {
  const equipe = require("../controllers/equipe.controller.js");

  app.get("/equipes", equipe.getAllTeams);
  app.get("/equipe/:id", equipe.getTeamById);
  app.get("/familles", equipe.getAllFamilles);
  app.get("/famille/:id", equipe.getFamilleById);
};
