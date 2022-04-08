const getAllRouter = require('express').Router()
const Gif = require('../models/Gif')

getAllRouter.get('/', (req, res) => {
  Gif.find({}).populate('user', {
    username: 1,
    name: 1,
    _id: 0
  }).then(userpref => {
    if (userpref) {
      return res.json(userpref)
    } else {
      res.status(404).end()
    }
  }).catch(err => {
    console.log(err)
    res.status(400).end()
  })
})

module.exports = getAllRouter
