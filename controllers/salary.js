import asynHandler from "express-async-handler";
import Salary from "../models/salary";

export const salaryData = asynHandler(async (empid) => {
  const employeeSalary = await Salary.findOne({ empid });
  return employeeSalary;
});
