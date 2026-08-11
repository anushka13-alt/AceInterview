import { Router } from "express";

import {
  createQuestion,
  getQuestion,
} from "../controllers/question.controller";

const router = Router();

// Generate AI Question
router.post("/generate", createQuestion);

// Get Question by Slug
router.get("/question/:slug", getQuestion);

export default router;