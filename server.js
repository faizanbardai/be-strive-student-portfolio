const cors = require("cors");
const express = require("express");
const studentsRouter = require("./services/students")
const server = express()
const port = 3001;
server.use(express.json()); 
server.use(cors());
server.use("/students", studentsRouter);
server.listen(port, () => console.log(`Listening on port ${port}!`));