import React, { useState } from 'react'

export default function Card({text,value}) {
  const[loading,setLoading]=useState(false)
  return (
    {loading ? "Loding..." : (<div className="card">
      <p>{text}</p>
      <p>{value}</p>
    </div>)}
    
  )
}

