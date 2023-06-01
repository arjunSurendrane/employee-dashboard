import asynHandler from "express-async-handler";
import Salary from "../models/salary";

/**
 * Get salary data
 */
export const salaryData = asynHandler(
  /**
   * Fetch salary data from database
   * @param {String} empid
   * @returns {Object}
   */
  async (empid) => {
    const employeeSalary = await Salary.findOne({ empid });
    return employeeSalary;
  }
);
