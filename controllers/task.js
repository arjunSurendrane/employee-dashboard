import asynHandler from "express-async-handler";
import Task from "../models/tasks";
import AppError from "../utils/AppError";

export const fetchTaskData = async (empid) => {
  return await Task.aggregate([
    { $match: { empid } },
    {
      $group: {
        _id: null,
        data: { $push: "$$ROOT" },
        sumOfRating: { $sum: "$rating" },
      },
    },
  ]);
};

/**
 * Add Task
 * POST /task
 */
export const addTask = asynHandler(async (req, res, next) => {
  const { taskName, empid } = req.body;
  if (!taskName || !empid)
    return next(new AppError("must fill all fields", 404));
  const task = await Task.create({ taskName, empid });
  res.status(200).json({ status: "success", data: { task } });
});

/**
 * Update Task
 * PATCH /task/:taskid
 */
export const updateTask = asynHandler(async (req, res, next) => {
  const { taskName } = req.body;
  const { taskid } = req.params;
  if (!taskName) return next(new AppError("must fill all fields", 404));
  const task = await Task.findByIdAndUpdate(taskid, { taskName });
  res.status(200).json({ status: "success", data: { task } });
});

/**
 * Delete Task
 * DELETE /task/:taskid
 */
export const deleteTask = asynHandler(async (req, res, next) => {
  const { taskid } = req.params;
  await Task.findByIdAndDelete(taskid);
  res.status(200).json({ status: "success" });
});

/**
 * Feedback
 * PATCH /task/:taskid/rating
 */
export const addRating = asynHandler(async (req, res, next) => {
  const { rating, feedback, hrid } = req.body;
  const { taskid } = req.params;
  const task = await Task.findByIdAndUpdate(taskid, { rating, feedback, hrid });
  res.status(200).json({ status: "success" });
});
