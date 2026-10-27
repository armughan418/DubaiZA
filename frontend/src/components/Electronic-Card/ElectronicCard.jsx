import "./ElectronicCard.css";
import { Clock3 } from "lucide-react";
import { Calendar } from "lucide-react";
import { MapPin } from "lucide-react";

const ElectronicCard = (props) => {
  const openListing = () =>
    props.onOpenListing?.({
      id: props.listingId,
      image: props.image,
      tag: props.tag,
      postedTime: props.postedTime,
      title: props.title,
      year: props.year,
      detail: props.year,
      location: props.location,
      price: props.price,
    });

  return (
    <article
      className="card"
      role="link"
      tabIndex={0}
      aria-label={`View ${props.title}`}
      onClick={openListing}
      onKeyDown={(event) => {
        if (
          event.target === event.currentTarget &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          openListing();
        }
      }}
    >
      <div className="card-top">
        <img src={props.image}></img>
      </div>
      <div className="card-text">
        <div className="card-tag">
          <span>{props.tag}</span>
          <p>
            <Clock3 size={10} />
            {props.postedTime}
          </p>
        </div>
        <h1>{props.title}</h1>
        <div className="card-labels">
          <div className="date-box">
            <span>
              <Calendar size={10} />
              {props.year}
            </span>
          </div>
          <div className="location-box">
            <span>
              <MapPin size={13} />
              {props.location}
            </span>
          </div>
        </div>
        <div className="card-bottom">
          <div className="price-box">
            <p>AED</p>
            <h1>{props.price}</h1>
          </div>
          <div className="pin-box">
            <span>
              <MapPin size={14} />
              {props.location}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ElectronicCard;
