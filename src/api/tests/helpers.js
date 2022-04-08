const { app } = require('../index')
const User = require('../models/User')
const supertest = require('supertest')

const api = supertest(app)

const retrieveAllData = async () => {
  const response = await api.get('/api/userdata')
  const content = response.body.map(data => data.username)
  return {
    response,
    content
  }
}

const initialState = [
  {
    username: 'Aby',
    preference: ['Crypto', 'ETH', 'Coding']
  },
  {
    username: 'Marcos',
    preference: ['Game Of Thrones', 'Galaxy', 'Netflix']
  }
]

// const passwordHash = await bcrypt.hash('password123', 10)
// const newUser = new User({ username: 'testUser', passwordHash: passwordHash })

const findUser = async () => {
  const userDB = await User.find({})
  return userDB.map(user => user.toJSON())
}

module.exports = {
  api,
  initialState,
  retrieveAllData,
  findUser
}
