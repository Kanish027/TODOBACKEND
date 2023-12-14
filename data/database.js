import mongoose from "mongoose";

function connectDatabase() {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "AUTH",
    })
    .then(() => console.log("Database connection established"))
    .catch((err) => console.error(err));
}

export default connectDatabase;
