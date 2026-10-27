import React from 'react'
import './Footer.css'
import { MapPin, Phone, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <div className="logo">
            <p>D</p>
            <h1>Dubai<span>ZA</span></h1>
        </div>
        <span className='footer-p'>The UAE's most trusted marketplace. Whether you're buying your first car, finding your dream home, or looking for a new job, we make it safe and easy.</span>
        <div className="anchor-tags">
            <a href=''><MapPin size={17} color='#E31E24' />Dubai Media City, Building 4, UAE</a>
            <a href=''><Phone size={17} color='#E31E24' />+971 4 123 4567</a>
            <a href=''><Mail size={17} color='#E31E24' />support@dubaiza.com</a>
        </div>
      </div>
      <div className="company">
        <h1>Company</h1>
        <ul>
            <a href=''>About Us</a>
            <a href=''>Carrers</a>
            <a href=''>Press & News</a>
            <a href=''>Investor Relations</a>
            <a href=''>Terms of Service</a>
            <a href=''>Privacy Policy</a>
        </ul>
      </div>
      <div className="support">
        <h1>Support</h1>
        <ul>
            <a href=''>Help Center</a>
            <a href=''>Safety Guidelines</a>
            <a href=''>Contact Us</a>
            <a href=''>How to Sell</a>
            <a href=''>How to Buy</a>
        </ul>
      </div>
      <div className="quick-links">
        <h1>Quick Links</h1>
        <ul>
            <a href=''>Classifieds</a>
            <a href=''>Motors</a>
            <a href=''>Property for Rent</a>
            <a href=''>Property for Sale</a>
            <a href=''>Jobs</a>
            <a href=''>Community</a>
        </ul>
      </div>
    </div>
  )
}

export default Footer
