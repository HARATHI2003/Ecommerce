const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/', auth, getProducts);
router.post('/', auth, allowRoles('admin'), addProduct);
router.put('/:id', auth, allowRoles('admin'), updateProduct);
router.delete('/:id', auth, allowRoles('admin'), deleteProduct);

module.exports = router;
