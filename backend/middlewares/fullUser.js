const fullUser = (req, res, next) => {
  if (typeof req.session.username !== 'undefined') {
    res.json({ user: req.session.user })
  }
}

module.exports = fullUser
