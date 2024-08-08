const { protection } = require('../Controllers/auth.js');
const { getNumberList } = require('../Controllers/customer.js');
const { Router } = require('express');

const router = Router()

router.post('/number', protection, getNumberList)


module.exports = router;