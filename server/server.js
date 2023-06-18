const express = require("express");
const cors = require("cors");
const { log } = require("console");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("running on port 4000");
});

app.get("/tasks", (req, res) => {
  res.send("list of all tasks");
});

app.post("/task", (req, res) => {
  console.log(req.body.task);
  const ADD_QUERY = `insert into taskmanager.tasks(content) values ('${req.body.task}')`;
  connection.query(ADD_QUERY, (err) => {
    if (err) {
      console.log(err);
    }
    res.send("add task");
  });
});

app.delete("/task/:id", (req, res) => {
  res.send("add task");
});
