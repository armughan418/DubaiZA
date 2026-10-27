const jwt = require("jsonwebtoken");

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long.");
  }
  return secret;
};

const signToken = (userId) =>
  jwt.sign({ id: String(userId) }, getSecret(), { expiresIn: "7d" });

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, getSecret());
    return typeof payload === "object" && typeof payload.id === "string"
      ? payload.id
      : null;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) return null;
    throw error;
  }
};

module.exports = { signToken, verifyToken, assertTokenSecret: getSecret };
