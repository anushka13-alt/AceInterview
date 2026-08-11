import mongoose, { Schema, Document } from "mongoose";

export interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ITestCase {
  input: string;
  output: string;
}

export interface IStarterCode {
  cpp: string;
  python: string;
  java: string;
  javascript: string;
}

export interface IQuestion extends Document {
  title: string;
  slug: string;

  difficulty: "Easy" | "Medium" | "Hard";

  company: string;
  role: string;

  description: string;

  topics: string[];

  examples: IExample[];

  constraints: string[];

  starterCode: IStarterCode;

  testCases: ITestCase[];

  createdAt: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    company: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    topics: [
      {
        type: String,
      },
    ],

    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],

    constraints: [
      {
        type: String,
      },
    ],

    starterCode: {
      cpp: {
        type: String,
        default: "",
      },

      python: {
        type: String,
        default: "",
      },

      java: {
        type: String,
        default: "",
      },

      javascript: {
        type: String,
        default: "",
      },
    },

    testCases: [
      {
        input: String,
        output: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IQuestion>(
  "Question",
  QuestionSchema
);