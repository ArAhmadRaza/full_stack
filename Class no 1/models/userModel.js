const mongoose = require("mongoose");




const userSchema = new mongoose.Schema({
    name: {
      required: true,
      type: String,
      // trim: true,  // removes leading and trailing whitespaces
      // minlength: 3, // minimum length of the name field
      // maxlength: 50 // maximum length of the name field
    },
    email: {
      required: true,
      type: String,
      unique: true
    },
    password: {
      required: true,
      type: String
    },
    address: {
      type: String,
      required: false,
      default: "Unknown"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })
  
  const User = mongoose.model("User", userSchema);
  
module.exports = User;
