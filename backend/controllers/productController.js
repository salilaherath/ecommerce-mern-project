import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import path from 'path';
import { s3 } from '../server.js';

//@desc create product
//@route CREATE /api/products/:id
//@access public/Admin
const createProduct = asyncHandler(async (req, res) => {
	console.log(req.file);
	const newProduct = new Product({
		user: req.user._id,
		...req.body,
	});
	const Key = `${newProduct._id}-image${path.extname(req.file.originalname)}`;
	const uploadParams = {
		Key: Key,
		Bucket: 'vintage-clothing-product-images',
		Body: req.file.buffer,
	};
	s3.putObject(uploadParams, async (err, data) => {
		if (err) {
			res.status(400);
			throw new Error(`Failed to upload file to Server, please retry` + err);
		}
		if (data) {
			newProduct[
				'image'
			] = `https://vintage-clothing-product-images.s3.ap-south-1.amazonaws.com/${Key}`;
			await newProduct.save().then(
				(data) => res.json(`Product Successfully added`),
				(error) => {
					let deleteParams = {
						Key: Key,
						Bucket: 'vintage-clothing-product-images',
					};
					s3.deleteObject(deleteParams, (err, data) => {
						if (err) {
							res.status(500);
							throw new Error(
								'Failed to add product to System and also failed delete the uploaded file from Bucket:' +
									err
							);
						}
						if (data) {
							res.status(500);
							throw new Error(`Failed to add product to the system` + error);
						}
					});
				}
			);
		}
	});
});

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc Fetch latest 8 products
// @route GET /api/products/latest
// @access Public
const getLatestProducts = asyncHandler(async (req, res) => {
	// try {
	// 	const latestProducts = await Product.find()
	// 		.sort({ createdAt: -1 })
	// 		.limit(8);
	// 	res.json(latestProducts);
	// } catch (error) {
	// 	res.status(404);
	// 	throw new Error('Products not found');
	// }
	const category = req.query.category || '';
	const latestProducts = await Product.find({ mainCategory: category })
		.sort({ createdAt: -1 })
		.limit(8);
	res.json(latestProducts);
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
	getLatestProducts,
};
