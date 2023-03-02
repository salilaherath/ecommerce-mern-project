import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
	name: { type: String, required: true },
});

const categorySchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		subCategories: [subCategorySchema],
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
