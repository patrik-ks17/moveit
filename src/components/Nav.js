import "../assets/style/Nav.css"
import React from 'react'
import { useNavigate } from "react-router-dom";

function Nav() {
	
	const navigate = useNavigate()
	return (
		<div className='nav'><img src={`icon/home.png`} alt="home page" onClick={() => navigate('/')}></img></div>
	)
}

export default Nav