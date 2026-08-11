import { Router } from "express";

import {
  runCode,
  submitSolution,
  aiHint,
  aiReview,
} from "../controllers/code.controller";

const router = Router();

router.post("/run", runCode);

router.post("/submit", submitSolution);

router.post("/hint", aiHint);

router.post("/review", aiReview);

export default router;