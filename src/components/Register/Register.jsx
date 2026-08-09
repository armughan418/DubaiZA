import "./Register.css"
import {Check, Apple, Globe, X} from 'lucide-react'

const Register = ({setRegister}) => {
  return (
    <div className='register-page'>
      <div className="modal-overlay">
            <div className="modal-box">
                <div className="cross-icon">
            <X size={30} onClick={() =>{
                setRegister(false);
            }}/>
        </div>
                <div className="register-left">
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
      <div className="register-right">
        <div className="right-text">
            <h1>Create Account</h1>
            <p>Join thousands of users in UAE today</p>
        </div>
        <div className="social-btn">
            <button className='google'><Globe color='#D7484D' />Continue with Google</button>
            <button className='apple'><Apple color='#FFFFFF' />Continue with Apple</button>
        </div>
        <h5><span>Or continue with</span></h5>
        <div className="input-wrapper">
            <div className="input-box">
                <label>Full Name</label>
                <input type='text' placeholder='Jhon Doe' id='name'></input>
            </div>
            <div className="input-box">
                <label>Email Address</label>
                <input type='email' placeholder='name@example.com' id='email'></input>
            </div>
        </div>
      </div>
            </div>
        </div>
    </div>
  )
}

export default Register
