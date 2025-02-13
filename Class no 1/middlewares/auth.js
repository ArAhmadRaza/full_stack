const jwt = require("jsonwebtoken");
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
  
  module.exports = authVerify;