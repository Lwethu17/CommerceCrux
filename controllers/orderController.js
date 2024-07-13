const Order = require('../models/Order');
const Product = require('../models/Product');
const stripe = require('../config/stripe');


const createOrder = async (req, res) => {
    const { userId, products } = req.body;
    try {
        const order = await Order.create({ UserId: userId });
        await order.addProducts(products.map(p => ({ ProductId: p.id, quantity: p.quantity })));
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};


const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, { include: [Product] });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};


const handlePayment = async (req, res) => {
    const { orderId, token } = req.body;
    try {
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const charge = await stripe.charges.create({
            amount: order.totalPrice * 100,
            currency: 'usd',
            source: token,
            description: `Order ${orderId}`
        });
       

