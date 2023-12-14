import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import {
  deleteTask,
  getTasks,
  isCompleted,
  newTask,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/all", isAuthenticated, getTasks);

router
  .route("/:id")
  .put(isAuthenticated, isCompleted)
  .delete(isAuthenticated, deleteTask);

export default router;
