import { Schema, model } from "mongoose";

const InterviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    questions: {
      type: [String],
      required: true,
    },

    answers: {
      type: [String],
      default: [],
    },

    evaluation: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default model("Interview", InterviewSchema);