import { Request, Response } from "express";
import CoachChat from "../models/CoachChat";
import { askCoach } from "../services/coach";

// =========================
// Send Message
// =========================
export async function chatWithCoach(
  req: Request,
  res: Response
) {
  try {
    console.log("===== COACH REQUEST =====");
    console.log(req.body);

    const { message, chatId } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    let chat: any = null;

    if (chatId) {
      chat = await CoachChat.findById(chatId);
    }

    const history =
      chat?.messages.map((msg: any) => ({
        role: msg.role,
        message: msg.message,
      })) || [];

    const reply = await askCoach(message, history);

    if (chat) {
      chat.messages.push({
        role: "user",
        message,
      });

      chat.messages.push({
        role: "assistant",
        message: reply,
      });

      if (
        chat.title === "New Chat" &&
        message.length > 0
      ) {
        chat.title = message.substring(0, 40);
      }

      await chat.save();
    }

    return res.json({
      success: true,
      reply,
    });

  } catch (err: any) {

    console.log("==================================");
    console.log("❌ COACH ERROR");
    console.log(err);

    if (err?.stack) {
      console.log(err.stack);
    }

    console.log("==================================");

    return res.status(500).json({
      success: false,
      message: err?.message || "Coach failed",
    });

  }
}
// =========================
// Create Chat
// =========================

export async function createChat(
  req: Request,
  res: Response
) {
  try {

    const chat = await CoachChat.create({
      user: (req as any).user.id,
      title: "New Chat",
      messages: [],
    });

    return res.json(chat);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Failed to create chat",
    });

  }
}

// =========================
// All Chats
// =========================

export async function getChats(
  req: Request,
  res: Response
) {
  try {

    const chats = await CoachChat.find({
      user: (req as any).user.id,
    }).sort({
      updatedAt: -1,
    });

    return res.json(chats);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Failed to fetch chats",
    });

  }
}

// =========================
// Single Chat
// =========================

export async function getChat(
  req: Request,
  res: Response
) {
  try {

    const chat = await CoachChat.findById(
      req.params.id
    );

    return res.json(chat);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Chat not found",
    });

  }
}

// =========================
// Delete Chat
// =========================

export async function deleteChat(
  req: Request,
  res: Response
) {
  try {

    await CoachChat.findByIdAndDelete(
      req.params.id
    );

    return res.json({
      success: true,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Delete failed",
    });

  }
}