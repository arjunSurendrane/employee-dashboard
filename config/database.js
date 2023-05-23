import mongoose from "mongoose";

function connectToMongoDB() {
  const db = "mongodb://localhost:27017/testingMavens";
  mongoose
    .connect(db)
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((err) => {
      console.log(`can't connect to database`);
    });
}

export default connectToMongoDB;
