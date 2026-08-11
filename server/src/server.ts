import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";

import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes";
import interviewRoutes from "./routes/interview.routes";
import codingRoutes from "./routes/coding.routes";
import codeRoutes from "./routes/code.routes";
import analyticsRoutes from "./routes/analytics.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import reportRoutes from "./routes/report.routes";
import historyRoutes from "./routes/history.routes";
import coachRoutes from "./routes/coachRoutes"; // ✅ Added
import questionRoutes from "./routes/question.routes";

dotenv.config();

const app = express();

console.log("Mongo URI:", process.env.MONGODB_URI);

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AceInterview API Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);

app.use("/api/code", codeRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/coach", coachRoutes); // ✅ Added
app.use("/api/questions", questionRoutes);
app.use("/api/coding", codingRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});