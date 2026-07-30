import React from 'react'
import "./Subscribe.css";
import {Apple} from 'lucide-react'
import {Play} from 'lucide-react'

const Subscribe = () => {
  return (
    <div className='sub-page'>
      <div className="sub-left">
        <div className="sub-text">
            <h1>Get the full DubaiZA experience</h1>
            <p>Download our app for faster browsing, real-time chat alerts, and exclusive app-only deals. Available on iOS and Android.</p>
        </div>
        <div className="sub-buttons">
            <div className="app-btn">
                <Apple size={25} />
                <div className="app-text">
                    <p>Download on the</p>
                    <span>App Store</span>
                </div>
            </div>
             <div className="google-btn">
                <Play size={25} />
                <div className="google-text">
                    <p>Download on the</p>
                    <span>App Store</span>
                </div>
            </div>
        </div>
      </div>
      <div className="sub-right">
        <div className="input-box">
            <h1>Subscribe to our Newsletter</h1>
            <p>The latest deals, news, and updates sent straight to your inbox.</p>
            <div className="input-wrapper">
                <input type='text' placeholder='Your email address'></input>
                <button>Subscribe</button>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
