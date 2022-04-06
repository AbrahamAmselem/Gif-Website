const Gif = require('../models/Gif')
const mongoose = require('mongoose')
const { server } = require('../index')
const { api, initialState, retrieveAllData } = require('./helpers')

beforeEach(async () => {
  await Gif.deleteMany({})
  const userdata1 = new Gif(initialState[0])
  await userdata1.save()
  const userdata2 = new Gif(initialState[1])
  await userdata2.save()
})

test('gifs user data is returned in json and returning a 200 status', async () => {
  await api
    .get('/api/userdata')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('length of my db to be 2', async () => {
  const { response } = await retrieveAllData()
  expect(response.body).toHaveLength(initialState.length)
})

test('testing the post method', async () => {
  const newData = {
    username: 'Will Smith',
    preference: ['Chris Rock', 'Oscars', 'Hollywood', 'Love']
  }
  await api
    .post('/api/userdata')
    .send(newData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { response, content } = await retrieveAllData()
  expect(response.body).toHaveLength(initialState.length + 1)
  expect(content).toContain(newData.username)
})

test('testing invaling post 400 error on input data', async () => {
  const newData = {
    preference: ['Chris Rock', 'Oscars', 'Hollywood', 'Love']
  }
  await api
    .post('/api/userdata')
    .send(newData)
    .expect(404)
  const { response } = await retrieveAllData()
  expect(response.body).toHaveLength(initialState.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
