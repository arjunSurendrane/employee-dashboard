import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToLocalhost from "./config/server.js";
import connectToMongoDB from "./config/database.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

(function () {
  app.get("/", (req, res) => {
    res.send("Welcome");
  });
  connectToMongoDB();
  connectToLocalhost(app, PORT);
})();
