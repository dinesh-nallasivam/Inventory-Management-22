const { protection } = require('../Controllers/auth.js');
const { addOrder, getOrder, getOrderItem } = require('../Controllers/order.js');
const { Router } = require('express');

const router = Router()

router.post('/order', protection, addOrder)

router.get('/order', protection, getOrder)

router.get('/order/:id', protection, getOrderItem)

module.exports = router;