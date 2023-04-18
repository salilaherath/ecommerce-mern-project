import express from 'express';
import {
	addOrderItems,
	getAllOrders,
	getLatestOrders,
	getMonthlyOrders,
	getMyOrders,
	getOrderByID,
	updateOrderStatus,
	updateOrderToDelivered,
} from '../controllers/orderController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router
	.route('/')
	.post(protect, addOrderItems)
	.get(protect, isAdmin, getAllOrders);
router.route('/latest').get(protect, isAdmin, getLatestOrders);
router.route('/monthly').get(protect, isAdmin, getMonthlyOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/status').put(protect, isAdmin, updateOrderStatus);
router.route('/:id/deliver').put(protect, updateOrderToDelivered);
router.route('/:id').get(protect, getOrderByID);

export default router;
