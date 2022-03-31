import React, { useState, useEffect } from 'react'
import Gif from './Gif'
import getGifs from '../services/getGifs'
import { useParams } from 'react-router-dom'

export default function ListOfGifs () {
  const params = useParams()
  const { keyword } = params

  const [gifs, setGifs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    setLoading(true)
    getGifs({ keyword })
      .then(gifs => {
        setGifs(gifs)
        setLoading(false)
      })
  }, [keyword])

  if (loading) return <i> React will render the data asap 🤎 </i>

  return (
    <div>
    {
        gifs.map(gif =>
            <Gif
                key = {gif.id}
                title= {gif.title}
                id = {gif.id}
                url = {gif.url}
                />
        )
    }
    </div>
  )
}
