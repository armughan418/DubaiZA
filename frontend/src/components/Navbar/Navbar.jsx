import { useRef, useState } from "react";
import "./Navbar.css";
import "./NavbarMarketplace.css";
import "./NavbarReference.css";
import {
  Bell,
  BriefcaseBusiness,
  CarFront,
  ChevronDown,
  ChevronRight,
  Globe,
  Heart,
  House,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Smartphone,
  Tags,
  UserRound,
  UsersRound,
  Wrench,
  X,
  Building2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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

const mobileCategoryIcons = {
  Motors: CarFront,
  Property: House,
  Jobs: BriefcaseBusiness,
  Electronics: Smartphone,
  "Furniture & Garden": House,
  "Mobile Phones": Smartphone,
  Services: Wrench,
  Classifieds: Tags,
  Community: UsersRound,
};

const megaMenus = {
  Motors: [
    {
      title: "Cars",
      items: ["Toyota", "Mercedes-Benz", "Nissan", "BMW", "Ford", "Land Rover"],
    },
    {
      title: "By type",
      items: [
        "SUVs & 4x4",
        "Sedans",
        "Coupe",
        "Hatchbacks",
        "Convertibles",
        "Electric cars",
      ],
    },
    {
      title: "Motorcycles",
      items: [
        "Sport bikes",
        "Adventure / Touring",
        "Cruiser / Chopper",
        "Off-road",
        "Scooters",
      ],
    },
    {
      title: "Parts & accessories",
      items: [
        "Car parts",
        "Car accessories",
        "Motorcycle parts",
        "Tyres & wheels",
        "Boats & marine",
      ],
    },
    {
      title: "Commercial",
      items: ["Trucks", "Trailers", "Forklifts", "Cranes", "Number plates"],
    },
  ],
  Property: [
    {
      title: "For sale",
      items: ["Residential", "Commercial", "Land", "Multiple units"],
    },
    {
      title: "For rent",
      items: ["Apartments", "Villas & houses", "Rooms", "Commercial"],
    },
    {
      title: "Off-plan",
      items: [
        "New developments",
        "Payment plans",
        "Handover soon",
        "Developers",
      ],
    },
    {
      title: "Short term",
      items: ["Daily stays", "Monthly stays", "Holiday homes"],
    },
  ],
  Jobs: [
    {
      title: "Popular jobs",
      items: [
        "Accounting",
        "Sales",
        "Engineering",
        "Marketing",
        "Customer service",
      ],
    },
    {
      title: "More fields",
      items: [
        "Administration",
        "Construction",
        "Education",
        "Hospitality",
        "Healthcare",
      ],
    },
    {
      title: "Work style",
      items: ["Full time", "Part time", "Remote work", "Internships"],
    },
    {
      title: "Career tools",
      items: ["Browse jobs", "CVs & resumes", "Jobs wanted"],
    },
  ],
  Electronics: [
    {
      title: "Computers",
      items: ["Laptops", "Desktops", "Components", "Networking", "Accessories"],
    },
    {
      title: "TV & video",
      items: [
        "Flat panel TVs",
        "Projectors",
        "Media streamers",
        "Home theatre",
      ],
    },
    {
      title: "Audio",
      items: ["Headphones", "Speakers", "Turntables", "Amplifiers"],
    },
    {
      title: "Smart tech",
      items: ["Smart watches", "Fitness trackers", "Smart home", "Gaming"],
    },
    {
      title: "Other electronics",
      items: ["Cameras", "Printers", "Appliances", "Parts & cables"],
    },
  ],
  "Furniture & Garden": [
    {
      title: "Furniture",
      items: [
        "Sofas",
        "Beds & sets",
        "Wardrobes",
        "Dining tables",
        "Bookcases",
      ],
    },
    {
      title: "Home decor",
      items: ["Lighting", "Rugs & carpets", "Curtains & blinds", "Wall decor"],
    },
    {
      title: "Garden",
      items: ["Garden furniture", "Plants", "Pools & jacuzzis", "Tools"],
    },
    {
      title: "Home supplies",
      items: ["Kitchenware", "Bedding", "Bath accessories", "Storage"],
    },
  ],
  "Mobile Phones": [
    {
      title: "Phones by brand",
      items: ["Apple", "Samsung", "Google", "Huawei", "Xiaomi"],
    },
    {
      title: "Tablets",
      items: [
        "Apple iPad",
        "Samsung tablets",
        "Lenovo tablets",
        "Other tablets",
      ],
    },
    {
      title: "Accessories",
      items: ["Cases", "Screen protectors", "Chargers", "Power banks"],
    },
    {
      title: "More devices",
      items: ["Landlines", "Walkie talkies", "Wearables"],
    },
  ],
  Services: [
    {
      title: "Home services",
      items: [
        "Cleaning",
        "Movers & packers",
        "AC repair",
        "Plumbing",
        "Electrical",
      ],
    },
    {
      title: "Automotive",
      items: [
        "Car repair",
        "Car wash",
        "Tyre services",
        "Breakdown assistance",
      ],
    },
    {
      title: "Personal",
      items: ["Beauty & salon", "Massage & spa", "Personal trainers", "Tutors"],
    },
    {
      title: "Business & events",
      items: [
        "Accounting",
        "Legal services",
        "Web design",
        "Catering",
        "Photography",
      ],
    },
  ],
  Classifieds: [
    {
      title: "Pets",
      items: ["Dogs", "Cats", "Birds", "Fish", "Pet accessories"],
    },
    {
      title: "Business & office",
      items: ["Businesses for sale", "Office furniture", "Industrial supplies"],
    },
    {
      title: "Home & outdoors",
      items: ["Appliances", "Sports & fitness", "Camping", "Cycling"],
    },
    {
      title: "Fashion & family",
      items: ["Clothing", "Jewelry", "Baby & kids", "Toys"],
    },
    {
      title: "Leisure",
      items: ["Books", "Gaming", "Musical instruments", "Tickets"],
    },
  ],
  Community: [
    {
      title: "Home help",
      items: ["Cooks", "Childcare", "Gardeners", "Maids", "Pool maintenance"],
    },
    {
      title: "Lessons",
      items: ["Languages", "Music", "Subject tutors", "Dance", "Arts & crafts"],
    },
    {
      title: "Skilled trades",
      items: ["Handyman", "Carpenters", "Painters", "Fridge repair"],
    },
    {
      title: "Creative & digital",
      items: ["Writers", "Designers", "Developers", "Photographers"],
    },
  ],
};

const Navbar = ({
  setLogin,
  setRegister,
  onPostAd,
  onCategorySelect,
  category = "All",
  currentUser,
  onLogout,
  onSearch,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState(null);
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [mobileLanguage, setMobileLanguage] = useState("English");
  const closeCategoryTimer = useRef(null);
  const navigate = useNavigate();
  const chooseCategory = (item) => {
    onCategorySelect(item);
    navigate("/");
    setMenuOpen(false);
    setOpenCategory(null);
  };
  const closeMenuOnBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget))
      setOpenCategory(null);
  };
  const openCategoryMenu = (item) => {
    clearTimeout(closeCategoryTimer.current);
    setOpenCategory(item);
  };
  const scheduleCategoryClose = () => {
    clearTimeout(closeCategoryTimer.current);
    closeCategoryTimer.current = setTimeout(() => setOpenCategory(null), 320);
  };
  const focusSearch = () => {
    setMenuOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById("hero-search")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 0);
      return;
    }

    const search = document.getElementById("hero-search");
    search?.scrollIntoView({ behavior: "smooth", block: "center" });
    search?.querySelector("input")?.focus({ preventScroll: true });
  };
  const submitMobileSearch = (event) => {
    event.preventDefault();
    onCategorySelect("All");
    onSearch(mobileSearchTerm.trim(), "All Cities");
    navigate("/");
    setMenuOpen(false);
  };
  const openAuth = (showAuth) => {
    setMenuOpen(false);
    showAuth(true);
  };

  return (
    <header className="site-header">
      <div className="utility-nav">
        <div>
          <a href="#about">About DubaiZA</a>
          <a href="#advertising">Advertising</a>
          <a href="#business">Business</a>
        </div>
        <div>
          <button type="button">
            <Globe size={12} /> EN <ChevronDown size={11} />
          </button>
          <button type="button">
            <MapPin size={12} /> UAE <ChevronDown size={11} />
          </button>
        </div>
      </div>
      <div className="navbar">
        <div className="left-nav">
          <Link
            className="brand-link"
            to="/"
            aria-label="DubaiZA home"
            onClick={() => onCategorySelect("All")}
          >
            <div className="logo">
              <p>D</p>
              <h1>
                Dubai<span>ZA</span>
              </h1>
            </div>
          </Link>
        </div>

        <div className="nav-actions">
          <div className="nav-icon-actions">
            <button
              type="button"
              title="Notifications"
              aria-label="Notifications"
              onClick={() => setLogin(true)}
            >
              <Bell size={20} />
              <span>1</span>
            </button>
            <button
              type="button"
              title="Chat"
              aria-label="Chat"
              onClick={() => setLogin(true)}
            >
              <MessageCircle size={20} />
              <span>2</span>
            </button>
            <button
              type="button"
              title="Favorites"
              aria-label="Favorites"
              onClick={() => setLogin(true)}
            >
              <Heart size={21} />
            </button>
          </div>
          <span className="nav-action-divider" />
          {currentUser ? (
            <div className="signed-in-user">
              <span className="signed-in-avatar">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
              <strong>{currentUser.name}</strong>
              <Link className="nav-auth-button nav-account-link" to="/my-listings">
                My ads
              </Link>
              <button className="nav-auth-button" onClick={onLogout}>
                Log out
              </button>
            </div>
          ) : (
            <>
              <button
                className="nav-auth-button"
                onClick={() => setLogin(true)}
              >
                Log in
              </button>
              <span className="nav-auth-divider" />
              <button
                className="nav-auth-button"
                onClick={() => setRegister(true)}
              >
                Register
              </button>
            </>
          )}
        </div>

        <div className="right-nav">
          <button className="postBtn" onClick={onPostAd}>
            <Plus size={28} />
            Post Ad
          </button>
        </div>

        <button
          className="hamburger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      <div
        className="category-nav-wrap"
        onBlur={closeMenuOnBlur}
        onKeyDown={(event) => event.key === "Escape" && setOpenCategory(null)}
      >
        <nav
          className="category-nav"
          aria-label="Marketplace categories"
          onMouseLeave={scheduleCategoryClose}
        >
          {categories.map((item) => (
            <button
              className={
                category === item || (category === "All" && item === "Motors")
                  ? "active"
                  : ""
              }
              key={item}
              type="button"
              aria-haspopup="true"
              aria-expanded={openCategory === item}
              aria-controls={`mega-menu-${categories.indexOf(item)}`}
              onMouseEnter={() => openCategoryMenu(item)}
              onFocus={() => openCategoryMenu(item)}
              onClick={() => openCategoryMenu(item)}
            >
              {item}
              <ChevronDown
                className={openCategory === item ? "chevron-open" : ""}
                size={12}
              />
            </button>
          ))}
        </nav>
        {openCategory && (
          <div
            className="mega-menu"
            id={`mega-menu-${categories.indexOf(openCategory)}`}
            role="region"
            aria-label={`${openCategory} categories`}
            onMouseEnter={() => clearTimeout(closeCategoryTimer.current)}
            onMouseLeave={scheduleCategoryClose}
          >
            <div className="mega-menu-heading">
              <div>
                <span>Explore DubaiZA</span>
                <h2>{openCategory}</h2>
              </div>
              <div className="mega-menu-actions">
                <button
                  type="button"
                  onClick={() => chooseCategory(openCategory)}
                >
                  View all {openCategory}
                  <ChevronDown size={14} className="view-all-chevron" />
                </button>
                <button
                  className="mega-menu-close"
                  type="button"
                  aria-label="Close category menu"
                  onClick={() => setOpenCategory(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="mega-menu-columns">
              {megaMenus[openCategory].map((group) => (
                <section className="mega-menu-column" key={group.title}>
                  <h3>{group.title}</h3>
                  {group.items.map((entry) => (
                    <button
                      type="button"
                      key={entry}
                      onClick={() => chooseCategory(openCategory)}
                    >
                      {entry}
                    </button>
                  ))}
                </section>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="DubaiZA menu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <Link
                className="brand-link"
                to="/"
                aria-label="DubaiZA home"
                onClick={() => setMenuOpen(false)}
              >
                <div className="logo">
                  <p>D</p>
                  <h1>
                    Dubai<span>ZA</span>
                  </h1>
                </div>
              </Link>
              <button
                className="close-menu"
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-menu-content">
              <section className="mobile-menu-welcome">
                <div className="mobile-menu-welcome-title">
                  <UserRound size={19} />
                  <strong>
                    {currentUser ? `Welcome, ${currentUser.name}!` : "Welcome Guest!"}
                  </strong>
                </div>
                {currentUser ? (
                  <>
                    <Link
                      className="mobile-menu-account"
                      to="/my-listings"
                      onClick={() => setMenuOpen(false)}
                    >
                      My ads and profile
                    </Link>
                    <button
                      className="mobile-menu-logout"
                      type="button"
                      onClick={() => {
                        onLogout();
                        setMenuOpen(false);
                      }}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <div className="mobile-menu-auth">
                    <button
                      type="button"
                      onClick={() => openAuth(setLogin)}
                    >
                      Log In
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuth(setRegister)}
                    >
                      Register
                    </button>
                  </div>
                )}
              </section>

              <section className="mobile-language" aria-label="Language">
                <span>
                  <Languages size={17} />
                  Language
                </span>
                <div>
                  {["English", "العربية"].map((language) => (
                    <button
                      className={mobileLanguage === language ? "active" : ""}
                      type="button"
                      key={language}
                      aria-pressed={mobileLanguage === language}
                      onClick={() => setMobileLanguage(language)}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </section>

              <form
                className="mobile-menu-search"
                role="search"
                onSubmit={submitMobileSearch}
              >
                <Search size={19} aria-hidden="true" />
                <input
                  type="search"
                  aria-label="Search listings"
                  placeholder="Search for anything..."
                  value={mobileSearchTerm}
                  onChange={(event) => setMobileSearchTerm(event.target.value)}
                />
              </form>

              <section className="mobile-browse">
                <div className="mobile-browse-heading">
                  <h2>Browse Categories</h2>
                  <button
                    type="button"
                    onClick={() => chooseCategory("All")}
                  >
                    View all
                  </button>
                </div>
                <ul>
                  {categories.map((item) => {
                    const Icon = mobileCategoryIcons[item] || Building2;
                    const isExpanded = mobileExpandedCategory === item;
                    return (
                      <li key={item}>
                        <div className="mobile-category-row">
                          <button
                            className="mobile-category-select"
                            type="button"
                            onClick={() => chooseCategory(item)}
                          >
                            <span className="mobile-category-icon">
                              <Icon size={18} />
                            </span>
                            <span>{item}</span>
                          </button>
                          <button
                            className="mobile-category-expand"
                            type="button"
                            aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item}`}
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setMobileExpandedCategory(
                                isExpanded ? null : item,
                              )
                            }
                          >
                            <ChevronRight
                              size={18}
                              className={isExpanded ? "expanded" : ""}
                            />
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="mobile-category-subcategories">
                            {megaMenus[item].map((group) => (
                              <section key={group.title}>
                                <h3>{group.title}</h3>
                                <div>
                                  {group.items.map((entry) => (
                                    <button
                                      type="button"
                                      key={entry}
                                      onClick={() => chooseCategory(item)}
                                    >
                                      {entry}
                                    </button>
                                  ))}
                                </div>
                              </section>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>

              <button
                className="mobile-menu-post-ad"
                type="button"
                onClick={() => {
                  onPostAd();
                  setMenuOpen(false);
                }}
              >
                <Plus size={19} />
                Post an Ad
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="mobile-bottom-nav" aria-label="Quick navigation">
        <Link className="mobile-bottom-nav-item" to="/" aria-label="Home">
          <House size={21} />
          <span>Home</span>
        </Link>
        <button
          className="mobile-bottom-nav-item"
          type="button"
          onClick={focusSearch}
        >
          <Search size={21} />
          <span>Search</span>
        </button>
        <button
          className="mobile-bottom-nav-item mobile-bottom-nav-sell"
          type="button"
          aria-label="Sell an item"
          onClick={onPostAd}
        >
          <span className="mobile-bottom-nav-sell-icon">
            <Plus size={29} />
          </span>
          <span>Sell</span>
        </button>
        <button
          className="mobile-bottom-nav-item"
          type="button"
          onClick={() => setLogin(true)}
        >
          <MessageCircle size={21} />
          <span>Chat</span>
        </button>
        <button
          className="mobile-bottom-nav-item"
          type="button"
          onClick={() => setLogin(true)}
        >
          <UserRound size={21} />
          <span>Profile</span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
