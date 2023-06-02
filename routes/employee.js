import express from "express";
import {
  deleteEmployeeData,
  fetchEmployeeData,
  listAllEmployeeDetails,
  updateEmployeeData,
} from "../controllers/employee.js";
const router = express.Router();

router.get("/", listAllEmployeeDetails);
router
  .route("/:empid")
  .get(fetchEmployeeData)
  .delete(deleteEmployeeData)
  .patch(updateEmployeeData);

export default router;
