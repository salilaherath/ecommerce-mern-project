import express from 'express';
const router = express.Router();
import {
	authUser,
	registerUser,
	getUserProfile,
	getUsers,
	getUser,
	deleteUser,
	updateUser,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router
	.route('/:id')
	.get(protect, isAdmin, getUser)
	.delete(protect, isAdmin, deleteUser)
	.put(protect, updateUser);

export default router;
