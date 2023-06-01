import asynHandler from "express-async-handler";
import Employee from "../models/employee";
import { salaryData } from "./salary";
import { fetchTaskData } from "./task";

/**
 * Fetch Employees Details
 * GET /employees
 */
export const listAllEmployeeDetails = asynHandler(async (req, res, next) => {
  // fetch data from database
  const employees = await Employee.find();
  // send response to client
  res.status(200).json({
    status: "success",
    data: {
      employees,
    },
  });
});

/**
 * Employee Data
 * GET /employee/:empid
 */
export const fetchEmployeeData = asynHandler(async (req, res, next) => {
  const { empid } = req.params;
  // fetch employee data, salary, task data from database
  const [employee, salary, tasks] = await Promise.all([
    Employee.findById(empid),
    salaryData(empid),
    fetchTaskData(empid),
  ]);
  //send response to client
  res.status(200).json({
    status: "success",
    data: {
      employee,
      salary,
      tasks,
    },
  });
});

/**
 * Delete Employee Data
 * DELETE /employee/:empid
 */
export const deleteEmployeeData = asynHandler(async (req, res, next) => {
  const { empid } = req.params;
  // delete employee data
  await Employee.findByIdAndRemove(empid);
  // send response back to client
  res.status(200).json({ status: "success" });
});

/**
 * Update Employee Data
 * PATCH /employee/:empid
 */
export const updateEmployeeData = asynHandler(async (req, res, next) => {
  const { empid } = req.params;
  const { name, email, password, jobtitle, department, dateOfHire } = req.body;
  const updateData = {
    name,
    email,
    password,
    jobtitle,
    department,
    dateOfHire,
  };
  // update employee data
  const employee = await Employee.findByIdAndUpdate(empid, updateData);
  // send response back to client
  res.status(200).json({
    status: "success",
    data: {
      employee,
    },
  });
});
