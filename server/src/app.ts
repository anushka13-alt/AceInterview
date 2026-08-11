import express from "express";
import cors from "cors";

import questionRoutes from "./routes/question.routes";
import codeRoutes from "./routes/code.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("AceInterview Backend Running 🚀");
});

/* Coding APIs */

app.use("/api/coding", questionRoutes);
app.use("/api/coding", codeRoutes);

export default app;