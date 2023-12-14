import express from "express";
import connectDatabase from "./data/database.js";
import env from "dotenv";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
env.config();

// Using Middlewares
app.use(express.json());
// It is used to access the cookie
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Database connection
connectDatabase();

app.use("/api/v1/users", userRouter);

app.use("/api/v1/tasks", taskRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on PORT ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
