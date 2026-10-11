import { X } from "lucide-react";
import "./PostAdModal.css";

const PostAdModal = ({ onClose, onPublish }) => {
  const submitAd = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onPublish({
      id: Date.now(),
      title: form.get("title").trim(),
      tag: form.get("category"),
      price: Number(form.get("price")).toLocaleString("en-US"),
      location: form.get("location").trim(),
      postedTime: "Just now",
      year: new Date().getFullYear().toString(),
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
    });
  };

  return (
    <div
      className="post-ad-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="post-ad-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-ad-title"
      >
        <button
          className="post-ad-close"
          aria-label="Close"
          onClick={onClose}
          type="button"
        >
          <X size={20} />
        </button>
        <p className="post-ad-eyebrow">Reach buyers across the UAE</p>
        <h2 id="post-ad-title">Post your ad</h2>
        <p className="post-ad-intro">
          Add the essentials now. You can edit your listing later.
        </p>
        <form onSubmit={submitAd}>
          <label>
            Ad title
            <input
              name="title"
              maxLength="90"
              placeholder="e.g. 2022 Toyota Land Cruiser"
              required
            />
          </label>
          <div className="post-ad-fields">
            <label>
              Category
              <select name="category" defaultValue="Motors">
                <option>Motors</option>
                <option>Real Estate</option>
                <option>Electronics</option>
                <option>Furniture & Garden</option>
                <option>Services</option>
                <option>Pets</option>
              </select>
            </label>
            <label>
              Price (AED)
              <input
                name="price"
                type="number"
                min="0"
                placeholder="0"
                required
              />
            </label>
          </div>
          <label>
            Location
            <input
              name="location"
              placeholder="City or neighbourhood"
              required
            />
          </label>
          <button className="post-ad-submit" type="submit">
            Publish ad
          </button>
        </form>
        <p className="post-ad-note">
          Free to post. Your listing will be visible in recommendations.
        </p>
      </section>
    </div>
  );
};

export default PostAdModal;
