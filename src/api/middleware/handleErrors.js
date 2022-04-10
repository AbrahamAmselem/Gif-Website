module.exports = (error, req, res, next) => {
  console.error(error)
  console.log(error.name)
  if (error.name === 'JsonWebTokenError') {
    res.statur(401).json({error: 'Token missing or Invalid'})
  }
  res.status(400).end()
}
