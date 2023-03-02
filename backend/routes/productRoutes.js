import express from 'express';
import multer from 'multer';
const router = express.Router();
import {
	createProduct,
	deleteProduct,
	getLatestProducts,
	getProducts,
	getProductsById,
	updateProduct,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const uploadImage = multer({
	fileFilter: (req, file, cb) => {
		if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only image formats are allowed!'));
		}
	},
}).single('image');

router.route('/').get(getProducts);
router.route('/latest').get(getLatestProducts);
router
	.route('/:id')
	.get(getProductsById)
	.put(protect, isAdmin, updateProduct)
	.delete(protect, isAdmin, deleteProduct);
router.route('/').post(protect, isAdmin, uploadImage, createProduct);
export default router;
