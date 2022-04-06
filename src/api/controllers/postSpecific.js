const postSpecificRouter = require('express').Router()
const Gif = require('../models/Gif')
const express = require('express')
postSpecificRouter.use(express.json()) // used for POST reading

postSpecificRouter.post('/', (req, res, next) => {
  const gifdata = req.body
  const newEntry = new Gif({
    username: gifdata.username,
    preferences: gifdata.preferences
  })
  if (!newEntry.username) next()
  newEntry.save().then(savedEntry => {
    res.json(savedEntry)
  }).catch(err => next(err))
})

module.exports = postSpecificRouter
