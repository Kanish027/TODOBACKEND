import Task from "../models/taskModel.js";

const newTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({
      title: title,
      description: description,
      user: req.user,
    });
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: "No Tasks",
      });
    }
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const isCompleted = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res.status(201).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task Deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { newTask, getTasks, isCompleted, deleteTask };
