import mongoose, { Mongoose } from "mongoose";

const salaySchema = new mongoose.Schema({
  currentSalary: Number,
  bonus: Number,
  incriment: Number,
  month: String,
  empid: {
    type: mongoose.Types.ObjectId,
    ref: "employee",
  },
});

const Salary = mongoose.model("salary", salaySchema, "salary");
export default Salary;
