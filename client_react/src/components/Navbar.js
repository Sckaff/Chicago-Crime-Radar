import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

import { data } from '../dataContext/data'

const Navbar = () => {
  return (
    <div className = "navbar">
        <div className="home">
            <Link to="/">Chicago Crime Tracker</Link>
        </div>
        <div className = "links">
            <Link to="/myradar">MyRadar</Link>
            
            <Link to="/myarea" onClick={() => {localStorage.setItem("data", JSON.stringify(data))}}>MyArea</Link>
        </div>
        
        
    </div>
  )
}

export default Navbar