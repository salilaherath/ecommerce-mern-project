import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

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
			itemsPrice,
			shippingPrice,
			totalPrice,
			paymentResult,
		} = req.body;
		if (orderItems && orderItems.length === 0) {
			res.status(400);
			throw new Error('No order Items');
		} else {
			const order = new Order({
				user: req.user._id,
				orderItems,
				shippingAddress,
				itemsPrice,
				shippingPrice,
				totalPrice,
				paymentResult,
			});
			const createdOrder = await order.save();
			orderItems.map((item) => {
				console.log('item');
				console.log(item);
				Product.findById(item.product).then(
					(product) => {
						console.log(product);
						const selectedVariant = product.variation.find(
							(variant) => variant._id.toString() === item.variant.toString()
						);
						console.log(selectedVariant);
						if (selectedVariant) {
							selectedVariant.countInStock =
								selectedVariant.countInStock - item.qty;
							product.save();
						}
					},
					(err) => {
						throw new Error(err);
					}
				);
			});
			const resorder = await Order.findById(createdOrder._id);

			res.status(201).json(createdOrder);
		}
	} catch (error) {
		throw new Error(error);
		console.log(error);
	}
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderByID = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);
	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc    Update order to delivered
// @route   POST /api/orders/:id
// @access  Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.status(200).json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin

export { addOrderItems, getOrderByID, updateOrderToDelivered, getMyOrders };
