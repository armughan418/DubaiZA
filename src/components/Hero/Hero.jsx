import React from 'react'
import "./Hero.css";
import { MoveRight } from 'lucide-react';

const Hero = () => {
  return (
    <div>
      <section className='hero'>
        <div className="hero-page">
            <div className="hero-text">
            <h1>The Marketplace for <span>Everything</span></h1>
            <p>Buy, sell, and find anything from cars and homes to jobs and services.</p>
        </div>
        <div className="input-box">
            <div className="search-input">
                <input type='text' placeholder='Search for Anything...'></input>
                <button>Search</button>
            </div>
            <div className="help-box">
                <span>Not sure what you want? Let AI help.</span>
                <a href=''>Ask AI Assistant<MoveRight size={15} /></a>
            </div>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
