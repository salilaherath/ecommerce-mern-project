import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

//Add New Category
const addCategory = asyncHandler(async (req, res) => {
	const { title, subCategories } = req.body;
	try {
		const category = new Category({ title, subCategories });
		const savedCategory = await category.save();
		res.status(201).json(savedCategory);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//Get all categories
const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find({});
		res.status(200).json(categories);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Get all subcategories
const getAllSubCategories = async (req, res) => {
	try {
		const subCategories = await Category.findOne({
			title: req.params.mainCategory,
		}).select('subCategories');
		res.status(200).json(subCategories);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Get category by ID
const getCategoryById = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({ message: 'Category not found' });
		}
		res.status(200).json(category);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export { addCategory, getAllCategories, getCategoryById, getAllSubCategories };
