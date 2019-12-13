const express = require("express");
const listEndpoints = require('express-list-endpoints')
require("dotenv").config();
const cors = require("cors");

const studentsRouter = require("./services/students");

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors());

server.use("/students", studentsRouter);

console.log(listEndpoints(server));

server.listen(port, () => console.log(`Listening on port ${port}!`));
