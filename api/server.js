const express = require("express");
const server = express();
server.use(express.json())

const usersRouter = require("./users/router")
const authRouter = require("./auth/router")

server.use("/api/users", usersRouter)
server.use("/api/auth", authRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" })
})

module.exports = server;
