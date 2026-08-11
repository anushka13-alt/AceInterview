import { Router } from "express";

import upload from "../middleware/upload";
import { auth } from "../middleware/auth";

import {
  uploadResume,
  getResumes,
  getResumeById,
  deleteResume,
} from "../controllers/resume.controller";

const router = Router();

router.post(
  "/upload",
  auth,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/",
  auth,
  getResumes
);

router.get(
  "/:id",
  auth,
  getResumeById
);

router.delete(
  "/:id",
  auth,
  deleteResume
);

export default router;