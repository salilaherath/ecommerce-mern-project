import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	try {
		const newProduct = await Product.create(req.body);
		res.json(newProduct);
	} catch (error) {
		throw new Error(error);
	}
});

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductsById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body);
		if (product) {
			const updatedProduct = await Product.findById(id);
			res.json(updatedProduct);
		} else {
			res.status(404);
			throw new Error('Product not found');
		}
	} catch (error) {
		throw new Error(error);
	}
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public

export {
	createProduct,
	getProducts,
	getProductsById,
	updateProduct,
	deleteProduct,
};
