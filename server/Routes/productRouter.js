const { protection } = require('../Controllers/auth.js');
const { getProduct, addProduct, deleteProduct, updateProduct } = require('../Controllers/product.js');
const { Router } = require('express');

const router = Router()

router.get('/product', protection, getProduct)

router.post('/product', protection, addProduct)

router.delete('/product/:id', protection, deleteProduct)

router.put('/product', protection, updateProduct)


module.exports = router;