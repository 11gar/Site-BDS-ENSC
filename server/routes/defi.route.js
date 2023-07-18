module.exports = (app) => {
  const defi = require("../controllers/defi.controller.js");

  app.get("/defis", defi.getAllDefis);
  app.get("/defis/:idDefi", defi.getDefiById);
  app.get("/defis/equipe/:idEquipe", defi.getDefisFromEquipe);

  app.post("/defi/:idEquipe", defi.remplirDefi);
  app.put("/equipe/:idEquipe/", defi.updatePointsEquipe);
};
