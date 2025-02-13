const express = require("express");
const productRouter = express.Router();
// const authVerify = require("../middlewares/auth");
const { getProducts, createProduct , deleteProduct , updateProduct } = require("../controllers/productController");


productRouter.get("/", getProducts);
productRouter.post("/create", createProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.put("/update/:id", updateProduct);



module.exports = productRouter;