const deleteSpecificRouter = require('express').Router()
const Gif = require('../models/Gif')

deleteSpecificRouter.delete('/:id', (req, res, next) => {
  const user = req.params.id
  Gif.findOneAndRemove({ username: user }).then(result => {
    res.status(204).end()
  }).catch(error => next(error))
})

module.exports = deleteSpecificRouter
