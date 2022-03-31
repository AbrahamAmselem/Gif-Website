import React, { useState } from 'react'

export default function LoginForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginAuthentication = (event) => {
    event.preventDefault()
    console.log({ password })
  }

  return (
        <form onSubmit={handleLoginAuthentication}>
        <div>
        <input
         type="text"
         value={username}
         name='Username'
         placeholder="Username"
         onChange={({ target }) => setUsername(target.value)}/>
         </div>

        <div>
        <input
         type="password"
         value={password}
         name='Password'
         placeholder="Password"
         onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <div>
        <button>Login</button>
        </div>
        </form>
  )
}
