import { Schema, model, Types } from "mongoose";

const MessageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const CoachChatSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "New Chat",
    },

    messages: [MessageSchema],
  },
  {
    timestamps: true,
  }
);

export default model("CoachChat", CoachChatSchema);