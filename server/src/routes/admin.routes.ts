import { Router } from "express";

import {
  generateBulkQuestions,
} from "../controllers/admin.controller";

const router = Router();

router.post(
  "/generate",
  generateBulkQuestions
);

export default router;