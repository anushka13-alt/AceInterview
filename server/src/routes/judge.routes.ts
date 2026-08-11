import express from "express";

import {
  runCode,
  submitCode,
  getSubmissionHistory,
} from "../controllers/judge.controller";

const router = express.Router();

router.post("/run", runCode);

router.post("/submit", submitCode);
router.get(
  "/history",
  getSubmissionHistory
);

export default router;