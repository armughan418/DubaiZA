import React from 'react'
import "./Card.css";
import {Clock3} from 'lucide-react'
import {Calendar} from 'lucide-react'
import {MapPin} from 'lucide-react'

const Card = (props) => {
  return (
    <div className='card'>
      <div className="card-top">
        <img src={props.image}></img>
      </div>
      <div className="card-text">
        <div className="card-tag">
            <span>{props.tag}</span>
            <p><Clock3 size={10} />{props.postedTime}</p>
        </div>
        <h1>{props.title}</h1>
        <div className="card-labels">
            <div className="date-box">
                <span><Calendar size={10} />{props.year}</span>
            </div>
            <div className="location-box">
                <span><MapPin size={13}/>{props.location}</span>
            </div>
        </div>
        <div className="card-bottom">
            <div className="price-box">
                <p>AED</p>
                <h1>{props.price}</h1>
            </div>
            <div className="pin-box">
                <span><MapPin size={14} />{props.location}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Card
