const mongoose = require("mongoose");

// Define the Todo schema
const todoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false, // Default to false if not provided
    },
    // id: {
    //   type: Number,
    //   unique: false,
    //   required: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
      required: false,
    },
  });
  
  // Define the Todo model
  const Todos = mongoose.model("Todos", todoSchema);
  
  module.exports = Todos;