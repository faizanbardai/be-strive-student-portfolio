const express = require("express");
require("dotenv").config();
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const mongooseConnection = require("./src/db/mongoose");
const studentsRouter = require("./src/routes/students");
const projectsRouter = require("./src/routes/projects");
const server = express();
const port = process.env.PORT;
server.use(express.json());
var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
server.use(cors(corsOptions));
server.use("/students", studentsRouter);
server.use("/projects", projectsRouter);
mongooseConnection();
server.listen(port, () => console.log(`Listening on port ${port}!`));
console.log(listEndpoints(server));
