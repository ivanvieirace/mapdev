import mongoose from "mongoose";
import PointSchema from "./utils/PointSchema";

// ORM com Banco MongoDB usando Mongoose
const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: "2dsphere",
  },
});

module.exports = mongoose.model("Dev", DevSchema);
