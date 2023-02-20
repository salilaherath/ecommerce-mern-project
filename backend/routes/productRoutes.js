import express from 'express';
const router = express.Router();
import {
	createProduct,
	getProducts,
	getProductsById,
} from '../controllers/productController.js';

router.route('/').get(getProducts);
router.route('/:id').get(getProductsById);
router.route('/').post(createProduct);

export default router;
