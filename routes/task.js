import express from "express";
import {
  addRating,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task.js";
const router = express.Router();

router.post("/:empid", addTask);
router.route("/:taskid").patch(updateTask).delete(deleteTask);
router.patch("/:taskid/rating", addRating);

export default router;
