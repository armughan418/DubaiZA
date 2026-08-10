import React, { useState } from 'react'
import "./Navbar.css";
import { Plus, Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";

const Navbar = ({ setLogin, setRegister }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='navbar'>
      <div className="left-nav">
        <div className="logo">
          <p>D</p>
          <h1>Dubai<span>ZA</span></h1>
        </div>
      </div>

      <div className="center-nav">
        <ul>
          <Link to="/">Home</Link>
                    <Link to="/electronics">Electronics</Link>
                    <Link to="/furniture-garden">Furniture & Garden</Link>
        </ul>
        <button className='loginBtn' onClick={() => setLogin(true)}>Login</button>
        <button className='registerBtn' onClick={() => setRegister(true)}>Register</button>
      </div>

      <div className="right-nav">
        <button className='postBtn'><Plus size={28} />Post Ad</button>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(true)}>
        <Menu size={28} />
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="close-menu" onClick={() => setMenuOpen(false)}>
              <X size={26} />
            </button>

            <ul>
              <li><a href='#' onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href='#' onClick={() => setMenuOpen(false)}>Electronics</a></li>
              <li><a href='#' onClick={() => setMenuOpen(false)}>Furniture & Garden</a></li>
            </ul>

            <div className="mobile-menu-buttons">
              <button className='loginBtn' onClick={() => { setLogin(true); setMenuOpen(false); }}>
                Login
              </button>
              <button className='registerBtn' onClick={() => { setRegister(true); setMenuOpen(false); }}>
                Register
              </button>
              <button className='postBtn'><Plus size={22} />Post Ad</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar