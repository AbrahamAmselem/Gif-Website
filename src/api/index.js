require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const app = express()
const usersRouter = require('./controllers/users')
const getAllRouter = require('./controllers/getAll')
const getSpecificRouter = require('./controllers/getSpecific')
const deleteSpecificRouter = require('./controllers/deleteSpecific')
const postSpecificRouter = require('./controllers/postSpecific')
const putSpecificRouter = require('./controllers/putSpecific')
const loginRouter = require('./controllers/login')

app.use(express.json()) // used for POST reading
app.use(cors()) // Any origin will work on my app needed for frontend

app.use('/api/login', loginRouter)

app.use('/api/userdata', putSpecificRouter)

app.use('/api/userdata', postSpecificRouter)

app.use('/api/userdata', deleteSpecificRouter)

app.use('/api/userdata', getSpecificRouter)

app.use('/api/userdata', getAllRouter)

app.use('/api/user', usersRouter)

app.use(handleErrors)
app.use(notFound)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`))

module.exports = { app, server }
