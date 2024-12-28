const express = require("express");
const { doLogin, doSignup } = require("../controllers/authController");
const authRouter = express.Router();



//auth login
authRouter.post("/login",doLogin)
  

//auth signup
authRouter.post("/signup",doSignup)
  
module.exports = authRouter;








