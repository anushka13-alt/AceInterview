import { Router } from "express";
import { getSubmissionHistory } from "../controllers/submission.controller";

const router = Router();

router.get("/history", getSubmissionHistory);

export default router;z