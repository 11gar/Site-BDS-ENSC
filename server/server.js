const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("running on port 4000");
});

require("./routes/equipe.route")(app);
require("./routes/user.route")(app);

module.exports = app;
