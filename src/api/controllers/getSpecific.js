const getSpecificRouter = require('express').Router()
const Gif = require('../models/Gif')

getSpecificRouter.get('/:id', (req, res, next) => {
  const user = req.params.id
  Gif.find({ username: user }).then(userpref => {
    if (userpref.length >= 1) {
      return res.json(userpref)
    } else {
      res.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

module.exports = getSpecificRouter
