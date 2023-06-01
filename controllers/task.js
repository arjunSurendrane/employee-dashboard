import asynHandler from "express-async-handler";
import Task from "../models/tasks";

export const fetchTaskData = asynHandler(async (empid) => {
  const taskData = await Task.aggregate([
    { $match: { empid } },
    {
      $group: {
        _id: null,
        data: { $push: "$$ROOT" },
        sumOfRating: { $sum: "$rating" },
      },
    },
  ]);
  return taskData;
});
