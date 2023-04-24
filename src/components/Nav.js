import React from 'react'
import { useNavigate } from "react-router-dom";
import "../assets/style/Nav.css"

function Nav() {
	const navigate = useNavigate();
  return (
	 <div className='nav'><img src={`icon/home.png`} onClick={(e) =>{navigate('/')}}></img></div>
  )
}

export default Nav