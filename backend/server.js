require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./config/db");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const { assertTokenSecret } = require("./utils/tokens");

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "14mb" }));
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  console.error(error);
  if (error.type === "entity.too.large") {
    return res.status(413).json({ message: "Request is too large." });
  }
  if (error instanceof SyntaxError && error.status === 400) {
    return res.status(400).json({ message: "Request body must be valid JSON." });
  }
  return res.status(500).json({ message: "An unexpected server error occurred." });
});

const start = async () => {
  assertTokenSecret();
  await db();
  const port = Number(process.env.PORT) || 5000;
  app.listen(port, () => {
    console.log(`Server is up and running on PORT: ${port}`);
  });
};

start().catch((error) => {
  console.error("Could not start the server:", error.message);
  process.exitCode = 1;
});
