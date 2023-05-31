import mongoose from "mongoose";

const hrmodelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  department: String,
});

const Hrmodel = mongoose.model("hrmodel", hrmodelSchema, "hrmodel");

export default Hrmodel;
