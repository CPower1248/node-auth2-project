const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../../config/secrets")

module.exports = {
  generateToken
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: 1000 * 60 * 60
  }

  return jwt.sign(payload, jwtSecret, options)
}
