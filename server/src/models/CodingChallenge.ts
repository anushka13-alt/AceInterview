import { Schema, model } from "mongoose";

const TestCaseSchema = new Schema(
  {
    input: {
      type: String,
      required: true,
    },

    output: {
      type: String,
      required: true,
    },

    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const StarterCodeSchema = new Schema(
  {
    cpp: String,
    java: String,
    python: String,
    javascript: String,
  },
  {
    _id: false,
  }
);

const ExampleSchema = new Schema(
  {
    input: String,
    output: String,
    explanation: String,
  },
  {
    _id: false,
  }
);

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    leetcodeId: Number,

    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    companies: [
      {
        type: String,
      },
    ],

    topics: [
      {
        type: String,
      },
    ],

    acceptance: {
      type: Number,
      default: 0,
    },

    constraints: [
      {
        type: String,
      },
    ],

    examples: [ExampleSchema],

    starterCode: StarterCodeSchema,

    testCases: [TestCaseSchema],

    hints: [
      {
        type: String,
      },
    ],

    timeLimit: {
      type: Number,
      default: 1,
    },

    memoryLimit: {
      type: Number,
      default: 256,
    },

    premium: {
      type: Boolean,
      default: false,
    },

    frequency: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Question", QuestionSchema);