const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (search) filter.name = { $regex: search, $options: 'i' };
  if (category) filter.category = category;

  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(products);
};

const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
};
