const isAuthenticated = (req, res, next) => {
  if (typeof req.session.username !== 'undefined') {
    return next()
  }
  return next(new Error(`You aren't allowed to be here!`))
}

module.exports = isAuthenticated
