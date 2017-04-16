const passport = require('passport')

function initUser (app) {
  app.get('/', renderWelcome)
  app.get('/profile', passport.authenticationMiddleware(), renderProfile)
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
}

function renderWelcome (req, res) {
  console.log(`Welcome renderer >>> `)
  res.render('./user/welcome')
}

function renderProfile (req, res) {
  console.log(`Profile renderer >>> `)
  res.render('./user/profile', {
    username: req.user.username
  })
}

module.exports = initUser