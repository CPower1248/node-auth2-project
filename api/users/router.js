const express = require("express")
const router = express.Router()

const Users = require("./model")

router.get("/", (req, res, next) => {
  Users.find()
    .then(users => res.json(users))
    .catch(next)
})

// Should be in auth-router
router.post("/register", (req, res, next) => {
  Users.add(req.body)
    .then(user => res.json(user))
    .catch(next)
})

module.exports = router
