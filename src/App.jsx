import { useState } from "react";
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
import { listings as sampleListings } from "./pages/marketplaceData";
import { Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const openListing = (listingOrId) => {
    const listing =
      typeof listingOrId === "object"
        ? listingOrId
        : allListings.find((item) => String(item.id) === String(listingOrId));
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
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All Cities");
  const [showPostAd, setShowPostAd] = useState(false);
  const [postedListings, setPostedListings] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const authenticateUser = (user) => {
    setCurrentUser(user);
    setLogin(false);
    setRegister(false);
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
  const publishListing = (listing) => {
    setPostedListings((items) => [listing, ...items]);
    setCategory("All");
    handleSearch("", "All Cities");
    setShowPostAd(false);
  };
  const allListings = [...postedListings, ...sampleListings];
  return (
    <>
      <Navbar
        setLogin={setLogin}
        setRegister={setRegister}
        onPostAd={() => setShowPostAd(true)}
        onCategorySelect={handleCategorySelect}
        category={category}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />
      <Routes>
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
      <Subscribe />
      <Footer />
      {showLogin && (
        <Login setLogin={setLogin} onAuthenticate={authenticateUser} />
      )}
      {showRegister && (
        <Register setRegister={setRegister} onAuthenticate={authenticateUser} />
      )}
      {showPostAd && (
        <PostAdModal
          onClose={() => setShowPostAd(false)}
          onPublish={publishListing}
        />
      )}
    </>
  );
};

export default App;
