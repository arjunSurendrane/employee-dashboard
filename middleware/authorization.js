import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";

/**
 * JWT Authorization of Admin
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
  console.log(token);
  // decode jwt token
  const decode = await jwt.verify(token, process.env.SECRET_KEY);
  if (!decode || decode.role == "Employee")
    return next(new AppError("Unauthorized user", 401));
  // give permission to access next middleware
  next();
});

export default authorizeToken;
