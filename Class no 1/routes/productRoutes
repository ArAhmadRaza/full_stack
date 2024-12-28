const express = require("express");
const productRouter = express.Router();
const authVerify = require("../middlewares/auth");
const { getProducts, createProduct , deleteProduct , updateProduct } = require("../controllers/productController");


productRouter.get("/", authVerify, getProducts);
productRouter.post("/create", authVerify, createProduct);
productRouter.delete("/delete/:id", authVerify, deleteProduct);
productRouter.put("/update/:id", authVerify, updateProduct);



module.exports = productRouter;