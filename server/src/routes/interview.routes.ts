import { Router } from "express";

import { auth } from "../middleware/auth";

import {
  createInterview,
  submitInterview,
  getInterviewById,
  getAllInterviews,
  deleteInterview,
} from "../controllers/interview.controller";

const router = Router();

router.post(
  "/create",
  auth,
  createInterview
);

router.post(
  "/submit",
  auth,
  submitInterview
);

router.get(
  "/",
  auth,
  getAllInterviews
);

router.get(
  "/:id",
  auth,
  getInterviewById
);

router.delete(
  "/:id",
  auth,
  deleteInterview
);

export default router;