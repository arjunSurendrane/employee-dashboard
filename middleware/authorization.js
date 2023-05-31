import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import asyncHandler from "express-async-handler";
import Hrmodel from "../models/hrmodel";
import Employee from "../models/employee";

const checkWithDatabase = {
  admin: (id, password) => {
    return id == process.env.ADMIN_MAIL && password == process.env.ADMIN_PASS;
  },
  hr: async (id) => await Hrmodel.findById(id),
  employee: async (id) => await Employee.findById(id),
};

const authorizeToken = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(new AppError("Unauthorized user", 401));
  const decode = await jwt.verify(token, process.env.SECRET_KEY);
  if (!decode) return next(new AppError("Unauthorized user", 401));
  const credentials = await checkWithDatabase(decode.role);
  if (!credentials) return next(new AppError("Unauthorized user", 401));
  req.credentials = credentials;
  next();
});

export default authorizeToken;
