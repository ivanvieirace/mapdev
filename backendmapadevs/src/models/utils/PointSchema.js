import mongoose from "mongoose";

// Schema Auxiliar MongoDB para uso no Dev.js
const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

module.exports = PointSchema;
