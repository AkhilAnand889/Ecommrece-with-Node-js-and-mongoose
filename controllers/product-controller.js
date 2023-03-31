const Product = require("../models/productSchema");

const getProducts = async (req, res) => {
  try {
    const result = await Product.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getProductsByCategory = async (req, res) => {
  const cName = req.params.categoryName;
  try {
    if (cName === "top deals") {
      const result = await Product.find({}).skip(15);
      res.json(result);
    } else if (cName === "top offers") {
      const result = await Product.find({}).skip(5);
      res.json(result);
    } else {
      const result = await Product.find({ category: cName });
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await Product.findById(productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  };
};

const addProduct = async (req, res) => {
  const productData = {
    url: "",
    detailUrl:
      "",
    title: {
      shortTitle: "",
      longTitle:
        "",
    },
    price: {
      mrp: 67678,
      cost: 19000,
      discount: "60%",
    },
    discount: "Extra ₹723 off",
    tagline: "Trending",
    category: "furniture",
  };
  try {
    const product = new Product(productData);
    await product.save();
    res.json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  addProduct,
};
