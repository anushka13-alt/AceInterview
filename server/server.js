require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ======================
// Middleware
// ======================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ======================
// Database
// ======================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ======================
// Routes
// ======================

const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");
const judgeRoutes = require("./routes/judge.routes");

app.use("/api/auth", authRoutes);

app.use("/api/interview", interviewRoutes);

app.use("/api/judge", judgeRoutes);

// ======================
// Test Route
// ======================

app.get("/", (req, res) => {
  res.send("AceInterview Backend Running 🚀");
});

// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});