import { useRef, useState } from "react";
import "./Navbar.css";
import "./NavbarMarketplace.css";
import "./NavbarReference.css";
import {
  Bell,
  ChevronDown,
  Globe,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  X,
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
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
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
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="close-menu" onClick={() => setMenuOpen(false)}>
              <X size={26} />
            </button>

            <ul>
              <li>
                <button onClick={() => chooseCategory("All")}>
                  All categories
                </button>
              </li>
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/electronics" onClick={() => setMenuOpen(false)}>
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/furniture-garden" onClick={() => setMenuOpen(false)}>
                  Furniture & Garden
                </Link>
              </li>
              {categories.map((item) => (
                <li key={item}>
                  <button onClick={() => chooseCategory(item)}>{item}</button>
                </li>
              ))}
            </ul>

            <div className="mobile-menu-buttons">
              {currentUser ? (
                <>
                  <p className="mobile-signed-in">
                    Signed in as <strong>{currentUser.name}</strong>
                  </p>
                  <button
                    className="loginBtn"
                    onClick={() => {
                      onLogout();
                      setMenuOpen(false);
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="loginBtn"
                    onClick={() => {
                      setLogin(true);
                      setMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="registerBtn"
                    onClick={() => {
                      setRegister(true);
                      setMenuOpen(false);
                    }}
                  >
                    Register
                  </button>
                </>
              )}
              <button
                className="postBtn"
                onClick={() => {
                  onPostAd();
                  setMenuOpen(false);
                }}
              >
                <Plus size={22} />
                Post Ad
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
