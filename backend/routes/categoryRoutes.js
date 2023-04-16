import express from 'express';
import {
	addCategory,
	getAllCategories,
	getAllSubCategories,
	getCategoryById,
} from '../controllers/categoryController.js';
const router = express.Router();

import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, isAdmin, addCategory).get(getAllCategories);
router.route('/:mainCategory').get(getAllSubCategories);
router.route('/:id').get(getCategoryById);

export default router;
