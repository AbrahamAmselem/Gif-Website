const User = require('../models/User')
const { api, findUser } = require('./helpers')
const mongoose = require('mongoose')
const { server } = require('../index')

beforeAll(async () => {
  await User.deleteMany({})
  const user = { username: 'testUser', name: 'test', password: 'password' }
  const newUser = User(user)
  await newUser.save()
})

test('check username creation and DB apperance', async () => {
  const userAtStart = await findUser()
  const newUser = {
    username: 'abyaa97',
    name: 'Abraham Amselem',
    password: 'aby123'
  }
  await api
    .post('/api/user')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const usersAtEnd = await findUser()
  expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

  const userName = usersAtEnd.map(userdata => userdata.username)
  expect(userName).toContain(newUser.username)
})

test('Unique Usernames', async () => {
  // const userAtStart = await findUser()
  const newUser = {
    username: 'testUser',
    name: 'test',
    password: 'password'
  }
  await api
    .post('/api/user')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
  await server.close()
})
