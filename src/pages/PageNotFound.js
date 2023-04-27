import React, { useContext } from 'react'
import { HookContext } from './../context/Context';


export default function PageError() {
	const {navigate} = useContext(HookContext)
  return (
	 <div>
		<h1>Oldal nem található!</h1>
		<button onClick={() => navigate("/")}>Főoldal</button>
	 </div>
  )
}