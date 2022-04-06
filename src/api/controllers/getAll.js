const getAllRouter = require('express').Router()
const Gif = require('../models/Gif')

getAllRouter.get('/', (req, res) => {
  Gif.find({}).then(userpref => {
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
