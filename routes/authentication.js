import express from "express";
import AppError from "../utils/AppError";
const router = express.Router();

/**
 * Admin Login
 */
router.post("/admin/login", (req, res, next) => {
  if (!req.body.email && req.body.password)
    return next(new AppError("Please write email and password", 404));
  if (
    !(
      process.env.ADMIN_MAIL == req.body.email &&
      process.env.ADMIN_PASS == req.body.password
    )
  ) {
    return next(new AppError("Incorrect email id or password", 404));
  }
  res.status(200).json({ status: "success" });
});

/**
 * HR Login
 */
router.post("/hr/login", (req, res) => {
  res.send("Welcome to Authentication route");
});

/**
 * Employee Login
 */
router.post("/employee/login", (req, res) => {
  res.send("Welcome to Authentication route");
});

export default router;
