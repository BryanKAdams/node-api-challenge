const express = require("express");

const cors = require('cors');
const projectsRouter = require("./Routes/projectsRouter");
const actionsRouter = require("./Routes/actionsRouter");
const server = express();
server.use(cors());
server.use(express.json());


server.get("/", logger, (req, res) => {
  res.send("<h2> Check out /api/projects or /api/projects/:id/actions</h2>");
});
server.use("/api/projects", projectsRouter);
server.use("/api/projects/:id/actions", actionsRouter);

//custom middleware

function logger(req, res, next) {
  console.log(req.url);
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}
module.exports = server;
