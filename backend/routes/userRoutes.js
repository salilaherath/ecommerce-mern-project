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
router.route('/:id').get(protect, getUser);
router.route('/:id').delete(protect, deleteUser);
router.route('/:id').put(updateUser);

export default router;
