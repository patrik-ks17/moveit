import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function PageError() {
	const navigate = useNavigate()
  return (
	 <div>
		<h1>Oldal nem található!</h1>
		<button onClick={() => navigate("/")}>Főoldal</button>
	 </div>
  )
}