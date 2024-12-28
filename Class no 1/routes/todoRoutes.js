const express = require("express");
const todoRouter = express.Router();

const {
  fetchTodos,
  getTodosById,
  updateTodo,
  deleteTodo,
  createTodo,
} = require("../controllers/todoController");
const authVerify = require("../middlewares/auth");


// Create a new todo
todoRouter.post("/create",authVerify, createTodo);

//todos
//get todos
todoRouter.get("/", authVerify, fetchTodos);

//get todo by id
todoRouter.get("/:id", authVerify, getTodosById);

//delete todo
todoRouter.delete("/delete/:id", authVerify, deleteTodo);

//update todo  
todoRouter.put("/update/:id", authVerify, updateTodo);

module.exports = todoRouter;

  