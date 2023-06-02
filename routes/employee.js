import express from "express";
import {
  deleteEmployeeData,
  fetchEmployeeData,
  listAllEmployeeDetails,
  updateEmployeeData,
} from "../controllers/employee.js";
import authorizeToken from "../middleware/authorization.js";
const router = express.Router();

router.get("/", authorizeToken, listAllEmployeeDetails);
router
  .route("/:empid")
  .get(fetchEmployeeData)
  .delete(authorizeToken, deleteEmployeeData)
  .patch(authorizeToken, updateEmployeeData);

export default router;
