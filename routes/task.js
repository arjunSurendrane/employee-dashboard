import express from "express";
import {
  addRating,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task";
const router = express.Router();

router.post("/", addTask);
router.route("/:taskid").patch(updateTask).delete(deleteTask);
router.patch("/:taskid/rating", addRating);

export default router;
