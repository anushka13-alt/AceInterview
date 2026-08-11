import { Router } from "express";

import { auth } from "../middleware/auth";

import {
  chatWithCoach,
  createChat,
  getChats,
  getChat,
  deleteChat,
} from "../controllers/coachController";

const router = Router();

// AI Chat
router.post(
  "/chat",
  auth,
  chatWithCoach
);

// Create New Chat
router.post(
  "/",
  auth,
  createChat
);

// Get All Chats
router.get(
  "/",
  auth,
  getChats
);

// Get Single Chat
router.get(
  "/:id",
  auth,
  getChat
);

// Delete Chat
router.delete(
  "/:id",
  auth,
  deleteChat
);

export default router;