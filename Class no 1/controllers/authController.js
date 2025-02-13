const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
dotenv.config();
const secretKey =  process.env.SECRET_KEY;
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
      // console.log("Token: ", token);
      
  
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


  // const doSignup = async (req, res) => {
  //   try {
  //     const { name, email, password, address } = req.body;
  
  //     // Check if required fields are provided
  //     if (!password) {
  //       return res.status(400).json({
  //         data: [],
  //         message: "Error",
  //         error: "Password is required",
  //       });
  //     }
  
  //     // Hash the password asynchronously
  //     const hashedPassword = await bcrypt.hash(password, 10);
  
  //     // Create new user
  //     const newUser = new User({
  //       name,
  //       email,
  //       password: hashedPassword,
  //       address,
  //       createdAt: new Date(),
  //     });
  
  //     // Save user to the database
  //     const savedUser = await newUser.save();
  
  //     // Generate JWT token
  //     const token = jwt.sign({ id: savedUser._id, email: savedUser.email }, SECRET_KEY, { expiresIn: "7d" });
  
  //     // Respond with user data and token
  //     res.status(201).json({
  //       data: savedUser,
  //       token,
  //       message: "Signup successful",
  //     });
  //   } catch (error) {
  //     console.error("Signup Error:", error);
  //     res.status(500).json({
  //       data: [],
  //       message: "Error in Signup",
  //       error: error.message,
  //     });
  //   }
  // };
  

  const doSignup = async (req, res) => {
    try {
      // Check if password is provided
      if (!req?.body?.password) {
        return res.status(400).json({
          data: [],
          message: "Error",
          error: "Password is required",
        });
      }
  
      // Hash the password
      let hashedPassword = await bcrypt.hash(req?.body?.password, 10);
  
      // Create new user
      let newUser = new User({
        name: req?.body?.name,
        email: req?.body?.email,
        password: hashedPassword,
        address: req?.body?.address,
        createdAt: new Date(),
      });
  
      // Save user to the database
      let savedUser = await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: savedUser._id, email: savedUser.email }, // Payload
        process.env.SECRET_KEY, // Secret key (store in .env)
        { expiresIn: "7d" } // Token expiration
      );
  
      // Send confirmation email
      const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like SendGrid or Mailgun
        auth: {
          user: process.env.EMAIL,  // Your email address from which to send
          pass: process.env.EMAIL_PASSWORD,  // Your email password (use app-specific password for better security)
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL,  // Sender address
        to: savedUser.email,  // Recipient address (the user's email)
        subject: 'Signup Successful',
        text: `Hello ${savedUser.name},\n\nYou have successfully signed up to our platform.\n\nThank you for joining us!`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      // Send response with token
      res.status(201).json({
        data: savedUser,
        message: "Signup successful",
        token: token, // Send token to frontend
      });
    } catch (error) {
      res.status(500).json({
        data: [],
        message: "Error in Signup",
        error: error.message,
      });
    }
  };






  
  // const doSignup = async (req, res) => {
  //   try {
  //     // Check if password is provided
  //     if (!req?.body?.password) {
  //       return res.status(400).json({
  //         data: [],
  //         message: "Error",
  //         error: "Password is required",
  //       });
  //     }
  
  //     // Hash the password
  //     let hashedPassword = await bcrypt.hash(req?.body?.password, 10);
  
  //     // Create new user
  //     let newUser = new User({
  //       name: req?.body?.name,
  //       email: req?.body?.email,
  //       password: hashedPassword,
  //       address: req?.body?.address,
  //       createdAt: new Date(),
  //     });
  
  //     // Save user to the database
  //     let savedUser = await newUser.save();
  
  //     // Generate JWT token
  //     const token = jwt.sign(
  //       { userId: savedUser._id, email: savedUser.email }, // Payload
  //       process.env.SECRET_KEY, // Secret key (store in .env)
  //       { expiresIn: "7d" } // Token expiration
  //     );
  
  //     // Send response with token
  //     res.status(201).json({
  //       data: savedUser,
  //       message: "Signup successful",
  //       token: token, // Send token to frontend
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       data: [],
  //       message: "Error in Signup",
  //       error: error.message,
  //     });
  //   }
  // };
  

module.exports = {
  doLogin,
  doSignup,
};

