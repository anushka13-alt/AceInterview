import express from "express";

import {
  codingAnalytics,
} from "../controllers/analytics.controller";

const router = express.Router();

router.get(
  "/coding",
  codingAnalytics
);

export default router;