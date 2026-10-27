const mongoose = require("mongoose");
const router = require("express").Router();
const Post = require("../models/post");
const requireAuth = require("../middleware/requireAuth");

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
const maximumImageBytes = 10 * 1024 * 1024;
const imagePattern = /^data:image\/(?:jpeg|png|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/i;

const toPublicPost = (post) => {
  const price = new Intl.NumberFormat("en-US").format(post.price);
  return {
    id: String(post._id),
    image: post.picture,
    images: [post.picture, ...post.images],
    tag: post.tag,
    category: post.category,
    postedTime: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Recently",
    title: post.title,
    description: post.description,
    detail: post.detail,
    year: post.year,
    location: post.location,
    price,
    priceUnit: post.priceUnit,
    specifications: Object.fromEntries(post.specifications || []),
    contact: {
      name: post.contact.name,
      phone: post.contact.phone,
      email: post.contact.email,
      methods: post.contact.methods,
    },
    ownerId: String(post.user),
    createdAt: post.createdAt,
  };
};

const validateImages = (images) => {
  if (!Array.isArray(images) || images.length < 1 || images.length > 8) {
    return "Add between 1 and 8 listing photos.";
  }
  let totalBytes = 0;
  for (const image of images) {
    if (typeof image !== "string" || !imagePattern.test(image)) {
      return "Listing photos must be valid JPEG, PNG, WEBP, or GIF images.";
    }
    totalBytes += Buffer.byteLength(image.slice(image.indexOf(",") + 1), "base64");
  }
  if (totalBytes > maximumImageBytes) {
    return "The combined size of listing photos must be 10 MB or less.";
  }
  return null;
};

const makePostData = (body, userId) => {
  const category = body.category;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const priceInput = body.price;
  const price =
    priceInput === "" || priceInput === undefined || priceInput === null
      ? Number.NaN
      : Number(String(priceInput).replace(/,/g, ""));
  const contact = body.contact;
  const images = body.images;
  const imageError = validateImages(images);

  if (!categories.includes(category)) return { error: "Choose a valid category." };
  if (!title || title.length > 90) {
    return { error: "Title is required and must be 90 characters or fewer." };
  }
  if (!description || description.length > 2000) {
    return { error: "Description is required and must be 2,000 characters or fewer." };
  }
  if (!location || location.length > 160) return { error: "Enter a valid listing location." };
  if (!Number.isFinite(price) || price < 0) return { error: "Enter a valid price." };
  if (imageError) return { error: imageError };
  if (
    !contact ||
    typeof contact.name !== "string" ||
    typeof contact.phone !== "string" ||
    typeof contact.email !== "string" ||
    contact.name.trim().length < 2 ||
    contact.name.trim().length > 80 ||
    contact.phone.replace(/\D/g, "").length < 7 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
  ) {
    return { error: "Enter valid seller contact details." };
  }
  if (
    !Array.isArray(contact.methods) ||
    contact.methods.length === 0 ||
    contact.methods.some(
      (method) => !["Chat", "Phone", "Email", "WhatsApp"].includes(method),
    )
  ) {
    return { error: "Choose at least one valid contact method." };
  }

  const specificationEntries =
    body.specifications instanceof Map
      ? Array.from(body.specifications.entries())
      : body.specifications &&
          typeof body.specifications === "object" &&
          !Array.isArray(body.specifications)
        ? Object.entries(body.specifications)
        : [];
  const specifications = Object.fromEntries(
    specificationEntries
      .filter(([key, value]) => key.length <= 60 && typeof value === "string")
      .map(([key, value]) => [key, value.slice(0, 200)]),
  );

  return {
    value: {
      picture: images[0],
      images: images.slice(1),
      title,
      description,
      category,
      tag: category === "Property" ? "Real Estate" : category,
      detail:
        Object.entries(specifications)
          .slice(0, 3)
          .map(([key, value]) => `${key}: ${value}`)
          .join(" · ") || category,
      year: typeof body.year === "string" ? body.year.slice(0, 12) : "",
      location,
      price,
      priceUnit: ["AED", "AED/yr", "AED/mo", "AED/hr"].includes(body.priceUnit)
        ? body.priceUnit
        : "AED",
      specifications,
      contact: {
        name: contact.name.trim().slice(0, 80),
        phone: contact.phone.trim().slice(0, 40),
        email: contact.email.trim().toLowerCase(),
        methods: contact.methods,
      },
      user: userId,
    },
  };
};

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(100);
    return res.json({ posts: posts.map(toPublicPost) });
  } catch (error) {
    return next(error);
  }
});

router.get("/mine", requireAuth, async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ count: posts.length, posts: posts.map(toPublicPost) });
  } catch (error) {
    return next(error);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  const result = makePostData(req.body, req.user._id);
  if (result.error) return res.status(400).json({ message: result.error });

  try {
    const post = await Post.create(result.value);
    return res.status(201).json({ post: toPublicPost(post) });
  } catch (error) {
    return next(error);
  }
});

router.get("/:postId", async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.postId)) {
    return res.status(404).json({ message: "Listing not found." });
  }
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Listing not found." });
    return res.json({ post: toPublicPost(post) });
  } catch (error) {
    return next(error);
  }
});

router.put("/:postId", requireAuth, async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.postId)) {
    return res.status(404).json({ message: "Listing not found." });
  }

  try {
    const post = await Post.findOne({ _id: req.params.postId, user: req.user._id });
    if (!post) return res.status(404).json({ message: "Listing not found." });

    const body = {
      ...post.toObject(),
      ...req.body,
      images: [post.picture, ...post.images],
    };
    const result = makePostData(body, req.user._id);
    if (result.error) return res.status(400).json({ message: result.error });
    Object.assign(post, result.value);
    await post.save();
    return res.json({ post: toPublicPost(post) });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:postId", requireAuth, async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.postId)) {
    return res.status(404).json({ message: "Listing not found." });
  }
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.postId,
      user: req.user._id,
    });
    if (!post) return res.status(404).json({ message: "Listing not found." });
    return res.json({ message: "Listing deleted." });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
