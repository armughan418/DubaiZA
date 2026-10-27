const bcrypt = require("bcryptjs");
const router = require("express").Router();
const User = require("../models/user");
const requireAuth = require("../middleware/requireAuth");
const { signToken } = require("../utils/tokens");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sameSite = process.env.COOKIE_SAME_SITE || "Lax";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" || sameSite === "None",
  sameSite,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
const publicUser = (user) => ({
  id: String(user._id),
  name: user.fullName,
  email: user.email,
});

router.post("/register", async (req, res, next) => {
  try {
    const fullName = typeof req.body.fullName === "string" ? req.body.fullName.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (fullName.length < 2 || fullName.length > 80) {
      return res.status(400).json({ message: "Name must be between 2 and 80 characters." });
    }
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address." });
    }
    if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({
        message: "Password must be at least 8 characters and no more than 72 bytes.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ fullName, email, password: passwordHash });
    res.cookie("dubaiza_session", signToken(user._id), cookieOptions);
    return res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }

    res.cookie("dubaiza_session", signToken(user._id), cookieOptions);
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("dubaiza_session", cookieOptions);
  return res.json({ message: "Signed out." });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

router.patch("/me", requireAuth, async (req, res, next) => {
  const fullName = typeof req.body.fullName === "string" ? req.body.fullName.trim() : "";
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";

  if (fullName.length < 2 || fullName.length > 80) {
    return res.status(400).json({ message: "Name must be between 2 and 80 characters." });
  }
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  try {
    req.user.fullName = fullName;
    req.user.email = email;
    await req.user.save();
    return res.json({ user: publicUser(req.user) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }
    return next(error);
  }
});

module.exports = router;
