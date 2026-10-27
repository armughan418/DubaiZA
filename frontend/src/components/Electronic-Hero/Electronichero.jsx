import React, { useState } from 'react'
import "./electronicHero.css";
import {Search} from 'lucide-react'

const Electronichero = () => {
    const [input, setInput] = useState("");
  return (
    <div>
        <div className="electronic-hero">
            <div className="electronic-text">
                <h1>Electronics</h1>
                <p>Explore the best deals in Electronics. Find exactly what you need today.</p>
            </div>
            <div className="input-box">
                <Search size={20} className='searchIcon' />
                <input type='text' value={input} placeholder='Search in Electronics...' onChange={(e) =>{
                    setInput(e.target.value);
                }}></input>
                <button className='searchBtn'>Search</button>
            </div>
        </div>
    </div>
  )
}

export default Electronichero
