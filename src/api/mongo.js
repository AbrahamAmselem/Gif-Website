require('dotenv').config()
const mongoose = require('mongoose')
const connectionString = process.env.MONGO_DB_URI

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

process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
