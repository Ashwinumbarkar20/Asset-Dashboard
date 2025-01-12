import React from 'react'

export default function Card({text,value}) {
  return (
    <div className="card">
    <p>{text}</p>
    <p>{value}</p>
  </div>
  )
}
