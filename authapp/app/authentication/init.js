const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

const user = {
  username: 'test-user',
  password: 'test-password',
  id: 1
}

function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      findUser(username, function (err, user) {
        console.log(`Username:${username}`)
        console.log(`Password:${password}`)
        if (err) {
          console.log("initPassport error")
          return done(err)
        }
        if (!user) {
          console.log("User is null")
          return done(null, false)
        }
        if (password !== user.password  ) {
          console.log("Password not matched")
          return done(null, false)
        }
        console.log(`Authenticated.1.`)
        return done(null, user)
      })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport