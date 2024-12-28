const Todos = require("../models/todoModel");
const connectMongoDB = require("../config/db");

const fetchTodos = async (req, res) => {
  try {
    //get all todos
    let getTodos = await Todos.find();
    console.log("todos: ", getTodos);

    res.status(200).json({
      message: "Success todos",
      data: getTodos,
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error in getting Todos",
      error: error.message,
    });
  }
};

const getTodosById = async (req, res) => {
  try {
    let id = req?.params?.id;
    // let findTodoById = await Todo.findById({id:id})
    // let findTodoById = await Todo.findById(id)
    let findTodoById = await Todos.findOne({ id: id });
    console.log("findTodoById: ", findTodoById);

    res.status(200).json({
      data: findTodoById,
      message: "Success in getting todo by id",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error in getting todo by id",
      error: error.message,
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const newTodo = new Todos({
      title: req?.body?.title,
      description: req?.body?.description,
      completed: req?.body?.completed,
      id: req?.body?.id,
      createdAt: new Date(),
    });
    console.log("newTodo: ====---------------------->>>>> ", newTodo);
    // await mongoose.set("debug", true);
    // await connectMongoDB();
    const savedTodo = await newTodo.save();
    console.log("savedTodo: ====---------------------->>>>> ", savedTodo);

    res.status(201).json({
      data: savedTodo,
      message: "Todo created successfully",
    });
  } catch (error) {
    // Respond with an error message
    res.status(500).json({
      data: [],
      message: "Error creating todo",
      error: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    let id = req?.params?.id;
    let updateTodo = await Todos.findOneAndUpdate(
      { id: id },
      {
        title: req?.body?.title,
        description: req?.body?.description,
        completed: req?.body?.completed,
      }
    );
    console.log("updateTodo: ", updateTodo);
    res.status(200).json({
      data: updateTodo,
      message: "Success",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    let id = req?.params?.id;
    let deleteTodo = await Todos.findOneAndDelete({ id: id });
    console.log("deleteTodo: ", deleteTodo); 
    res.json({
      data: deleteTodo,
      message: "Successfully deleted todo",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
};

module.exports = {
  fetchTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo,
};
