const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    picture: { type: String, required: true },
    images: { type: [String], default: [] },
    title: { type: String, required: true, trim: true, maxlength: 90 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    category: {
      type: String,
      required: true,
      enum: [
        "Motors",
        "Property",
        "Jobs",
        "Electronics",
        "Furniture & Garden",
        "Mobile Phones",
        "Services",
        "Classifieds",
        "Community",
      ],
    },
    tag: { type: String, required: true },
    detail: { type: String, default: "" },
    year: { type: String, default: "" },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    priceUnit: { type: String, default: "AED" },
    specifications: { type: Map, of: String, default: {} },
    contact: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      methods: {
        type: [{ type: String, enum: ["Chat", "Phone", "Email", "WhatsApp"] }],
        default: ["Chat"],
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
