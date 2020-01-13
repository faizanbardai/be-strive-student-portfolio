const express = require("express");
const listEndpoints = require("express-list-endpoints");
require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");

const mongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION);
    console.log("MongoDB Connected!");
    server.listen(port, () => console.log(`Listening on port ${port}!`));
  } catch (error) {
    console.log(error);
  }
};
mongooseConnection();

const studentsRouter = require("./services/students");
const projectsRouter = require("./services/projects");

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors());

server.use("/students", studentsRouter);
server.use("/projects", projectsRouter);

console.log(listEndpoints(server));


