const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRET_KEY;

const User = require("../models/userModel");

const doLogin = async (req, res) => {
    try {
      if(!req?.body?.email){
        res.status(501).json({
          data: [],
          message: "Error in login",
          error: "Email is required",
        });
      }
  
      if(!req?.body?.password){
        res.status(501).json({
          data: [],
          message: "Error in login",
          error: "Password is required",
        });
      }
      let findUser = await User.findOne({email: req?.body?.email});
      if(!findUser){
        res.status(501).json({
          data: [], 
          message: "Error in login",
          error: "User not found",
        });
      }
      let isPasswordCorrect = await bcrypt.compareSync(req?.body?.password, findUser.password);
      if(!isPasswordCorrect){
        res.status(501).json({
          data: [],
          message: "Error in login",
          error: "Password is incorrect",
        });
      }
      let token = jwt.sign({_id: findUser._id, email: findUser.email, name: findUser.name}, secretKey);
      
  
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
        message: "Error in login",
        error: error.message,
      });
    }
  }

const doSignup =  async (req, res) => {
    try {
      if(!req.body.password){
        res.status(501).json({
          data: [],
          message: "Error",
          error: "Password is required",
        });
      }
      let hashedPassword = await bcrypt.hashSync(req?.body?.password, 10);
      let newUser = new User({
        name: req?.body?.name,
        email: req?.body?.email,
        password: hashedPassword,
        address: req?.body?.address,
        createdAt: new Date()
      })
      let savedUser = await newUser.save();
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
  }

module.exports = {
  doLogin,
  doSignup,
};

