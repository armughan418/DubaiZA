const User = require("../models/user");
const { verifyToken } = require("../utils/tokens");

const requireAuth = async (req, res, next) => {
  const token = req.cookies.dubaiza_session;
  if (!token) return res.status(401).json({ message: "Sign in to continue." });

  try {
    const userId = verifyToken(token);
    if (!userId) return res.status(401).json({ message: "Please sign in again." });
    req.user = await User.findById(userId).select("fullName email role");
    if (!req.user) return res.status(401).json({ message: "Account not found." });
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = requireAuth;
