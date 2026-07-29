import React from 'react'
import "./Navbar.css";
import { Bell } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Plus } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="left-nav">
        <div className="logo">
            <p>D</p>
            <h1>Dubai<span>ZA</span></h1>
        </div>
      </div>
      <div className="center-nav">
        <div className="icons">
          <Bell/>
          <MessageCircle />
          <Heart />
        </div>
        <button className='loginBtn'>Login</button>
        <button className='registerBtn'>Register</button>
      </div>
      <div className="right-nav">
        <button className='postBtn'><Plus size={28} />Post Ad</button>
      </div>
    </div>
  )
}

export default Navbar
