import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  PhoneOff,
  Send,
  Share2,
  ShieldCheck,
  Tag,
  X,
} from "lucide-react";
import Card from "../components/Card/Card";
import "./ProductDetail.css";

const categoryFacts = {
  Motors: [
    "Category",
    "Vehicle details",
    "Availability",
    "Location",
    "Posted",
    "Seller",
  ],
  "Real Estate": [
    "Category",
    "Property details",
    "Availability",
    "Location",
    "Posted",
    "Seller",
  ],
  Electronics: [
    "Category",
    "Item details",
    "Availability",
    "Location",
    "Posted",
    "Seller",
  ],
  "Mobile Phones": [
    "Category",
    "Phone details",
    "Availability",
    "Location",
    "Posted",
    "Seller",
  ],
  Jobs: [
    "Category",
    "Employment details",
    "Availability",
    "Location",
    "Posted",
    "Employer",
  ],
  "Furniture & Garden": [
    "Category",
    "Item details",
    "Availability",
    "Location",
    "Posted",
    "Seller",
  ],
  Services: [
    "Category",
    "Service details",
    "Availability",
    "Location",
    "Posted",
    "Provider",
  ],
};

const getCachedListing = (listingId) => {
  try {
    const cached = sessionStorage.getItem(`dubaiza-listing-${listingId}`);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const ProductDetail = ({
  listings,
  savedListings,
  onToggleSave,
  onOpenListing,
}) => {
  const { listingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "seller",
      text: "Hello, thanks for your interest in this listing.",
      time: "10:42 AM",
    },
    {
      id: 2,
      from: "you",
      text: "Hi, is this still available?",
      time: "10:44 AM",
    },
    {
      id: 3,
      from: "seller",
      text: "Yes, it is available. Would you like to arrange a viewing?",
      time: "10:45 AM",
    },
  ]);
  const listing =
    listings.find((item) => String(item.id) === listingId) ||
    (String(location.state?.listing?.id) === listingId
      ? location.state.listing
      : null) ||
    getCachedListing(listingId);

  useEffect(() => {
    if (!listing) toast.error("This listing could not be found.");
  }, [listing]);

  if (!listing) {
    return null;
  }

  const listingImages =
    listing.images?.length > 0 ? listing.images : [listing.image];
  const listingSpecifications = Object.entries(listing.specifications || {});
  const sellerName =
    listing.contact?.name ||
    (listing.tag === "Real Estate" ? "Property Partner" : "DubaiZA Seller");
  const contactMethods = listing.contact?.methods?.length
    ? listing.contact.methods
    : ["Chat", "Phone"];
  const sellerPhone = listing.contact?.phone || "+971 50 123 4567";
  const sellerPhoneHref = `tel:${sellerPhone.replace(/[^\d+]/g, "")}`;
  const sellerWhatsAppHref = `https://wa.me/${sellerPhone.replace(/\D/g, "")}`;
  const facts = categoryFacts[listing.tag] || [
    "Category",
    "Details",
    "Availability",
    "Location",
    "Posted",
    "Seller",
  ];
  const related = listings
    .filter((item) => item.id !== listing.id && item.tag === listing.tag)
    .slice(0, 3);
  const shareListing = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  const sendMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((items) => [
      ...items,
      { id: Date.now(), from: "you", text, time: "Just now" },
    ]);
    setDraft("");
    window.setTimeout(() => {
      setMessages((items) => [
        ...items,
        {
          id: Date.now() + 1,
          from: "seller",
          text: "That sounds good! Let me know if you need anything else.",
          time: "Just now",
        },
      ]);
    }, 450);
  };

  return (
    <>
      <main className="product-detail-page">
        <div className="product-detail-container">
          <nav className="product-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <button onClick={() => navigate("/")}>{listing.tag}</button>
            <ChevronRight size={14} />
            <span>{listing.title}</span>
          </nav>
          <div className="product-detail-toolbar">
            <button
              className="detail-back"
              type="button"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={17} />
              Back to listings
            </button>
            <div>
              <button
                type="button"
                onClick={shareListing}
                aria-label="Share listing"
              >
                <Share2 size={17} />
                {copied ? "Link copied" : "Share"}
              </button>
              <button
                type="button"
                onClick={() => onToggleSave(listing.id)}
                aria-label={
                  savedListings.includes(listing.id)
                    ? "Remove from saved"
                    : "Save listing"
                }
              >
                <Bookmark
                  size={17}
                  fill={
                    savedListings.includes(listing.id) ? "currentColor" : "none"
                  }
                />
                {savedListings.includes(listing.id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          <section className="product-detail-layout">
            <div className="product-detail-main">
              <div className="product-gallery">
                <img
                  className="product-main-image"
                  src={listingImages[activeImageIndex]}
                  alt={listing.title}
                />
                <span className="gallery-count">
                  {activeImageIndex + 1} / {listingImages.length} photos
                </span>
                {listing.badge && (
                  <span className="detail-badge">{listing.badge}</span>
                )}
              </div>
              {listingImages.length > 1 && (
                <div className="product-gallery-thumbnails" aria-label="Listing photos">
                  {listingImages.map((image, index) => (
                    <button
                      className={index === activeImageIndex ? "is-active" : ""}
                      key={`${image}-${index}`}
                      type="button"
                      aria-label={`Show photo ${index + 1}`}
                      aria-pressed={index === activeImageIndex}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img src={image} alt="" />
                    </button>
                  ))}
                </div>
              )}
              <article className="product-information">
                <div className="product-category-line">
                  <span>{listing.tag}</span>
                  <span>
                    <Clock3 size={14} />
                    Posted {listing.postedTime}
                  </span>
                </div>
                <h1>{listing.title}</h1>
                <p className="product-location">
                  <MapPin size={17} />
                  {listing.location}, UAE
                </p>
                <div className="product-price">
                  <span>{listing.priceUnit || "AED"}</span>
                  <strong>{listing.price}</strong>
                </div>
                <div className="product-highlights">
                  <div>
                    <Tag size={17} />
                    <span>{listing.detail || listing.tag}</span>
                  </div>
                  <div>
                    <CalendarDays size={17} />
                    <span>{listing.year || "Listed this week"}</span>
                  </div>
                  <div>
                    <ShieldCheck size={17} />
                    <span>DubaiZA listing</span>
                  </div>
                </div>
                <section className="product-description">
                  <h2>Description</h2>
                  <p>
                    {listing.description ||
                      `${listing.title}. ${listing.detail || "Quality item"} available in ${listing.location}. Contact the seller for more information, photos, or to arrange a viewing.`}
                  </p>
                </section>
                <section className="product-specifications">
                  <h2>Ad details</h2>
                  <dl>
                    {listingSpecifications.length > 0
                      ? listingSpecifications.map(([label, value]) => (
                          <div key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))
                      : facts.map((fact, index) => (
                          <div key={fact}>
                            <dt>{fact}</dt>
                            <dd>
                              {
                                [
                                  listing.tag,
                                  listing.detail || "See description",
                                  "Available now",
                                  listing.location,
                                  listing.postedTime,
                                  "Private seller",
                                ][index]
                              }
                            </dd>
                          </div>
                        ))}
                  </dl>
                </section>
                <div className="product-safety-note">
                  <ShieldCheck size={19} />
                  <p>
                    <strong>Stay safe</strong>
                    <br />
                    Meet in a public place and check the item before you pay.
                  </p>
                </div>
              </article>
            </div>

            <aside className="seller-panel">
              <div className="seller-price">
                <span>{listing.priceUnit || "AED"}</span>
                <strong>{listing.price}</strong>
              </div>
              <div className="seller-identity">
                <div className="seller-avatar">
                  {sellerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2>{sellerName}</h2>
                  <p>
                    <Check size={13} />
                    Member since 2024
                  </p>
                </div>
              </div>
              {contactMethods.includes("Chat") && (
                <button
                  className="seller-contact-primary"
                  onClick={() => setChatOpen(true)}
                >
                  <MessageCircle size={18} />
                  Chat with seller
                </button>
              )}
              {contactMethods.includes("WhatsApp") && (
                <a
                  className="seller-contact-secondary"
                  href={sellerWhatsAppHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle size={17} />
                  WhatsApp seller
                </a>
              )}
              {contactMethods.includes("Phone") && (
                <button
                  className="seller-contact-secondary"
                  onClick={() => {
                    setIsCalling(false);
                    setCallOpen(true);
                  }}
                >
                  <Phone size={17} />
                  Show phone number
                </button>
              )}
              <div className="seller-response">
                <span className="seller-online-dot" />
                Usually responds within a few hours
              </div>
              <button
                className="seller-report"
                type="button"
                onClick={() =>
                  toast.success("Thanks. This listing has been flagged for review.")
                }
              >
                Report this ad
              </button>
            </aside>
          </section>

          {related.length > 0 && (
            <section className="related-listings">
              <div className="related-heading">
                <div>
                  <span>MORE TO EXPLORE</span>
                  <h2>Similar listings</h2>
                </div>
                <button onClick={() => navigate("/")} type="button">
                  Browse all <ArrowRight size={16} />
                </button>
              </div>
              <div className="related-grid">
                {related.map((item) => (
                  <Card
                    key={item.id}
                    {...item}
                    saved={savedListings.includes(item.id)}
                    onToggleSave={onToggleSave}
                    onContact={() => setChatOpen(true)}
                    onOpenListing={onOpenListing}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      {chatOpen && (
        <div
          className="contact-overlay"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setChatOpen(false)
          }
        >
          <section
            className="seller-chat"
            role="dialog"
            aria-modal="true"
            aria-labelledby="seller-chat-title"
          >
            <header className="seller-chat-header">
              <div className="seller-chat-avatar">
                {sellerName.charAt(0).toUpperCase()}
              </div>
              <div className="seller-chat-heading">
                <h2 id="seller-chat-title">
                  {sellerName}
                </h2>
                <p>
                  <span />
                  Online now
                </p>
              </div>
              <button
                className="contact-close"
                type="button"
                aria-label="Close chat"
                onClick={() => setChatOpen(false)}
              >
                <X size={19} />
              </button>
            </header>
            <div className="chat-listing-context">
              <img src={listing.image} alt="" />
              <div>
                <span>About this listing</span>
                <strong>{listing.title}</strong>
                <b>
                  {listing.priceUnit || "AED"} {listing.price}
                </b>
              </div>
            </div>
            <div className="chat-messages" aria-live="polite">
              <p className="chat-date-label">TODAY</p>
              {messages.map((message) => (
                <div
                  className={`chat-message-row ${message.from === "you" ? "from-you" : "from-seller"}`}
                  key={message.id}
                >
                  <p>
                    {message.text}
                    <span>{message.time}</span>
                  </p>
                </div>
              ))}
            </div>
            <form className="chat-composer" onSubmit={sendMessage}>
              <input
                aria-label="Write a message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Write a message..."
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!draft.trim()}
              >
                <Send size={18} />
              </button>
            </form>
            <p className="chat-demo-note">
              Demo chat · Messages are cleared when you reload
            </p>
          </section>
        </div>
      )}
      {callOpen && (
        <div
          className="contact-overlay"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setCallOpen(false)
          }
        >
          <section
            className="seller-call-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="seller-call-title"
          >
            <button
              className="contact-close call-close"
              type="button"
              aria-label="Close call panel"
              onClick={() => {
                setCallOpen(false);
                setIsCalling(false);
              }}
            >
              <X size={19} />
            </button>
            <div className={`call-avatar ${isCalling ? "is-calling" : ""}`}>
              <PhoneCall size={25} />
            </div>
            <h2 id="seller-call-title">
              {isCalling ? "Calling seller..." : "Call the seller"}
            </h2>
            <p className="call-seller-name">
              {sellerName}
            </p>
            <a className="seller-phone-number" href={sellerPhoneHref}>
              {sellerPhone}
            </a>
            <p className="call-demo-note">
              Demo call · No call is placed from this page
            </p>
            {isCalling ? (
              <button
                className="end-demo-call"
                type="button"
                onClick={() => {
                  setIsCalling(false);
                  setCallOpen(false);
                }}
              >
                <PhoneOff size={18} />
                End call
              </button>
            ) : (
              <a
                className="start-demo-call"
                href={sellerPhoneHref}
                onClick={(event) => {
                  event.preventDefault();
                  setIsCalling(true);
                }}
              >
                <PhoneCall size={18} />
                Start call
              </a>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
