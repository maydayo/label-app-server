import mongoose from "mongoose";
import { labelSchema } from "./label";

const FileSchema = new mongoose.Schema(
  {
    id: String,
    path: String,
    filename: String,
    mimetype: String,
    label: [labelSchema]
  },
  {
    timestamps: true
  }
);

const File = mongoose.model("File", FileSchema);

export default File;
