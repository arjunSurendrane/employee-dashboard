import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import Hrmodel from "../models/hrmodel.js";
import Employee from "../models/employee.js";

const checkWithDatabase = {
  admin: (id, password) => {
    return id == process.env.ADMIN_MAIL && password == process.env.ADMIN_PASS;
  },
  hr: async (id) => await Hrmodel.findById(id),
  employee: async (id) => await Employee.findById(id),
};

/**
 * JWT Authorization
 */
const authorizeToken = asyncHandler(async (req, res, next) => {
  let token;
  // check token in request
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(new AppError("Unauthorized user", 401));
  // decode jwt token
  const decode = await jwt.verify(token, process.env.SECRET_KEY);
  if (!decode) return next(new AppError("Unauthorized user", 401));
  // compare id with database
  const credentials = await checkWithDatabase(decode.role);
  if (!credentials) return next(new AppError("Unauthorized user", 401));
  // store credential detail is reques
  req.credentials = credentials;
  // give permission to access next middleware
  next();
});

export default authorizeToken;
