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

// @desc    Update order status
// @route   POST /api/orders/:id/status
// @access  Private Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{ orderStatus: req.body.orderStatus },
			{ new: true }
		);
		if (!updatedOrder) {
			return res.status(404).send({ message: 'Order not found' });
		}

		res.json({ orderStatus: updatedOrder.orderStatus });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Error updating order status' });
	}
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id });
		res.json(orders);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
	try {
		const orders = await Order.find()
			.populate({
				path: 'user',
				select: '_id email',
			})
			.sort({ delivery: 1 })
			.sort({ shipping: 1 })
			.sort({ createdAt: -1 });

		let totalRevenue = 0;

		orders.forEach((order) => {
			totalRevenue += order.totalPrice;
		});

		const totalOrders = await Order.countDocuments();

		res.status(200).json({ orders, totalRevenue, totalOrders });
	} catch (error) {
		throw new Error(error);
	}
});

//GET Latest 8 orders
const getLatestOrders = asyncHandler(async (req, res) => {
	const latestOrders = await Order.find().sort({ createdAt: -1 }).limit(8);
	res.json(latestOrders);
});

export {
	addOrderItems,
	getOrderByID,
	updateOrderToDelivered,
	getMyOrders,
	getAllOrders,
	updateOrderStatus,
	getLatestOrders,
};
