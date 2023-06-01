import express from "express";
import {
  adminLogin,
  deleteHr,
  employeeLogin,
  employeeSignup,
  hrLogin,
  hrSignup,
} from "../controllers/auth.js";
const router = express.Router();

/**
 * Admin
 */
router.post("/admin/login", adminLogin);

/**
 * HR
 */
router.post("/hr/login", hrLogin);
router.post("/hr/signup", hrSignup);
router.delete("/hr/:hrid", deleteHr);

/**
 * Employee
 */
router.post("/employee/login", employeeLogin);
router.post("/employee/signup", employeeSignup);

export default router;
