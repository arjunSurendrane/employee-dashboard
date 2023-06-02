import asynHandler from "express-async-handler";
import Task from "../models/tasks.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";

export const fetchTaskData = async (empid) => {
  return await Task.aggregate([
    { $match: { empid: new mongoose.Types.ObjectId(empid) } },
    {
      $group: {
        _id: null,
        data: { $push: "$$ROOT" },
        sumOfRating: { $sum: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);
};

/**
 * Add Task
 * POST /task
 */
export const addTask = asynHandler(async (req, res, next) => {
  const { taskName } = req.body;
  const { empid } = req.params;
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
  const { rating } = req.body;
  const { taskid } = req.params;
  const task = await Task.findByIdAndUpdate(taskid, { rating });
  res.status(200).json({ status: "success" });
});
