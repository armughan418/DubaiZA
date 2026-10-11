import "./Card.css";
import {
  Bookmark,
  Calendar,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const Card = (props) => {
  const openListing = () =>
    props.onOpenListing?.({
      id: props.id,
      image: props.image,
      tag: props.tag,
      postedTime: props.postedTime,
      title: props.title,
      detail: props.detail,
      year: props.year,
      location: props.location,
      price: props.price,
      priceUnit: props.priceUnit,
      badge: props.badge,
      description: props.description,
    });
  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openListing();
    }
  };

  return (
    <article
      className="card"
      role="link"
      tabIndex={0}
      aria-label={`View ${props.title}`}
      onClick={openListing}
      onKeyDown={handleKeyDown}
    >
      <div className="card-top">
        <img src={props.image} alt={props.title} loading="lazy" />
        <span className="listing-badge">{props.badge || props.tag}</span>
        <button
          className={`save-listing ${props.saved ? "is-saved" : ""}`}
          type="button"
          aria-label={props.saved ? "Remove saved listing" : "Save listing"}
          title={props.saved ? "Remove saved listing" : "Save listing"}
          onClick={(event) => {
            event.stopPropagation();
            props.onToggleSave?.(props.id);
          }}
        >
          <Bookmark size={17} fill={props.saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="card-text">
        <div className="card-tag">
          <span>{props.tag}</span>
          <p>
            <Clock3 size={10} />
            {props.postedTime}
          </p>
        </div>
        <h2>{props.title}</h2>
        <div className="card-labels">
          <div className="date-box">
            <span>
              {props.detail || (
                <>
                  <Calendar size={10} />
                  {props.year}
                </>
              )}
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
            <p>{props.priceUnit || "AED"}</p>
            <strong>{props.price}</strong>
          </div>
          <div className="card-actions">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                props.onContact?.("call", props);
              }}
              aria-label="Call seller"
              title="Call seller"
            >
              <Phone size={15} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                props.onContact?.("chat", props);
              }}
              aria-label="Chat with seller"
              title="Chat with seller"
            >
              <MessageCircle size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
