import express from 'express';
const router = express.Router();
import {
	createProduct,
	deleteProduct,
	getProducts,
	getProductsById,
	updateProduct,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts);
router
	.route('/:id')
	.get(getProductsById)
	.put(protect, isAdmin, updateProduct)
	.delete(protect, isAdmin, deleteProduct);
router.route('/').post(protect, isAdmin, createProduct);

export default router;
