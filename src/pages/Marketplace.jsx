import Card from "../components/Card/Card";
import {
  ArrowRight,
  Building2,
  BriefcaseBusiness,
  CarFront,
  FileText,
  PlusCircle,
  Search,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";
import teslaImage from "../assets/tesla.avif";
import houseImage from "../assets/house.avif";
import { listings } from "./marketplaceData";
import "./Marketplace.css";

const matchesCategory = (item, category) => {
  if (category === "All") return true;
  if (category === "Property") return item.tag === "Real Estate";
  if (category === "Classifieds")
    return ["Electronics", "Furniture & Garden", "Services", "Pets"].includes(
      item.tag,
    );
  if (category === "Community") return ["Services", "Pets"].includes(item.tag);
  return item.tag.toLowerCase().includes(category.toLowerCase());
};

const ListingSection = ({
  title,
  icon: Icon,
  items,
  category,
  savedListings,
  onToggleSave,
  onContact,
  onBrowseCategory,
  onOpenListing,
}) => (
  <section className="market-section">
    <div className="market-section-heading">
      <div className="market-heading-title">
        {Icon && (
          <span className="market-heading-icon">
            <Icon size={20} />
          </span>
        )}
        <h2>{title}</h2>
      </div>
      <button
        className="market-view-all"
        onClick={() => onBrowseCategory(category)}
        type="button"
      >
        View All <ArrowRight size={16} />
      </button>
    </div>
    <div className="market-grid">
      {items.map((item) => (
        <Card
          key={item.id}
          {...item}
          saved={savedListings.includes(item.id)}
          onToggleSave={onToggleSave}
          onContact={onContact}
          onOpenListing={onOpenListing}
        />
      ))}
    </div>
  </section>
);

const Marketplace = ({
  searchTerm,
  category,
  city,
  postedListings,
  savedListings,
  onToggleSave,
  onContact,
  onBrowseCategory,
  onPostAd,
  onOpenListing,
}) => {
  const allListings = [...postedListings, ...listings];
  const results = allListings.filter(
    (item) =>
      matchesCategory(item, category) &&
      `${item.title} ${item.tag} ${item.location}`
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase()) &&
      (city === "All Cities" ||
        item.location.toLowerCase().includes(city.toLowerCase())),
  );
  const hasFilters =
    Boolean(searchTerm.trim()) || category !== "All" || city !== "All Cities";
  const cardActions = {
    savedListings,
    onToggleSave,
    onContact,
    onBrowseCategory,
    onOpenListing,
  };

  if (hasFilters)
    return (
      <main className="marketplace">
        <ListingSection
          title={`Results (${results.length})`}
          icon={SearchIcon}
          items={results}
          category={category}
          {...cardActions}
        />
        {results.length === 0 && (
          <p className="market-empty">
            No matching listings. Try a different keyword, category, or city.
          </p>
        )}
      </main>
    );

  const byIds = (...ids) => allListings.filter((item) => ids.includes(item.id));
  return (
    <main className="marketplace">
      <ListingSection
        title="Trending Today"
        icon={TrendingUp}
        items={byIds(1, 2, 3, 4)}
        category="All"
        {...cardActions}
      />
      <ListingSection
        title="New Projects Launching"
        icon={Building2}
        items={byIds(5, 6)}
        category="Property"
        {...cardActions}
      />
      <section className="career-band">
        <div className="career-copy">
          <div className="career-copy-content">
            <span className="career-kicker">
              <BriefcaseBusiness size={12} />
              Job Seekers
            </span>
            <h2>Find your dream job</h2>
            <p>
              Browse thousands of job vacancies from top companies in the UAE.
            </p>
            <div className="career-actions">
              <button
                className="career-primary career-jobs-primary"
                type="button"
                onClick={() => onBrowseCategory("Jobs")}
              >
                <Search size={17} />
                Browse Jobs
              </button>
              <button
                className="career-secondary"
                type="button"
                onClick={() => onBrowseCategory("Jobs")}
              >
                <FileText size={17} />
                Upload CV
              </button>
            </div>
          </div>
          <BriefcaseBusiness
            className="career-decoration career-jobs-decoration"
            aria-hidden="true"
          />
        </div>
        <div className="career-copy career-employers">
          <div className="career-copy-content">
            <span className="career-kicker">
              <BriefcaseBusiness size={12} />
              Employers
            </span>
            <h2>Hire the best talent</h2>
            <p>
              Post job openings and find the perfect candidate for your company.
            </p>
            <div className="career-actions">
              <button
                className="career-primary career-hire-primary"
                type="button"
                onClick={onPostAd}
              >
                <PlusCircle size={17} />
                Post a Job
              </button>
              <button
                className="career-secondary"
                type="button"
                onClick={() => onBrowseCategory("Jobs")}
              >
                <Search size={17} />
                Search CVs
              </button>
            </div>
          </div>
          <UserRoundCheck
            className="career-decoration career-employer-decoration"
            aria-hidden="true"
          />
        </div>
      </section>
      <ListingSection
        title="Top Motors"
        icon={CarFront}
        items={byIds(7, 8, 9, 10)}
        category="Motors"
        {...cardActions}
      />
      <section className="spotlight-band">
        <span className="spotlight-icon">
          <Sparkles size={22} />
        </span>
        <div>
          <span className="career-kicker">New feature</span>
          <h2>Sell your items faster with Spotlight</h2>
          <p>Boost your ads to the top of the list and get more views.</p>
        </div>
        <button type="button" onClick={onPostAd}>
          Try Spotlight <ArrowRight size={16} />
        </button>
      </section>
      <ListingSection
        title="Premium Properties"
        icon={Building2}
        items={byIds(11, 12, 13, 14)}
        category="Property"
        {...cardActions}
      />
      <ListingSection
        title="Fresh Recommendations"
        icon={Sparkles}
        items={byIds(15, 16, 17, 18, ...postedListings.map((item) => item.id))}
        category="Classifieds"
        {...cardActions}
      />
      <section className="app-promo">
        <div className="app-promo-copy">
          <span className="career-kicker">DubaiZA on mobile</span>
          <h2>Get the full DubaiZA experience</h2>
          <p>
            Browse faster, get chat alerts, and find exclusive deals in the app.
          </p>
          <div className="app-store-buttons">
            <a href="https://apps.apple.com/" target="_blank" rel="noreferrer">
              Download on the <strong>App Store</strong>
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
            >
              Get it on <strong>Google Play</strong>
            </a>
          </div>
        </div>
        <div className="app-promo-art" aria-hidden="true">
          <div className="phone-frame">
            <div className="phone-topline" />
            <div className="phone-logo">
              D<span>ZA</span>
            </div>
            <div className="phone-search" />
            <div className="phone-listing">
              <img src={teslaImage} alt="" />
              <span>
                <b>Dubai finds</b>
                <small>Cars, homes and more</small>
              </span>
            </div>
            <div className="phone-listing">
              <img src={houseImage} alt="" />
              <span>
                <b>New today</b>
                <small>Discover nearby</small>
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const SearchIcon = ({ size = 20 }) => <Search size={size} />;

export default Marketplace;
