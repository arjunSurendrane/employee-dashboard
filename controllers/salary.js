import asynHandler from "express-async-handler";
import Salary from "../models/salary.js";

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

/**
 * Incriment salary
 * PATCH /salary/:empid/incriment
 */
export const salaryIncriment = asynHandler(async (req, res, next) => {
  const { incriment } = req.body;
  var m_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  const month = m_names[d.getMonth()];
  const { empid } = req.params;
  const salary = await Salary.findOneAndUpdate(
    { empid },
    {
      $inc: { currentSalary: parseInt(incriment) },
      incriment,
      month,
    },
    { new: true }
  );
  res.status(200).json({ status: "success", data: { salary } });
});

/**
 * Incriment bonus
 * PATCH /salary/:empid/bonus
 */
export const incrimentBonus = asynHandler(async (req, res, next) => {
  const { bonus } = req.body;
  const { empid } = req.params;
  const salary = await Salary.findOneAndUpdate(
    { empid },
    {
      bonus,
    }
  );
  res.status(200).json({ status: "success", data: { salary } });
});
