import { Schema, model } from "mongoose";

const ResumeSchema = new Schema(
  {
    user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
    fileName: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    analysis: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Resume", ResumeSchema);