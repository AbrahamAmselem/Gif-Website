const postSpecificRouter = require('express').Router()
const Gif = require('../models/Gif')
const User = require('../models/User')
const express = require('express')
const jwt = require('jsonwebtoken')
postSpecificRouter.use(express.json()) // used for POST reading

postSpecificRouter.post('/', async (req, res, next) => {
  const {
    username,
    preferences
  } = req.body

  const authorization = req.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodedToken

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
