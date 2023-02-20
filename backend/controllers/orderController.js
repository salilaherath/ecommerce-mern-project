import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

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
