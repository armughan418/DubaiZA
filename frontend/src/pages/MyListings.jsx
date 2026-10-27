import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../lib/api";
import "./MyListings.css";

const categories = [
  "Motors",
  "Property",
  "Jobs",
  "Electronics",
  "Furniture & Garden",
  "Mobile Phones",
  "Services",
  "Classifieds",
  "Community",
];

const MyListings = ({ currentUser, onLogin, onListingChange, onProfileChange }) => {
  const [listings, setListings] = useState([]);
  const [profile, setProfile] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const userId = currentUser?.id;

  useEffect(() => {
    if (!userId) return undefined;

    let active = true;
    apiRequest("/posts/mine")
      .then(({ posts }) => {
        if (active) setListings(posts);
      })
      .catch((fetchError) => {
        if (active) setError(fetchError.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [userId]);

  const saveProfile = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsSaving(true);
    try {
      const { user } = await apiRequest("/auth/me", {
        method: "PATCH",
        body: { fullName: profile.name.trim(), email: profile.email.trim() },
      });
      setProfile({ name: user.name, email: user.email });
      onProfileChange(user);
      setNotice("Your profile has been updated.");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const startEditing = (listing) => {
    setEditingId(listing.id);
    setEditValues({
      title: listing.title,
      description: listing.description,
      category: listing.category,
      location: listing.location,
      price: listing.price.replace(/,/g, ""),
      priceUnit: listing.priceUnit || "AED",
    });
    setError("");
    setNotice("");
  };

  const saveListing = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsSaving(true);
    try {
      const { post } = await apiRequest(`/posts/${editingId}`, {
        method: "PUT",
        body: {
          ...editValues,
          price: Number(editValues.price),
        },
      });
      setListings((items) => items.map((item) => (item.id === post.id ? post : item)));
      onListingChange(post);
      setEditingId(null);
      setEditValues(null);
      setNotice("Your listing has been updated.");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteListing = async (listing) => {
    if (!window.confirm(`Delete "${listing.title}"? This cannot be undone.`)) return;
    setError("");
    setNotice("");
    try {
      await apiRequest(`/posts/${listing.id}`, { method: "DELETE" });
      setListings((items) => items.filter((item) => item.id !== listing.id));
      onListingChange(null, listing.id);
      setNotice("Your listing has been deleted.");
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  if (!currentUser) {
    return (
      <main className="my-listings-page">
        <section className="my-listings-empty">
          <h1>Your DubaiZA account</h1>
          <p>Sign in to view your profile and manage your listings.</p>
          <button type="button" onClick={onLogin}>Log in</button>
        </section>
      </main>
    );
  }

  return (
    <main className="my-listings-page">
      <div className="my-listings-container">
        <nav className="my-listings-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <strong>My account</strong>
        </nav>
        <header className="my-listings-heading">
          <div>
            <p>SELLER DASHBOARD</p>
            <h1>My account</h1>
            <span>Manage your profile and the ads you have posted.</span>
          </div>
          <Link to="/post-ad">Post a new ad</Link>
        </header>

        {error && <p className="my-listings-message is-error" role="alert">{error}</p>}
        {notice && <p className="my-listings-message is-success" role="status">{notice}</p>}

        <section className="account-profile-card">
          <div className="account-section-heading">
            <div>
              <h2>Profile information</h2>
              <p>Keep your account contact details up to date.</p>
            </div>
          </div>
          <form className="account-profile-form" onSubmit={saveProfile}>
            <label>
              Full name
              <input
                maxLength={80}
                minLength={2}
                onChange={(event) =>
                  setProfile((value) => ({ ...value, name: event.target.value }))
                }
                required
                value={profile.name}
              />
            </label>
            <label>
              Email address
              <input
                onChange={(event) =>
                  setProfile((value) => ({ ...value, email: event.target.value }))
                }
                required
                type="email"
                value={profile.email}
              />
            </label>
            <button disabled={isSaving} type="submit">
              {isSaving ? "Saving..." : "Save profile"}
            </button>
          </form>
        </section>

        <section className="account-listings-section">
          <div className="account-section-heading">
            <div>
              <h2>Your ads <span>{listings.length}</span></h2>
              <p>
                {listings.length === 1
                  ? "You have posted 1 ad."
                  : `You have posted ${listings.length} ads.`}
              </p>
            </div>
          </div>
          {isLoading ? (
            <p className="account-listings-state">Loading your ads...</p>
          ) : listings.length === 0 ? (
            <div className="account-listings-state">
              <p>You have not posted any ads yet.</p>
              <Link to="/post-ad">Create your first ad</Link>
            </div>
          ) : (
            <div className="account-listings-grid">
              {listings.map((listing) => (
                <article className="account-listing-card" key={listing.id}>
                  <Link
                    className="account-listing-image"
                    to={`/listing/${listing.id}`}
                    onClick={() =>
                      sessionStorage.setItem(
                        `dubaiza-listing-${listing.id}`,
                        JSON.stringify(listing),
                      )
                    }
                  >
                    <img src={listing.image} alt="" />
                  </Link>
                  <div className="account-listing-content">
                    <span className="account-listing-category">{listing.tag}</span>
                    <Link
                      className="account-listing-title"
                      to={`/listing/${listing.id}`}
                      onClick={() =>
                        sessionStorage.setItem(
                          `dubaiza-listing-${listing.id}`,
                          JSON.stringify(listing),
                        )
                      }
                    >
                      {listing.title}
                    </Link>
                    <p className="account-listing-meta">{listing.location}</p>
                    <strong className="account-listing-price">
                      {listing.priceUnit || "AED"} {listing.price}
                    </strong>
                    <div className="account-listing-actions">
                      <button type="button" onClick={() => startEditing(listing)}>
                        Edit ad
                      </button>
                      <button
                        className="is-delete"
                        type="button"
                        onClick={() => deleteListing(listing)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {editingId && editValues && (
        <div className="listing-edit-overlay">
          <form className="listing-edit-dialog" onSubmit={saveListing}>
            <div className="listing-edit-heading">
              <div>
                <p>YOUR AD</p>
                <h2>Edit listing</h2>
              </div>
              <button
                aria-label="Close edit form"
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setEditValues(null);
                }}
              >
                ×
              </button>
            </div>
            <label>
              Listing title
              <input
                maxLength={90}
                onChange={(event) =>
                  setEditValues((value) => ({ ...value, title: event.target.value }))
                }
                required
                value={editValues.title}
              />
            </label>
            <label>
              Description
              <textarea
                maxLength={2000}
                onChange={(event) =>
                  setEditValues((value) => ({
                    ...value,
                    description: event.target.value,
                  }))
                }
                required
                rows={5}
                value={editValues.description}
              />
            </label>
            <div className="listing-edit-row">
              <label>
                Category
                <select
                  onChange={(event) =>
                    setEditValues((value) => ({ ...value, category: event.target.value }))
                  }
                  value={editValues.category}
                >
                  {categories.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
              <label>
                Location
                <input
                  onChange={(event) =>
                    setEditValues((value) => ({ ...value, location: event.target.value }))
                  }
                  required
                  value={editValues.location}
                />
              </label>
            </div>
            <div className="listing-edit-row">
              <label>
                Price (AED)
                <input
                  min="0"
                  onChange={(event) =>
                    setEditValues((value) => ({ ...value, price: event.target.value }))
                  }
                  required
                  type="number"
                  value={editValues.price}
                />
              </label>
              <label>
                Price period
                <select
                  onChange={(event) =>
                    setEditValues((value) => ({
                      ...value,
                      priceUnit: event.target.value,
                    }))
                  }
                  value={editValues.priceUnit}
                >
                  <option value="AED">One-time</option>
                  <option value="AED/yr">Per year</option>
                  <option value="AED/mo">Per month</option>
                  <option value="AED/hr">Per hour</option>
                </select>
              </label>
            </div>
            <div className="listing-edit-actions">
              <button
                className="listing-edit-cancel"
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setEditValues(null);
                }}
              >
                Cancel
              </button>
              <button disabled={isSaving} type="submit">
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default MyListings;
