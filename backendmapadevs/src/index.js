import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

const server = express();

// Conexão com o MongoDB Atlas
mongoose.connect(
  "mongodb+srv://ivan:admin123@cluster0-iisks.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

server.use(express.json());
server.use(routes);
server.listen(3333);
