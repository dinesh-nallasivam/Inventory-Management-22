const { protection } = require('../Controllers/auth.js');
const { addOrder } = require('../Controllers/order.js');
const { Router } = require('express');

const router = Router()

router.post('/order', protection, addOrder)

module.exports = router;