import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	try {
		console.log('addorderItemsControllerreached');
		console.log(req.user._id);
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice,
		} = req.body;
		if (orderItems && orderItems.length === 0) {
			res.status(400);
			throw new Error('No order Items');
			return;
		} else {
			const order = new Order({
				user: req.user._id,
				orderItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				totalPrice,
			});
			const createdOrder = await order.save();
			res.status(201).json(createdOrder);
		}
	} catch (error) {
		console.log(error);
	}
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private

// @desc    Update order status
// @route   GET /api/orders/:id/status
// @access  Private/Admin

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin

export { addOrderItems };
