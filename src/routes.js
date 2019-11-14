const express = require("express");
const routes = express.Router();
const DocControllers = require("./controllers/DocController");

routes.get("/", (req, res) => {
  res.render("home");
});

routes.post("/", DocControllers.store);

module.exports = routes;
