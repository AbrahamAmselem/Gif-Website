import React from 'react'
import './Gif.css'

export default function Gif ({ title, id, url }) {
  return <a href={`#${id}`} className='Gif'>
    <h1>{title}</h1>
    <small>{id}</small>
    <img alt = {title} src={url}/>
  </a>
}
