import fs from "fs";
import mkdirp from "mkdirp";
import mongoose from "mongoose";
import shortid from "shortid";
const apolloServerExpress = require("apollo-server-express");
import { File } from "../models";

const UPLOAD_DIR = "./uploaded"; // Path to store video files

mkdirp(UPLOAD_DIR, err => {
  // Create directory to store video files
  if (err) console.error(err);
  else console.log("pow!");
});

const storeFS = ({ stream, filename }) => {
  // Store Files
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on("error", error => {
        if (stream.truncated) {
          // Delete the truncated file.
          fs.unlinkSync(path);
        }
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on("error", error => reject(error))
      .on("finish", () => resolve({ id, path }))
  );
};

const storeDB = args => {
  // Store data to database when upload files
  const file = new File(args);
  file.save();
  return file;
};

const processUpload = async file => {
  // Upload files
  const { createReadStream, filename, mimetype } = await file;
  console.log(filename);
  const stream = createReadStream();
  const { id, path } = await storeFS({ stream, filename });
  const dbInfo = await storeDB({
    id,
    filename,
    mimetype,
    path
  });
  return dbInfo;
};

export default {
  Query: {
    files: () => {
      return File.find({});
    }
  },
  Mutation: {
    uploadFile: (obj, { file }, context) => {
        console.log("uploadfile")
      // TODO: projection
      return processUpload(file);
    },
    addFileInfo: (obj, { path, filename, mimetype }) => {
      console.log(path, filename, mimetype);
      const id = shortid.generate();
      const dbInfo = storeDB({
        id,
        filename,
        mimetype,
        path
      });
      return dbInfo;
    }
  }
};
