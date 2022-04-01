const mongoose = require('mongoose')

const connectionString = process.env.MONDO_DB_URI

// connect to mongo db
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

/*
const gif = new Gif({
  username: 'Maluma',
  preferences: ['Wow', 'Lol', 'Warfare']

})

gif.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error(err)
  })

Gif.find({}).then(result => {
  console.log(result)
  mongoose.connection.close()
})
*/
