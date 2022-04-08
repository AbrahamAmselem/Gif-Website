const postSpecificRouter = require('express').Router()
const Gif = require('../models/Gif')
const User = require('../models/User')
const express = require('express')
postSpecificRouter.use(express.json()) // used for POST reading

postSpecificRouter.post('/', async (req, res, next) => {
  const {
    username,
    preferences,
    userId
  } = req.body

  const userEntry = await User.findById(userId)

  const newEntry = new Gif({
    username: username,
    preferences: preferences,
    user: userEntry._id
  })
  try {
    const savedEntry = await newEntry.save()
    userEntry.gifs = userEntry.gifs.concat(savedEntry._id)
    await userEntry.save()
    res.json(savedEntry)
  } catch (err) {
    next(err)
  }
})

module.exports = postSpecificRouter
