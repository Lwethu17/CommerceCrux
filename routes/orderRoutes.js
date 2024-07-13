const express = require('express');
const { createOrder, getOrder, handlePayment } = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/:id', authenticate, getOrder);
router.post('/pay', authenticate, handlePayment);

module.exports = router;

