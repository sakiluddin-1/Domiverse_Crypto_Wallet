const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

// Replace <PASSWORD> in the connection string
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Connect to MongoDB
mongoose
  .connect(DB)
  .then(() => {
    console.log("✅ DB connection successful!");
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 App running on port ${port}...`);
});

console.log("DATABASE VALUE:", process.env.DATABASE);