import React from 'react'
import "./Login.css"
import {Check, Apple, Globe} from 'lucide-react'

const Login = () => {
    function hidePage(){
        const loginPage = document.querySelector(".login-page");
        loginPage.classList.add("hide");
    }
  return (
    <div className= 'login-page hide'>
        
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="login-left">
        <p>D</p>
        <div className="left-text">
            <h1>Welcome to<br></br>DubaiZA</h1>
            <span>The #1 marketplace in the UAE for Cars, Property, Jobs, and more.</span>
        </div>
        <div className="left-tags">
            <div className="tag">
                <span><Check size={20} /></span>
                <h5>Verified Sellers</h5>
            </div>
            <div className="tag">
                <span><Check size={20} /></span>
                <h5>Secure Chat</h5>
            </div>
            <div className="tag">
                <span><Check size={20} /></span>
                <h5>Smart AI Search</h5>
            </div>
        </div>
      </div>
      <div className="login-right">
        <div className="right-text">
            <h1>Welcome Back</h1>
            <p>Enter your details to sign in</p>
        </div>
        <div className="social-btn" onClick={hidePage}>
            <button className='google'><Globe color='#D7484D' />Continue with Google</button>
            <button className='apple'><Apple color='#FFFFFF' />Continue with Apple</button>
        </div>
        <h5><span>Or continue with</span></h5>
        <div className="input-wrapper">
            <div className="input-box">
                <label>Email Address</label>
                <input type='email' placeholder='name@example.com' id='email'></input>
            </div>
            <div className="input-box">
                <label>Password</label>
                <input type='password' placeholder='......' id='password'></input>
            </div>
        </div>
      </div>
            </div>
        </div>
    </div>
  )
}

export default Login
