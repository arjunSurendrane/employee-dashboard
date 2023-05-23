import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToLocalhost from "./config/server.js";
import connectToMongoDB from "./config/database.js";
import adminRoute from "./routes/admin.js";
import ownerRoute from "./routes/owner.js";
import employeeRoute from "./routes/employee.js";
import authRoute from "./routes/authentication.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

(function () {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/admin", adminRoute);
  app.use("/api/v1/owner", ownerRoute);
  app.use("/api/v1/employee", employeeRoute);
  connectToMongoDB();
  connectToLocalhost(app, PORT);
})();
