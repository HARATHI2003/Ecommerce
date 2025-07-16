const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCart,
  updateCart,
  addToCart  // 👈 Add this
} = require('../controllers/cartController');

router.post('/', auth, addToCart);  // 👈 Add this line
router.get('/', auth, getCart);
router.put('/', auth, updateCart);

module.exports = router;
