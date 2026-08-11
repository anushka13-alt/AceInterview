import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  user?: mongoose.Types.ObjectId;

  question: mongoose.Types.ObjectId;

  language: string;

  code: string;

  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Compile Error";

  runtime: string;

  memory: string;

  createdAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Runtime Error",
        "Compile Error",
      ],
      required: true,
    },

    runtime: {
      type: String,
      default: "",
    },

    memory: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISubmission>(
  "Submission",
  SubmissionSchema
);