const router = require("express").Router()
const bcryptjs = require("bcryptjs")

const Users = require("../users/model")
const { isValid } = require("../users/service")
const { generateToken } = require("./service")

router.post("/register", (req, res) => {
  const credentials = req.body

  if (isValid(credentials)) {
    const rounds = 10 // process.env.BCRYPT_ROUNDS || 10 (not working :/)
    const hash = bcryptjs.hashSync(credentials.password, rounds)
    credentials.password = hash

    Users.add(credentials)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.json({ message: err.message })
      })
  } else {
    res.json("Please provide username and password")
  }
})

router.post("/login", (req, res) => {
  const { username, password } = req.body

  if (isValid(req.body)) {
    Users.findBy({ username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user)
          res.json({ token })
        } else {
          res.json("You shall not pass!")
        }
      })
      .catch(err => {
        res.json({ message: err.message })
      })
  } else {
    res.json("Please provide username and password")
  }
})

module.exports = router
