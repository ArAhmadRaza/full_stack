const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectMongoDB = require("./config/db");
const authRouter = require("./routes/authRoutes");
const todoRouter = require("./routes/todoRoutes");
const productRouter = require("./routes/productRoutes");
const app = express();
const port = process.env.PORT || 5000;

 
 


// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());







 




app.get("/", (req, res) => {
  res.send("Server is running");
});

// Enable Mongoose debugging (optional)
mongoose.set("debug", true);
connectMongoDB();



app.use("/auth", authRouter);
app.use("/todos", todoRouter);
app.use("/products", productRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});