const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')

const noteSchema = new Schema({
  username: String,
  preferences: [String]
})

const Gif = model('Gif', noteSchema)
// when json() is called in express toJSON is called underneath so need to
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Gif
