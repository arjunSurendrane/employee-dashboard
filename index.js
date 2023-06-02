import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import connectToLocalhost from "./config/server.js";
import connectToMongoDB from "./config/database.js";
import taskRoute from "./routes/task.js";
import salaryRoute from "./routes/salary.js";
import employeeRoute from "./routes/employee.js";
import hrRoute from "./routes/hr.js";
import authRoute from "./routes/authentication.js";
import globalErrorHandling from "./middleware/errorHandling.js";
import authorizeToken from "./middleware/authorization.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

(function async() {
  app.use("/api/v1/auth", authRoute);
  // app.use(authorizeToken);
  app.use("/api/v1/employee", employeeRoute);
  app.use("/api/v1/hr", hrRoute);
  app.use("/api/v1/salary", salaryRoute);
  app.use("/api/v1/task", taskRoute);
  app.use("*", (req, res, next) => next(new AppError("page not found", 404)));
  globalErrorHandling(app);
  connectToMongoDB();
  connectToLocalhost(app, PORT);
})();
