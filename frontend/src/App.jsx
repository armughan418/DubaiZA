import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./pages/Main";
import Subscribe from "./components/Subscribe/Subscribe";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PostAdModal from "./components/PostAdModal/PostAdModal";
import Electronics from "./pages/Electronics";
import FurGar from "./pages/FurGar";
import ProductDetail from "./pages/ProductDetail";
import MyListings from "./pages/MyListings";
import { listings as sampleListings } from "./pages/marketplaceData";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "./lib/api";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [appError, setAppError] = useState("");
  const [postedListings, setPostedListings] = useState([]);
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All Cities");
  const [savedListings, setSavedListings] = useState([]);

  useEffect(() => {
    let active = true;
    Promise.all([apiRequest("/posts"), apiRequest("/auth/me").catch((error) => {
      if (error.status !== 401) throw error;
      return null;
    })])
      .then(([{ posts }, session]) => {
        if (!active) return;
        setPostedListings(posts);
        if (session) setCurrentUser(session.user);
      })
      .catch((error) => {
        if (active) setAppError(`Could not connect to DubaiZA: ${error.message}`);
      });
    return () => {
      active = false;
    };
  }, []);

  const openListing = (listingOrId) => {
    const existingListing = allListings.find(
      (item) =>
        String(item.id) ===
        String(typeof listingOrId === "object" ? listingOrId.id : listingOrId),
    );
    const listing =
      typeof listingOrId === "object"
        ? { ...existingListing, ...listingOrId }
        : existingListing;
    if (listing) {
      sessionStorage.setItem(
        `dubaiza-listing-${listing.id}`,
        JSON.stringify(listing),
      );
      navigate(`/listing/${encodeURIComponent(listing.id)}`, {
        state: { listing },
      });
    }
  };
  const authenticateUser = ({ user }) => {
    setCurrentUser(user);
    setAppError("");
    setLogin(false);
    setRegister(false);
  };
  const logout = async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST" });
    } catch (error) {
      setAppError(`Could not sign out: ${error.message}`);
    } finally {
      setCurrentUser(null);
    }
  };
  const toggleSavedListing = (id) => {
    setSavedListings((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  };
  const handleSearch = (term, selectedCity) => {
    setSearchTerm(term);
    setCity(selectedCity);
  };
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    if (selectedCategory === "All") handleSearch("", "All Cities");
  };
  const publishListing = async (listing) => {
    const { post } = await apiRequest("/posts", {
      method: "POST",
      body: listing,
    });
    setPostedListings((items) => [
      post,
      ...items.filter((item) => item.id !== post.id),
    ]);
    setCategory("All");
    handleSearch("", "All Cities");
    navigate("/");
    return post;
  };
  const allListings = [...postedListings, ...sampleListings];
  return (
    <>
      {appError && (
        <div className="app-error-banner" role="alert">
          <span>{appError}</span>
          <button type="button" onClick={() => setAppError("")}>
            Dismiss
          </button>
        </div>
      )}
      <Navbar
        setLogin={setLogin}
        setRegister={setRegister}
        onPostAd={() => {
          if (!currentUser) {
            setLogin(true);
            return;
          }
          navigate("/post-ad");
        }}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        category={category}
        currentUser={currentUser}
        onLogout={logout}
      />
      <Routes>
        <Route
          path="/post-ad"
          element={
            currentUser ? (
              <PostAdModal currentUser={currentUser} onPublish={publishListing} />
            ) : (
              <main className="account-sign-in-required">
                <h1>Sign in to post an ad</h1>
                <p>Create an account or sign in to publish and manage your listings.</p>
                <button type="button" onClick={() => setLogin(true)}>
                  Log in
                </button>
              </main>
            )
          }
        />
        <Route
          path="/my-listings"
          element={
            <MyListings
              key={currentUser?.id || "guest"}
              currentUser={currentUser}
              onLogin={() => setLogin(true)}
              onListingChange={(post, deletedId) => {
                setPostedListings((items) => {
                  const remaining = deletedId
                    ? items.filter((item) => item.id !== deletedId)
                    : items;
                  return post
                    ? [post, ...remaining.filter((item) => item.id !== post.id)]
                    : remaining;
                });
              }}
              onProfileChange={setCurrentUser}
            />
          }
        />
        <Route
          path="/"
          element={
            <Main
              searchTerm={searchTerm}
              category={category}
              city={city}
              postedListings={postedListings}
              savedListings={savedListings}
              setCategory={handleCategorySelect}
              onQueryChange={setSearchTerm}
              onCityChange={setCity}
              onSearch={handleSearch}
              onToggleSave={toggleSavedListing}
              onContact={() => setLogin(true)}
              onBrowseCategory={handleCategorySelect}
              onOpenListing={openListing}
            />
          }
        />
        <Route
          path="/listing/:listingId"
          element={
            <ProductDetail
              listings={allListings}
              savedListings={savedListings}
              onToggleSave={toggleSavedListing}
              onOpenListing={openListing}
            />
          }
        />
        <Route
          path="/electronics"
          element={<Electronics onOpenListing={openListing} />}
        />
        <Route
          path="/furniture-garden"
          element={<FurGar onOpenListing={openListing} />}
        />
      </Routes>
      {location.pathname !== "/post-ad" && (
        <>
          <Subscribe />
          <Footer />
        </>
      )}
      {showLogin && (
        <Login setLogin={setLogin} onAuthenticate={authenticateUser} />
      )}
      {showRegister && (
        <Register setRegister={setRegister} onAuthenticate={authenticateUser} />
      )}
    </>
  );
};

export default App;
