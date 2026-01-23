import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category, image } = req.body;
    const product = new Product({
      user_id: req.user.userId,
      name,
      description,
      price,
      quantity,
      category,
      image,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select("-user_id");
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Project Not Found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
};
