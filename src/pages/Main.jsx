import Hero from "../components/Hero/Hero";
import Marketplace from "./Marketplace";
const Main = ({
  searchTerm,
  category,
  city,
  onQueryChange,
  onCityChange,
  postedListings,
  savedListings,
  setCategory,
  onSearch,
  onToggleSave,
  onContact,
  onBrowseCategory,
  onOpenListing,
}) => {
  return (
    <div>
      <Hero
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        city={city}
        onQueryChange={onQueryChange}
        onCityChange={onCityChange}
        onSearch={onSearch}
      />
      <Marketplace
        searchTerm={searchTerm}
        category={category}
        city={city}
        postedListings={postedListings}
        savedListings={savedListings}
        onToggleSave={onToggleSave}
        onContact={onContact}
        onBrowseCategory={onBrowseCategory}
        onOpenListing={onOpenListing}
      />
    </div>
  );
};

export default Main;
