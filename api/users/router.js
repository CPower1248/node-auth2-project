const express = require("express")
const router = express.Router()

const Users = require("./model")

const restricted = require("../auth/authMiddleware")

router.get("/", restricted, (req, res, next) => {
  Users.find()
    .then(users => res.json(users))
    .catch(next)
})

module.exports = router
