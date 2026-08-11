import express from "express";

import {
  createQuestion,
  getQuestion,
} from "../controllers/question.controller";

const router = express.Router();

/*
POST
/api/coding/generate
*/

router.post(
  "/generate",
  createQuestion
);

/*
GET
/api/coding/question/:slug
*/

router.get(
  "/question/:slug",
  getQuestion
);

export default router;