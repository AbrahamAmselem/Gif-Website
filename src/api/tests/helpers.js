const supertest = require('supertest')
const { app } = require('../index')

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

module.exports = {
  api,
  initialState,
  retrieveAllData
}
