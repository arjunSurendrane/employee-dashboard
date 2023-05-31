import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name"],
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  jobtitle: {
    type: String,
    required: [true, "user must have a jobtitle"],
  },
  department: String,
  dateOfHire: Date,
});

const Employee = mongoose.model("employee", employeeSchema, "employee");
export default Employee;
