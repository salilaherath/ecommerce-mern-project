import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, TextField } from '@mui/material';
import { Field, FieldArray, Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/Header';
import productService from '../../../features/products/productService';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const AddProducts = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const colors = [
		'Red',
		'Green',
		'Blue',
		'White',
		'Black',
		'Brown',
		'Yellow',
		'Purple',
		'Gray',
		'Maroon',
		'Pink',
	];

	const sizeGroup1 = ['S', 'M', 'L', 'XL', '2XL'];

	const sizeGroup2 = ['28', '29', '30', '32', '34', '36', '38'];

	const handleFormSubmit = async (values) => {
		console.log(values);
		await productService.addProducts(values).then(() => {});
	};

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
					<MenuItem key={subcategory._id} value={subcategory.name}>
						{subcategory.name}
					</MenuItem>
				))
		: [];

	return (
		<Box m="20px">
			<Header title="ADD PRODUCTS" subtitle="Add New Products to the System" />

			<Formik
				onSubmit={handleFormSubmit}
				initialValues={initialValues}
				validationSchema={productSchema}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
					setFieldValue,
				}) => (
					<form onSubmit={handleSubmit}>
						<Grid
							container
							mr="500px"
							spacing={3}
							sx={{
								'& > div': { gridColumn: isNonMobile ? undefined : 'span 6' },
							}}
						>
							<Grid item sm={6}>
								<Field
									as={TextField}
									fullWidth
									variant="filled"
									type="text"
									label="Name"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.name}
									name="name"
									error={!!touched.name && !!errors.name}
									helperText={touched.name && errors.name}
									sx={{ gridColumn: 'span 3' }}
									autoComplete="off"
								/>
							</Grid>
							<Grid item sm={6}>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Price"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.price}
									name="price"
									error={!!touched.price && !!errors.price}
									helperText={touched.price && errors.price}
									sx={{ gridColumn: 'span 3' }}
									autoComplete="off"
								/>
							</Grid>
							<Grid item sm={6}>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Description"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.description}
									name="description"
									error={!!touched.description && !!errors.description}
									helperText={touched.description && errors.description}
									sx={{ gridColumn: 'span 3' }}
									autoComplete="off"
								/>
							</Grid>
							<Grid item sm={6}>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Brand"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.brand}
									name="brand"
									error={!!touched.brand && !!errors.brand}
									helperText={touched.brand && errors.brand}
									sx={{ gridColumn: 'span 3' }}
									autoComplete="off"
								/>
							</Grid>
							<Grid item sm={6}>
								<Select
									displayEmpty
									fullWidth
									variant="filled"
									onBlur={handleBlur}
									onChange={(e) => {
										handleCategoryChange(e);
										setFieldValue('mainCategory', e.target.value);
									}}
									value={values.mainCategory}
									name="mainCategory"
									error={!!touched.mainCategory && !!errors.mainCategory}
									helperText={touched.mainCategory && errors.mainCategory}
									sx={{ gridColumn: 'span 3' }}
									renderValue={(selected) => (
										<div>{selected || 'Select Main Category'}</div>
									)}
								>
									<MenuItem disabled>Select Main Category</MenuItem>
									{categories.map((category) => (
										<MenuItem key={category._id} value={category.title}>
											{category.title}
										</MenuItem>
									))}
								</Select>
							</Grid>
							<Grid item sm={6}>
								<Select
									displayEmpty
									fullWidth
									variant="filled"
									onBlur={handleBlur}
									onChange={(e) => {
										handleSubcategoryChange(e);
										setFieldValue('subCategory', e.target.value);
									}}
									value={values.subCategory}
									name="subCategory"
									error={!!touched.subCategory && !!errors.subCategory}
									helperText={touched.subCategory && errors.subCategory}
									sx={{ gridColumn: 'span 3' }}
									renderValue={(selected) => (
										<div>{selected || 'Select Sub Category'}</div>
									)}
								>
									<MenuItem disabled>Select Sub Category</MenuItem>
									{subcategoryOptions}
								</Select>
							</Grid>
							<Grid item sm={12}>
								<Button color="secondary" variant="contained" component="label">
									Upload Image
									<input
										hidden
										lable="Image"
										id="image-upload"
										accept=".jpeg, .png, .jpg"
										onChange={(e) => setFieldValue('image', e.target.files[0])}
										type="file"
									/>
								</Button>
							</Grid>
							<FieldArray
								name="variation"
								render={(arrayHelpers) => (
									<>
										{values.variation && values.variation.length > 0 ? (
											values.variation.map((item, index) => (
												<Grid
													item
													sm={6}
													sx={{
														display: 'flex',
														flexDirection: 'row',
														justifyContent: 'space-between',
													}}
													key={index}
												>
													<React.Fragment>
														{/* <TextField
															variant="filled"
															type="text"
															label="Color"
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.color}
															name={`variation[${index}].color`}
															error={!!touched.color && !!errors.color}
															helperText={touched.color && errors.color}
															autoComplete="off"
														/> */}
														<Select
															displayEmpty
															variant="filled"
															onChange={(e) => {
																setFieldValue(
																	`variation[${index}].color`,
																	e.target.value
																);
															}}
															value={values.variation[index]?.color || ''}
															name={`variation[${index}].color`}
															error={
																!!touched.variation?.[index]?.color &&
																!!errors.variation?.[index]?.color
															}
															helperText={
																touched.variation?.[index]?.color &&
																errors.variation?.[index]?.color
															}
															renderValue={(selected) => (
																<div>{selected || 'Color'}</div>
															)}
															sx={{ width: '200px' }}
														>
															<MenuItem disabled>Colors</MenuItem>
															{colors.map((color, index) => (
																<MenuItem key={index} value={color}>
																	{color}
																</MenuItem>
															))}
														</Select>
														<Select
															native
															displayEmpty
															label="Size"
															variant="filled"
															onChange={(e) => {
																setFieldValue(
																	`variation[${index}].size`,
																	e.target.value
																);
															}}
															value={values.variation[index]?.size || ''}
															name={`variation[${index}].size`}
															error={
																!!touched.variation?.[index]?.size &&
																!!errors.variation?.[index]?.size
															}
															helperText={
																touched.variation?.[index]?.size &&
																errors.variation?.[index]?.size
															}
															renderValue={(selected) => {
																const selectedOption = sizeGroup1
																	.concat(sizeGroup2)
																	.find((option) => option === selected);
																return selectedOption || 'Size';
															}}
															sx={{ width: '200px' }}
														>
															<option aria-label="None" value="" />
															<optgroup label="Size Group 1">
																{sizeGroup1.map((size, index) => (
																	<option key={index} value={size}>
																		{size}
																	</option>
																))}
															</optgroup>
															<optgroup label="Size Group 2">
																{sizeGroup2.map((size, index) => (
																	<option key={index} value={size}>
																		{size}
																	</option>
																))}
															</optgroup>
														</Select>
														{/* <TextField
															variant="filled"
															type="text"
															label="Size"
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.size}
															name={`variation[${index}].size`}
															error={!!touched.size && !!errors.size}
															helperText={touched.size && errors.size}
															autoComplete="off"
														/> */}
														<TextField
															variant="filled"
															type="text"
															label="Count In Stock"
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.countInStock}
															name={`variation[${index}]countInStock`}
															error={
																!!touched.countInStock && !!errors.countInStock
															}
															helperText={
																touched.countInStock && errors.countInStock
															}
															autoComplete="off"
														/>
														<Button
															type="button"
															color="secondary"
															variant="contained"
															onClick={() => arrayHelpers.remove(index)}
														>
															-
														</Button>
														<Button
															type="button"
															color="secondary"
															variant="contained"
															onClick={() =>
																arrayHelpers.insert(index + 1, {
																	size: '',
																	color: '',
																	countInStock: '',
																})
															}
														>
															+
														</Button>
													</React.Fragment>
												</Grid>
											))
										) : (
											<Button
												type="button"
												onClick={() =>
													arrayHelpers.push({
														size: '',
														color: '',
														countInStock: '',
													})
												}
											>
												Add a Variant
											</Button>
										)}
									</>
								)}
							/>
						</Grid>
						<Box display="flex" justifyContent="end" mt="50px" mr="750px">
							<Button
								type="submit"
								color="secondary"
								variant="contained"
								onClick={() => handleFormSubmit(values)}
							>
								Add Products
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

const productSchema = yup.object().shape({
	name: yup.string().required('required'),
	price: yup.number().required('required'),
	description: yup.string().required('required'),
	brand: yup.string().required('required'),
	countInStock: yup
		.string()
		.required('required')
		.test(
			'Is positive?',
			'The number must be greater than 0!',
			(value) => value > 0
		),
	mainCategory: yup.string().required('required'),
	subCategory: yup.string().required('required'),
	size: yup.string().required('required'),
	color: yup.string().required('required'),
	variation: yup
		.array()
		.of(yup.string().required('Item is required'))
		.required('At least one item is required'),
});
const initialValues = {
	name: '',
	price: '',
	description: '',
	brand: '',
	mainCategory: '',
	subCategory: '',
	image: '',
	variation: [
		{
			size: '',
			color: '',
			countInStock: '',
		},
	],
};

export default AddProducts;
