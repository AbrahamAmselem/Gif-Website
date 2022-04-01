module.exports = (error, req, res, next) => {
  console.error(error)
  console.log(error.name)
  res.status(400).end()
}
