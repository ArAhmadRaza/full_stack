const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  //get products from database
  try {
    // const products = await Product.find({name:"Samsung S24 Ultra", price:{ $gt: 1000 }}.limit(5).sort({price:1}).select({name:1,price:1,description:1}));

    // let search = req.body.search
    // let searchQuery = new RegExp(search, "i")
    // const products = await Product.find({name:{$regex: searchQuery}});
    const products = await Product.find();
    
    // for Paginate
    /*
    const options = {
      page: req?.body?.page || 1,
      limit: req?.body?.limit || 10,
    };
*/
    // const products = Product.paginate({}, options)

    return res.status(200).json({
      products: products,
      message: "All products fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      product: [],
      message: "Server Error",
      error: error,
    });
  }
};

const createProduct = async (req, res) => {
  //create a new product
  try {
    const newProduct = new Product({
      name: req?.body?.name,
      price: req?.body?.price,
      description: req?.body?.description,
      image: req?.body?.image,
    });
    const result = await newProduct.save();
    console.log("Product Created Successfully", result);
    res.status(201).json({
      newProduct: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      newProduct: [],
      message: "Server Error in creating product",
      error: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  //delete a product
  try {
    const product = await Product.findById(req.params.id);
    console.log("Product Deleted Successfuly", product);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    await product.remove();
    res.status(200).json({
      product: product,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      product: [],
      message: "Server Error in deleting product",
      error: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    product.name = req?.body?.name;
    product.price = req?.body?.price;
    product.description = req?.body?.description;
    product.image = req?.body?.image;
    const updatedProduct = await product.save();
    res.status(200).json({
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      product: [],
      message: "Server Error in updating product",
      error: error,
    });
  }
};



module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
