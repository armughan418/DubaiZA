import "./Hero.css";
import { MapPin, MoveRight, Search } from "lucide-react";

const categories = [
  "All",
  "Motors",
  "Property",
  "Jobs",
  "Classifieds",
  "Community",
];

const Hero = ({
  category,
  setCategory,
  searchTerm,
  city,
  onQueryChange,
  onCityChange,
  onSearch,
}) => {
  const submitSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm.trim(), city);
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-page">
          <div className="hero-text">
            <h1>
              The Marketplace for <span>Everything</span>
            </h1>
            <p>
              Buy, sell, and find anything from cars and homes to jobs and
              services.
            </p>
          </div>
          <div className="input-box">
            <div
              className="hero-categories"
              role="group"
              aria-label="Search category"
            >
              {categories.map((item) => (
                <button
                  className={category === item ? "active" : ""}
                  key={item}
                  onClick={() => setCategory(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <form
              className="search-input"
              id="hero-search"
              onSubmit={submitSearch}
            >
              <label className="hero-query">
                <Search size={19} />
                <input
                  aria-label="Search listings"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => onQueryChange(event.target.value)}
                  placeholder="Search cars, homes, jobs and more..."
                />
              </label>
              <label className="hero-city">
                <MapPin size={18} />
                <select
                  aria-label="City"
                  value={city}
                  onChange={(event) => onCityChange(event.target.value)}
                >
                  <option>All Cities</option>
                  <option>Dubai</option>
                  <option>Abu Dhabi</option>
                  <option>Sharjah</option>
                  <option>Ajman</option>
                </select>
              </label>
              <button type="submit">
                <Search size={18} />
                Search
              </button>
            </form>
            <div className="help-box">
              <span>Not sure what you want? Let AI help.</span>
              <button
                type="button"
                onClick={() => window.alert("AI Assistant is coming soon.")}
              >
                Ask AI Assistant
                <MoveRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
