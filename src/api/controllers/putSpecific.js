const putSpecificRouter = require('express').Router()
const Gif = require('../models/Gif')
const express = require('express')
putSpecificRouter.use(express.json())

putSpecificRouter.put('/:id', (req, res, next) => {
  const user = req.params.id
  const gifdata = req.body
  const newGifInfo = {
    username: gifdata.username,
    preferences: gifdata.preferences
  }
  Gif.findOneAndUpdate({ username: user }, newGifInfo, { new: true, upsert: true })
    .then(result => {
      res.json(result)
    }).catch(err => next(err))
})

module.exports = putSpecificRouter
