const { protection } = require('../Controllers/auth.js');
const { getPurchase, addPurchase, deletePurchase} = require('../Controllers/purchase.js');
const { Router } = require('express');

const router = Router()

router.get('/purchase', protection, getPurchase)

router.post('/purchase', protection, addPurchase)

router.delete('/purchase/:id', protection, deletePurchase)

// router.put('/purchase', protection, updatePurchase)


module.exports = router;