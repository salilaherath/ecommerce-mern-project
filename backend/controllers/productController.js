import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//Create product
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

export { createProduct, getProducts, getProductsById };
