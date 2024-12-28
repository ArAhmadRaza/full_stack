const mongoose = require("mongoose");




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
  
module.exports = User;
