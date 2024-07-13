const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define('Order', {
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    }
});

Order.belongsTo(User);
Order.belongsToMany(Product, { through: 'OrderProducts' });

module.exports = Order;

