import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Camera,
  CarFront,
  Check,
  ChevronRight,
  FileText,
  Home,
  MapPin,
  Monitor,
  Smartphone,
  Tag,
  UsersRound,
  Wrench,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./PostAdModal.css";

const steps = ["Category", "Details", "Specs", "Photos", "Location", "Reach"];

const categories = [
  { name: "Motors", icon: CarFront },
  { name: "Property", icon: Home },
  { name: "Jobs", icon: BriefcaseBusiness },
  { name: "Electronics", icon: Monitor },
  { name: "Furniture & Garden", icon: Building2 },
  { name: "Mobile Phones", icon: Smartphone },
  { name: "Services", icon: Wrench },
  { name: "Classifieds", icon: Tag },
  { name: "Community", icon: UsersRound },
];

const emirates = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

const specificationFields = {
  Motors: [
    { name: "Make", type: "text", placeholder: "e.g. Toyota" },
    { name: "Model", type: "text", placeholder: "e.g. Land Cruiser" },
    { name: "Year", type: "number", min: 1950, max: 2027 },
    { name: "Mileage", type: "number", min: 0, suffix: "km" },
    {
      name: "Transmission",
      type: "select",
      options: ["Automatic", "Manual"],
    },
    { name: "Fuel type", type: "select", options: ["Petrol", "Diesel", "Hybrid", "Electric"] },
  ],
  Property: [
    {
      name: "Property type",
      type: "select",
      options: ["Apartment", "Villa", "Townhouse", "Land", "Commercial"],
    },
    { name: "Bedrooms", type: "select", options: ["Studio", "1", "2", "3", "4", "5+"] },
    { name: "Bathrooms", type: "select", options: ["1", "2", "3", "4", "5+"] },
    { name: "Area", type: "number", min: 0, suffix: "sq ft" },
    { name: "Furnishing", type: "select", options: ["Furnished", "Semi-furnished", "Unfurnished"] },
    { name: "Purpose", type: "select", options: ["For sale", "For rent"] },
  ],
  Jobs: [
    {
      name: "Employment type",
      type: "select",
      options: ["Full time", "Part time", "Contract", "Temporary", "Internship"],
    },
    { name: "Company", type: "text", placeholder: "Company name" },
    { name: "Experience", type: "text", placeholder: "e.g. 2-4 years" },
    { name: "Work arrangement", type: "select", options: ["On-site", "Hybrid", "Remote"] },
  ],
  Electronics: [
    { name: "Brand", type: "text", placeholder: "Brand name" },
    { name: "Model", type: "text", placeholder: "Model name" },
    { name: "Condition", type: "select", options: ["Brand new", "Like new", "Good", "Fair"] },
    { name: "Warranty", type: "select", options: ["Yes", "No"] },
  ],
  "Furniture & Garden": [
    { name: "Item type", type: "text", placeholder: "e.g. Sofa, dining table" },
    { name: "Condition", type: "select", options: ["Brand new", "Like new", "Good", "Fair"] },
    { name: "Material", type: "text", placeholder: "e.g. Solid wood" },
  ],
  "Mobile Phones": [
    { name: "Brand", type: "text", placeholder: "e.g. Apple" },
    { name: "Model", type: "text", placeholder: "e.g. iPhone 15 Pro" },
    { name: "Storage", type: "select", options: ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"] },
    { name: "Condition", type: "select", options: ["Brand new", "Like new", "Good", "Fair"] },
  ],
  Services: [
    { name: "Service type", type: "text", placeholder: "What service do you offer?" },
    { name: "Experience", type: "text", placeholder: "e.g. 5 years" },
    { name: "Availability", type: "select", options: ["Available now", "By appointment", "Weekends"] },
  ],
  Classifieds: [
    { name: "Item type", type: "text", placeholder: "What are you listing?" },
    { name: "Condition", type: "select", options: ["Brand new", "Like new", "Good", "Fair"] },
    { name: "Brand", type: "text", placeholder: "Brand name (optional)" },
  ],
  Community: [
    { name: "Activity type", type: "text", placeholder: "e.g. Sports, meetup, class" },
    { name: "Date", type: "date" },
    { name: "Organizer", type: "text", placeholder: "Organizer name" },
  ],
};

const readImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });

const PostAdModal = ({ onPublish }) => {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState({
    title: "",
    description: "",
    price: "",
    priceUnit: "AED",
    condition: "Used",
  });
  const [specifications, setSpecifications] = useState({});
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState({ emirate: "", area: "" });
  const [reach, setReach] = useState({
    name: "",
    phone: "",
    email: "",
    contactMethods: ["Chat"],
  });
  const [error, setError] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef(null);
  const photoUrls = useRef(new Set());

  useEffect(
    () => () => {
      photoUrls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  const updateDetails = (event) => {
    const { name, value } = event.target;
    setDetails((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const updateReach = (event) => {
    const { name, value } = event.target;
    setReach((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const addPhotos = (files) => {
    const selectedFiles = Array.from(files || []);
    if (!selectedFiles.length) return;
    const remainingSlots = 8 - photos.length;
    if (selectedFiles.length > remainingSlots) {
      setError(`You can add up to 8 photos. ${remainingSlots} slot(s) remain.`);
      return;
    }
    const invalidFile = selectedFiles.find(
      (file) => !file.type.startsWith("image/") || file.size > 10 * 1024 * 1024,
    );
    if (invalidFile) {
      setError("Choose image files up to 10 MB each.");
      return;
    }
    const newPhotos = selectedFiles.map((file) => {
      const preview = URL.createObjectURL(file);
      photoUrls.current.add(preview);
      return { file, preview };
    });
    setPhotos((current) => [...current, ...newPhotos]);
    setError("");
  };

  const removePhoto = (preview) => {
    URL.revokeObjectURL(preview);
    photoUrls.current.delete(preview);
    setPhotos((current) => current.filter((photo) => photo.preview !== preview));
  };

  const validateStep = () => {
    if (step === 0 && !category) return "Choose a category to continue.";
    if (step === 1) {
      if (!details.title.trim()) return "Add a title for your listing.";
      if (!details.description.trim()) return "Add a description for your listing.";
      if (details.price === "" || Number(details.price) < 0)
        return "Enter a valid price.";
    }
    if (step === 3 && photos.length === 0)
      return "Add at least one photo of your listing.";
    if (step === 4) {
      if (!location.emirate) return "Choose an Emirate.";
      if (!location.area.trim()) return "Add an area or neighbourhood.";
    }
    if (step === 5) {
      if (!reach.name.trim()) return "Enter your name.";
      if (!reach.phone.trim()) return "Enter a phone number.";
      if (reach.phone.replace(/\D/g, "").length < 7)
        return "Enter a valid phone number.";
      if (!reach.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reach.email))
        return "Enter a valid email address.";
      if (!reach.contactMethods.length)
        return "Choose at least one way for buyers to contact you.";
    }
    return "";
  };

  const goNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const toggleContactMethod = (method) => {
    setReach((current) => ({
      ...current,
      contactMethods: current.contactMethods.includes(method)
        ? current.contactMethods.filter((item) => item !== method)
        : [...current.contactMethods, method],
    }));
    setError("");
  };

  const submitListing = async (event) => {
    event.preventDefault();
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsPublishing(true);
    setError("");
    try {
      const images = await Promise.all(photos.map(({ file }) => readImage(file)));
      const specs = Object.fromEntries(
        Object.entries(specifications).filter(([, value]) => value.trim()),
      );
      if (
        ["Motors", "Electronics", "Mobile Phones", "Furniture & Garden", "Classifieds"].includes(
          category,
        )
      ) {
        specs.Condition = specifications.Condition || details.condition;
      }
      const detail = Object.entries(specs)
        .slice(0, 3)
        .map(([label, value]) => `${label}: ${value}`)
        .join(" · ");
      const listing = {
        id: Date.now(),
        image: images[0],
        images,
        tag: category === "Property" ? "Real Estate" : category,
        postedTime: "Just now",
        title: details.title.trim(),
        description: details.description.trim(),
        detail: detail || category,
        year: specs.Year || new Date().getFullYear().toString(),
        location: `${location.area.trim()}, ${location.emirate}`,
        price: Number(details.price).toLocaleString("en-US"),
        priceUnit: details.priceUnit,
        specifications: specs,
        contact: {
          name: reach.name.trim(),
          phone: reach.phone.trim(),
          email: reach.email.trim(),
          methods: reach.contactMethods,
        },
      };
      onPublish(listing);
    } catch (publishError) {
      setError(
        publishError instanceof Error
          ? publishError.message
          : "Your listing could not be published. Please try again.",
      );
    } finally {
      setIsPublishing(false);
    }
  };

  const currentSpecs = specificationFields[category] || [];
  const heading =
    step === 0
      ? "Selected Category"
      : step === 1
        ? "Add listing details"
        : step === 2
          ? `${category} specifications`
          : step === 3
            ? "Add photos"
            : step === 4
              ? "Where is it located?"
              : "How can buyers reach you?";

  return (
    <main className="post-listing-page">
      <div className="post-listing-container">
        <nav className="post-listing-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Ad Listing</span>
          <ChevronRight size={14} />
          <strong>Post an ad</strong>
        </nav>
        <h1 className="post-listing-title">Create New Listing</h1>

        <section className="listing-wizard" aria-label="Create a listing">
          <nav className="wizard-steps" aria-label="Listing steps">
            {steps.map((label, index) => (
              <button
                className={`wizard-step ${index === step ? "is-active" : ""} ${index < step ? "is-complete" : ""}`}
                key={label}
                type="button"
                aria-current={index === step ? "step" : undefined}
                disabled={index >= step}
                onClick={() => {
                  setStep(index);
                  setError("");
                }}
              >
                <span className="wizard-step-number">
                  {index < step ? <Check size={14} /> : index + 1}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <form
            className="wizard-content"
            onSubmit={(event) => {
              event.preventDefault();
              if (step < steps.length - 1) goNext();
              else submitListing(event);
            }}
          >
            <div className="wizard-main">
              <h2>{heading}</h2>

              {step === 0 && (
                <div className="wizard-category-grid">
                  {categories.map(({ name, icon: Icon }) => (
                    <button
                      className={`wizard-category ${category === name ? "is-selected" : ""}`}
                      key={name}
                      type="button"
                      aria-pressed={category === name}
                      onClick={() => {
                        setCategory(name);
                        setError("");
                      }}
                    >
                      <span className="wizard-category-icon">
                        <Icon size={20} />
                      </span>
                      <strong>{name}</strong>
                      <ChevronRight size={16} className="wizard-category-arrow" />
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="wizard-fields">
                  <label className="wizard-field wizard-field-wide">
                    Listing title <span className="required-mark">*</span>
                    <input
                      autoFocus
                      maxLength={90}
                      name="title"
                      onChange={updateDetails}
                      placeholder="Write a clear title for your ad"
                      value={details.title}
                    />
                    <small>{details.title.length}/90 characters</small>
                  </label>
                  <label className="wizard-field wizard-field-wide">
                    Description <span className="required-mark">*</span>
                    <textarea
                      maxLength={2000}
                      name="description"
                      onChange={updateDetails}
                      placeholder="Describe the item, property, job or service..."
                      rows={5}
                      value={details.description}
                    />
                  </label>
                  <div className="wizard-field-row">
                    <label className="wizard-field">
                      Price (AED) <span className="required-mark">*</span>
                      <input
                        min="0"
                        name="price"
                        onChange={updateDetails}
                        placeholder="Enter price"
                        type="number"
                        value={details.price}
                      />
                    </label>
                    <label className="wizard-field">
                      Price period
                      <select
                        name="priceUnit"
                        onChange={updateDetails}
                        value={details.priceUnit}
                      >
                        <option value="AED">One-time price</option>
                        <option value="AED/yr">Per year</option>
                        <option value="AED/mo">Per month</option>
                        <option value="AED/hr">Per hour</option>
                      </select>
                    </label>
                  </div>
                  {[
                    "Motors",
                    "Electronics",
                    "Mobile Phones",
                    "Furniture & Garden",
                    "Classifieds",
                  ].includes(category) && (
                    <label className="wizard-field">
                      Condition
                      <select
                        name="condition"
                        onChange={updateDetails}
                        value={details.condition}
                      >
                        <option>Brand new</option>
                        <option>Used</option>
                        <option>Like new</option>
                        <option>Good</option>
                        <option>Fair</option>
                      </select>
                    </label>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="wizard-fields wizard-specs-grid">
                  {currentSpecs.map((field) => (
                    <label className="wizard-field" key={field.name}>
                      {field.name}
                      {field.type === "select" ? (
                        <select
                          onChange={(event) =>
                            setSpecifications((current) => ({
                              ...current,
                              [field.name]: event.target.value,
                            }))
                          }
                          value={specifications[field.name] || ""}
                        >
                          <option value="">Select {field.name.toLowerCase()}</option>
                          {field.options.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="wizard-input-with-suffix">
                          <input
                            max={field.max}
                            min={field.min}
                            onChange={(event) =>
                              setSpecifications((current) => ({
                                ...current,
                                [field.name]: event.target.value,
                              }))
                            }
                            placeholder={field.placeholder || ""}
                            type={field.type}
                            value={specifications[field.name] || ""}
                          />
                          {field.suffix && <span>{field.suffix}</span>}
                        </span>
                      )}
                    </label>
                  ))}
                  <p className="wizard-helper wizard-field-wide">
                    Add accurate specifications to help buyers find your listing.
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="wizard-photos">
                  <p className="wizard-helper">
                    Add up to 8 clear photos. The first photo will be used as your
                    listing cover.
                  </p>
                  <button
                    className="photo-dropzone"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      addPhotos(event.dataTransfer.files);
                    }}
                  >
                    <span className="photo-drop-icon">
                      <Camera size={24} />
                    </span>
                    <strong>Click to upload or drag and drop</strong>
                    <span>PNG, JPG or WEBP (up to 10 MB each)</span>
                    <input
                      ref={fileInputRef}
                      accept="image/*"
                      aria-label="Upload listing photos"
                      className="photo-file-input"
                      multiple
                      onChange={(event) => {
                        addPhotos(event.target.files);
                        event.target.value = "";
                      }}
                      type="file"
                    />
                  </button>
                  {photos.length > 0 && (
                    <div className="photo-preview-grid">
                      {photos.map((photo, index) => (
                        <div className="photo-preview" key={photo.preview}>
                          <img src={photo.preview} alt={`Listing photo ${index + 1}`} />
                          {index === 0 && <span>Cover photo</span>}
                          <button
                            aria-label={`Remove photo ${index + 1}`}
                            onClick={() => removePhoto(photo.preview)}
                            type="button"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="photo-count">{photos.length} of 8 photos added</p>
                </div>
              )}

              {step === 4 && (
                <div className="wizard-fields">
                  <label className="wizard-field">
                    Emirate <span className="required-mark">*</span>
                    <select
                      onChange={(event) => {
                        setLocation((current) => ({
                          ...current,
                          emirate: event.target.value,
                        }));
                        setError("");
                      }}
                      value={location.emirate}
                    >
                      <option value="">Select Emirate</option>
                      {emirates.map((emirate) => (
                        <option key={emirate}>{emirate}</option>
                      ))}
                    </select>
                  </label>
                  <label className="wizard-field">
                    Area or neighbourhood <span className="required-mark">*</span>
                    <input
                      onChange={(event) => {
                        setLocation((current) => ({
                          ...current,
                          area: event.target.value,
                        }));
                        setError("");
                      }}
                      placeholder="e.g. Dubai Marina"
                      value={location.area}
                    />
                  </label>
                  <p className="wizard-helper wizard-location-note">
                    <MapPin size={16} />
                    Your exact address will not be shown publicly.
                  </p>
                </div>
              )}

              {step === 5 && (
                <div className="wizard-fields">
                  <label className="wizard-field">
                    Contact name <span className="required-mark">*</span>
                    <input
                      autoComplete="name"
                      name="name"
                      onChange={updateReach}
                      placeholder="Your name"
                      value={reach.name}
                    />
                  </label>
                  <div className="wizard-field-row">
                    <label className="wizard-field">
                      Phone number <span className="required-mark">*</span>
                      <input
                        autoComplete="tel"
                        name="phone"
                        onChange={updateReach}
                        placeholder="+971 50 000 0000"
                        type="tel"
                        value={reach.phone}
                      />
                    </label>
                    <label className="wizard-field">
                      Email address <span className="required-mark">*</span>
                      <input
                        autoComplete="email"
                        name="email"
                        onChange={updateReach}
                        placeholder="you@example.com"
                        type="email"
                        value={reach.email}
                      />
                    </label>
                  </div>
                  <fieldset className="wizard-contact-options">
                    <legend>Preferred contact methods</legend>
                    {["Chat", "Phone", "WhatsApp"].map((method) => (
                      <label key={method}>
                        <input
                          checked={reach.contactMethods.includes(method)}
                          onChange={() => toggleContactMethod(method)}
                          type="checkbox"
                        />
                        {method}
                      </label>
                    ))}
                  </fieldset>
                  <div className="wizard-review">
                    <FileText size={18} />
                    <p>
                      Your ad will be published in <strong>{category}</strong> for{" "}
                      <strong>
                        {details.priceUnit} {Number(details.price).toLocaleString("en-US")}
                      </strong>{" "}
                      in <strong>{location.area}, {location.emirate}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <p className="wizard-error" role="alert">
                  {error}
                </p>
              )}
            </div>

            <footer className="wizard-footer">
              {step === 0 ? (
                <Link className="wizard-cancel" to="/">
                  Cancel
                </Link>
              ) : (
                <button
                  className="wizard-back"
                  onClick={() => {
                    setStep((current) => current - 1);
                    setError("");
                  }}
                  type="button"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}
              {step === steps.length - 1 ? (
                <button
                  className="wizard-next"
                  disabled={isPublishing}
                  type="submit"
                >
                  {isPublishing ? "Publishing..." : "Publish listing"}
                  <Check size={17} />
                </button>
              ) : (
                <button
                  className="wizard-next"
                  disabled={step === 0 && !category}
                  onClick={goNext}
                  type="button"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              )}
            </footer>
          </form>
        </section>
      </div>
    </main>
  );
};

export default PostAdModal;
