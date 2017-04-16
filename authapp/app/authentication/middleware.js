function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log(`Authenticated.2.`)
      return next()
    }
    console.log(`Authenticated.3.`)
    res.redirect('/')
  }
}

module.exports = authenticationMiddleware