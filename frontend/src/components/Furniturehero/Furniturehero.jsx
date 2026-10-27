import React from 'react'
import './Furniturehero.css'
import {Search} from 'lucide-react'
import { useState } from 'react'

const furnitureHero = () => {
    const [showFurniture, setFurniture] = useState("");
  return (
    <div>
       <div className="furniture-hero">
                  <div className="furniture-text">
                      <h1>Furniture & Garden</h1>
                      <p>Explore the best deals in Furniture & Garden. Find exactly what you need today.</p>
                  </div>
                  <div className="input-box">
                      <Search size={20} className='searchIcon' />
                      <input type='text' value={showFurniture} placeholder='Search in Furniture & Garden...' onChange={(e) =>{
                          setFurniture(e.target.value);
                      }}></input>
                      <button className='searchBtn'>Search</button>
                  </div>
              </div>
    </div>
  )
}

export default furnitureHero

