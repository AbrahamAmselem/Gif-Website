const { model, Schema } = require('mongoose')

const gifSchema = new Schema({
  username: String,
  preferences: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Gif = model('Gif', gifSchema)
// when json() is called in express toJSON is called underneath so can change the response schema here
gifSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Gif
