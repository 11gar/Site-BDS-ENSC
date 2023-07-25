module.exports = (app) => {
  const defi = require("../controllers/defi.controller.js");

  app.get("/defis", defi.getAllDefis);
  app.get("/defis/:idDefi", defi.getDefiById);
  app.get("/defis/equipe/:idEquipe", defi.getDefisFromEquipe);
  app.get("/defis/remplis/:oui", defi.getDefisRemplis);
  app.get("/defis/search/:search", defi.searchDefi);

  app.post("/defi/:idEquipe", defi.remplirDefi);
  app.put("/equipe/:idEquipe/", defi.updatePointsEquipe);
};
