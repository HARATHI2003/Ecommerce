const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart || cart.items.length === 0)
    return res.status(400).json({ message: 'Cart is empty' });

  let total = 0;
  for (let item of cart.items) {
    const product = await Product.findById(item.productId);
    if (product.stock < item.quantity) {
      return res.status(400).json({ message: `Not enough stock for ${product.name}` });
    }
    product.stock -= item.quantity;
    await product.save();
    total += item.quantity * product.price;
  }

  const order = await Order.create({
    userId: req.user._id,
    items: cart.items,
    total
  });

  await Cart.deleteOne({ userId: req.user._id });

  res.status(201).json(order);
};
