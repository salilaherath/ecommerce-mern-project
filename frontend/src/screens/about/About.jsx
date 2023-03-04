import './about.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedSubcategory, setSelectedSubcategory] = useState(null);
	useEffect(() => {
		async function fetchCategories() {
			const { data } = await axios.get('/api/category');
			setCategories(data);
		}

		fetchCategories();
	}, []);

	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
		setSelectedSubcategory(null);
	};

	const handleSubcategoryChange = (event) => {
		setSelectedSubcategory(event.target.value);
	};

	const subcategoryOptions = selectedCategory
		? categories
				.find((category) => category.title === selectedCategory)
				.subCategories.map((subcategory) => (
					<option key={subcategory._id} value={subcategory.name}>
						{subcategory.name}
					</option>
				))
		: [];

	return (
		<div>
			<label htmlFor="category-select">Category:</label>
			<select
				id="category-select"
				value={selectedCategory}
				onChange={handleCategoryChange}
			>
				<option value="">-- Select a category --</option>
				{categories.map((category) => (
					<option key={category._id} value={category.title}>
						{category.title}
					</option>
				))}
			</select>
			{selectedCategory && (
				<div>
					<label htmlFor="subcategory-select">Subcategory:</label>
					<select
						id="subcategory-select"
						value={selectedSubcategory}
						onChange={handleSubcategoryChange}
					>
						<option value="">-- Select a subcategory --</option>
						{subcategoryOptions}
					</select>
				</div>
			)}
		</div>
	);
};

export default About;
