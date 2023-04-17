import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}
	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Add or remove Admin
// @route   PUT /api/users/:userId/makeAdmin
// @access  Private Admin
const makeAdmin = asyncHandler(async (req, res) => {
	const userId = req.params.userId;
	const { isAdmin } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		user.isAdmin = isAdmin;
		await user.save();

		const message = isAdmin
			? 'User has been made an admin'
			: 'User is no longer an admin';
		return res.status(200).json({ message });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error' });
	}
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});

	res.json(users);
});

// @desc Get all customers
// @route GET /api/users/customers
// @access Private/Admin
const getCustomers = asyncHandler(async (req, res) => {
	try {
		const customers = await User.find({ isAdmin: false }).select('-password');
		res.status(200).json(customers);
	} catch (error) {
		throw new Error(error);
	}
});

//GET Customers count
const getCountOfCustomers = asyncHandler(async (req, res) => {
	try {
		const count = await User.countDocuments({ isAdmin: false });
		res.json(count);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// @desc Get a single user
// @route GET /api/users/:id
// @access Private/Admin
const getUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	// console.log(id);
	try {
		const getUser = await User.findById(id);
		res.json(getUser);
	} catch (error) {
		throw new Error(error);
	}
});

// @desc Delete a single user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	// console.log(id);
	try {
		const deleteUser = await User.findByIdAndDelete(id);
		res.json(deleteUser);
	} catch (error) {
		throw new Error(error);
	}
});

export {
	authUser,
	registerUser,
	getUserProfile,
	getUsers,
	getUser,
	deleteUser,
	updateUserProfile,
	getCustomers,
	getCountOfCustomers,
	makeAdmin,
};
