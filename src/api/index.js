const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json()) // used for POST reading
app.use(cors()) // Any origin will work on my app needed for frontend

let favourites = [{
  username: 'Aby',
  preferences: ['Disney', 'Pixar', 'Warner Bros']
},
{
  username: 'Jose',
  preferences: ['Cinema', 'Food', 'Burgers']
},
{
  username: 'Isaias',
  preferences: ['cities', 'architecture', 'coding']
}
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/favourites', (req, res) => res.json(favourites))

app.get('/api/favourites/:id', (req, res) => {
  const id = req.params.id
  const personalPref = favourites.find(fav => fav.username === id)
  if (personalPref) {
    res.json(personalPref)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/favourites/:id', (req, res) => {
  const id = req.params.id
  favourites = favourites.filter(fav => fav.username !== id)
  res.status(204).end()
})

app.post('/api/favourites', (req, res) => {
  const pref = req.body
  const usernameExist = favourites.find(fav => fav.username === pref.username)
  console.log(usernameExist)
  if (usernameExist) {
    return res.status(404).json({
      error: 'Usernames need to be unique'
    })
  } else {
    const newEntry = {
      username: pref.username,
      preferences: pref.preferences
    }
    favourites = [...favourites, newEntry]
    res.json(newEntry)
  }
})

// If we reach this point without a path match output a 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Invalid request check input parameters'
  })
})

const PORT =  process.env.PORT || 3001

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
