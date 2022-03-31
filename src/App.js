import './App.css'
import React from 'react'
import ListOfGifs from './components/ListOfGifs.js'
import LoginForm from './components/LoginForm'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App () {
  return (
    <div className="App">
      <section className="App-header">
        <LoginForm/>
        <h1>My Gif App</h1>
      <BrowserRouter>
      <Link to="/gif/pixar">Pixar</Link>
      <Link to="/gif/disney">Disney</Link>
      <Link to="/gif/warnerbros">Warner Bros</Link>
        <Routes>
          <Route path="/gif/:keyword" element={<ListOfGifs/>} />
        </Routes>
      </BrowserRouter>
      </section>
    </div>
  )
}
export default App
