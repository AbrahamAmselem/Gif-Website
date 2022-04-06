const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  gifs: [{
    type: Schema.Types.ObjectId,
    ref: 'Gif'
  }]
})

// when json() is called in express toJSON is called underneath so can change the response schema here
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User
