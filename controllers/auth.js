import bcrypt from "bcryptjs";
import AppError from "../utils/AppError";
import asyncHandler from "express-async-handler";
import Hrmodel from "../models/hrmode";
import Employee from "../models/employee";

/**
 * Admin Login
 * POST /admin/login
 */
export const adminLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { ADMIN_MAIL, ADMIN_PASS } = process.env;
  // check email and password is exist or not
  if (!email || !password) {
    return next(new AppError("Please write email and password", 404));
  }
  // compare email and password
  if (!(ADMIN_MAIL == email) || !(ADMIN_PASS == password)) {
    return next(new AppError("Incorrect email id or password", 404));
  }
  // send response
  res.status(200).json({ status: "success" });
};

/**
 * HR Login
 * POST /hr/login
 */
export const hrLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // check email and password
  if (!email || !password) {
    return next(new AppError("Please write email and password", 404));
  }
  // find hr document from hr collection
  const hr = await Hrmodel.findOne({ email }).select("+password");
  if (!hr) return next(new AppError("user doesnot exist", 401));
  // compare password
  const comparePassword = await bcrypt.compare(password, hr.password);
  if (!comparePassword) return next(new AppError("incorrect password", 401));
  // send response
  res.status(200).json({ status: "success" });
});

/**
 * HR Signup
 * POST /hr/signup
 */
export const hrSignup = asyncHandler(async (req, res, next) => {
  const { name, email, password, department } = req.body;
  // verify request body
  if (!name || !email || !password || !department) {
    return next(new AppError("fill all the fields", 404));
  }
  // encrypt password
  const cryptedPassword = await bcrypt.hash(password, 12);
  // create new document for hr
  const hr = await Hrmodel.create({
    name,
    email,
    password: cryptedPassword,
    department,
  });
  // send success response
  res.json(200).json({ status: "success" });
});

/**
 * Employee Login
 * POST /employee/login
 */
export const employeeLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // check email and password
  if (!email || !password) {
    return next(new AppError("Please write email and password", 404));
  }
  // find employee document from employee collection
  const employee = await Employee.findOne({ email }).select("+password");
  if (!employee) return next(new AppError("User doesnot exist", 401));
  // compare password
  const comparePassword = await bcrypt.compare(password, employee.password);
  if (!comparePassword) return next(new AppError("Incorrect password", 401));
  // send response
  res.status(200).json({ status: "success" });
});

/**
 * Employee Signup
 * POST /employee/signup
 */
export const employeeSignup = asyncHandler(async (req, res, next) => {
  const { name, email, password, jobtitle, department, dateOfHire } = req.body;
  if (!name || !email || !password || !jobtitle || !department || !dateOfHire) {
    return next(new AppError("Please fill all fields"));
  }
  //encrypt password
  const encryptPassword = await bcrypt.hash(password, 12);
  // create employee document
  const employee = Employee.create({
    name,
    email,
    password: encryptPassword,
    jobtitle,
    department,
    dateOfHire,
  });
  // send response
  req.status(200).json({ status: "success" });
});
