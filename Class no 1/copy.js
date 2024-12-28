const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
require("dotenv").config();

// MongoDB URI from environment variables or default to a placeholder
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/test";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const secretKey = process.env.SECRET_KEY || "hfbv#@#^*568gfdfgjdsf;;./5348";

const authVerify = async (req, res, next) => {
  try {
    if(!req?.headers?.authorization){
      res.status(501).json({
        data: [],
        message: "Error in authVerify",
        error: "Login is required",
      }); 
    }
    let token = req?.headers?.authorization;
    let decoded = jwt.verify(token, secretKey);
    console.log("decoded: ", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error in authVerify",
      error: error.message,
    });

  }
}









// Function to connect MongoDB with mongoose
const connectMongoDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri); // Removed deprecated options
    console.log("MongoDB Connected");
    console.log(
      "---------------------------------__--___--____--___---____---____---___"
    );
  } catch (error) {
    console.error("MongoDB Connection Error: ", error.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

// Enable Mongoose debugging (optional)
mongoose.set("debug", true);
connectMongoDB();

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false, // Default to false if not provided
  },
  id: {
    type: Number,
    unique: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

// Define the Todo model
const Todo = mongoose.model("Todo", todoSchema);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Create a new todo
app.post("/todos/create", async (req, res) => {
  try {
    // Create a new Todo instance from the request body
    const newTodo = new Todo({
      title: req?.body?.title,
      // email: req?.body?.email,
      description: req?.body?.description,
      completed: req?.body?.completed, 
      id: req?.body?.id,
    });
    console.log("newTodo: -=== =================-=-=-=-=-=-=-= ", newTodo);

    // Save the Todo to the database
    const savedTodo = await newTodo.save();
    console.log("savedTodo: -====================-=-=-=-=-=-=-= ", savedTodo);

    // Respond with the saved Todo
    res.status(201).json({
      data: savedTodo,
      message: "Todo created successfully",
    });
  } catch (error) { 
    console.error("Error creating todo:", error.message);

    // Respond with an error message
    res.status(500).json({
      data: null,
      message: "Error creating todo",
      error: error.message,
    });
  }
}); 

//todos
//get todos
app.get("/todos", authVerify, async (req, res) => {
  try {
    //get all todos
    let getTodos = await Todo.find();
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
}); 
 
//get todo by id
app.get("/todos/:id", authVerify, async (req, res) => {
  try {
    let id = req?.params?.id;
    // let findTodoById = await Todo.findById({id:id})
    // let findTodoById = await Todo.findById(id)
    let findTodoById = await Todo.findOne({ id: id });
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
});

//delete todo
app.delete("/todos/delete/:id", authVerify, async (req, res) => {
  try {
    let id = req?.params?.id;
    let deleteTodo = await Todo.findOneAndDelete({ id: id });
    console.log("deleteTodo: ", deleteTodo);
    res.json({
      data: deleteTodo,
      message: "Success",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
});

//update todo
app.put("/todos/update/:id", authVerify, async (req, res) => {
  try {
    let id = req?.params?.id;
    let updateTodo = await Todo.findOneAndUpdate(
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
});


const userSchema = new mongoose.Schema({
  name: String,
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  address: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model("User", userSchema);


//auth signup
app.post("/auth/signup", async (req, res) => {
  try {
    console.log("req.body in signup: ", req.body);
    if(!req.body.password){
      res.status(501).json({
        data: [],
        message: "Error",
        error: "Password is required",
      });
    }
    let hashedPassword = await bcrypt.hashSync(req?.body?.password, 10);
    console.log("hashedPassword: ", hashedPassword);
    let newUser = new User({
      name: req?.body?.name,
      email: req?.body?.email,
      password: hashedPassword,
      address: req?.body?.address,
      createdAt: new Date()
    })
    let savedUser = await newUser.save();
    console.log("savedUser: ", savedUser);
    res.status(200).json({
      data: savedUser,
      message: "Success",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
})




//auth login
app.post("/auth/login", async (req, res) => {
  try {
    if(!req.body.email){
      res.status(501).json({
        data: [],
        message: "Error",
        error: "Email is required",
      });
    }

    if(!req.body.password){
      res.status(501).json({
        data: [],
        message: "Error",
        error: "Password is required",
      });
    }
    let findUser = await User.findOne({email: req.body.email});
    if(!findUser){
      res.status(501).json({
        data: [],
        message: "Error",
        error: "User not found",
      });
    }
    let isPasswordCorrect = await bcrypt.compareSync(req?.body?.password, findUser?.password);
    if(!isPasswordCorrect){
      res.status(501).json({
        data: [],
        message: "Error",
        error: "Password is incorrect",
      });
    }
    let token = jwt.sign({_id: findUser?._id, email: findUser?.email, name: findUser?.name}, secretKey);
    console.log("JWT Token : ", token);
    

    res.status(200).json({
      data: {
        email: findUser?.email,
        name: findUser?.name,
        address: findUser?.address,
        createdAt: findUser?.createdAt,
        token: token,
      },
      message: "User logged in successfully",
    });
  } catch (error) {  
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
})








// app.use((req, res, next) => {
//   console.log("Request Recieved: ", req.method, req.query, req.params);
//   console.log("Date Now: ", new Date().toISOString());
//   console.log("--------------------------------");
//   res.status(200).json({message: "Hello World"})
// })

app.put("/products", (req, res) => {
  let products = [
    {
      id: 1,
      title: "Product 1 by Ahmad ",
      price: 100,
      category: "Category 1",
      description: "Description 1",
      image: "Image 1",
    },
    {
      id: 2,
      title: "Product 2",
      price: 200,
      category: "Category 2",
      description: "Description 2",
      image: "Image 2",
    },
    {
      id: 3,
      title: "Product 3",
      price: 300,
      category: "Category 3",
      description: "Description 3",
      image: "Image 3",
    },
    {
      id: 4,
      title: "Product 4",
      price: 400,
      category: "Category 4",
      description: "Description 4",
      image: "Image 4",
    },
    {
      id: 5,
      title: "Product 5",
      price: 500,
      category: "Category 5",
      description: "Description 5",
      image: "Image 5",
    },
  ];
  res.json(products);
});

app.get("/users/:id", (req, res) => {
  try {
    // console.log("Query Params: ", req.params, req.query);
    // console.log("req.body Recieved: ", req.body);
    console.log("req.headers: ", req.headers);
    let data = {
      id: req.query.id,
      name: req.query.name,
      name: "Ahmad",
      age: 25,

      email: "ahmad@gmail.com",
    };
    res.status(201).json([
      {
        data: data,
        message: "Success",
      },
    ]);
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
});

// add - post method
// update - put method
// delete - delete method
// get - get method

app.post("/xyz",async (req, res) => {
  try {
    console.log("Token Recieved: ", req?.body?.token);
    let decoded = jwt.verify(req?.body?.token, secretKey);
    console.log("decoded: ", decoded);
    if(!decoded){
      res.status(501).json({
        data: [],
        message: "Error",
        error: "Login is required",
      });
    }

    res.status(200).json({
      data: decoded,
      message: "Login Successfully",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
