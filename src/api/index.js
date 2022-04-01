require('dotenv').config()
require('./mongo')

const Gif = require('./models/Gif')
const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const app = express()

app.use(express.json()) // used for POST reading
app.use(cors()) // Any origin will work on my app needed for frontend

app.get('/api/userdata', (req, res) => {
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

app.get('/api/userdata/:id', (req, res, next) => {
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

app.delete('/api/userdata/:id', (req, res, next) => {
  const user = req.params.id
  Gif.findOneAndRemove({ username: user }).then(result => {
    res.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/userdata', (req, res, next) => {
  const gifdata = req.body
  const newEntry = new Gif({
    username: gifdata.username,
    preferences: gifdata.preferences
  })
  newEntry.save().then(savedEntry => {
    res.json(savedEntry)
  }).catch(err => next(err))
})

app.put('/api/userdata/:id', (req, res, next) => {
  const user = req.params.id
  const gifdata = req.body
  const newGifInfo = {
    username: gifdata.username,
    preferences: gifdata.preferences
  }
  Gif.findOneAndUpdate({ username: user }, newGifInfo, { new: true })
    .then(result => {
      res.json(result)
    }).catch(err => next(err))
})

app.use(handleErrors)
app.use(notFound)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
