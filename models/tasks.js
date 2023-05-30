import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  taskName: { type: String, required: [true, "task must have task name"] },
  rating: String,
  feedback: String,
  hrId: { type: mongoose.Types.ObjectId, ref: "hrModel" },
});

const Task = mongoose.model("task", taskSchema, "task");
export default Task;
