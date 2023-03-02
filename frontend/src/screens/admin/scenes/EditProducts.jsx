import * as React from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { Field, FieldArray, Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/Header';
import productService from '../../../features/products/productService';

const EditProducts = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const handleFormSubmit = async (values) => {
		console.log(values);
		await productService.addProducts(values).then(() => {});
	};

	// const handleFileUpload = async (e) => {
	// 	const file = e.target.image[0];
	// 	const base64 = await convertToBase64(file);
	// 	console.log(base64);
	// };

	return (
		<Box m="20px">
			<Header title="UPDATE PRODUCTS" subtitle="Update Product Details" />

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
								/>
							</Grid>
							<Grid item sm={6}>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Main Category"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.mainCategory}
									name="mainCategory"
									error={!!touched.mainCategory && !!errors.mainCategory}
									helperText={touched.mainCategory && errors.mainCategory}
									sx={{ gridColumn: 'span 3' }}
								/>
							</Grid>
							<Grid item sm={6}>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Sub Category"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.subCategory}
									name="subCategory"
									error={!!touched.subCategory && !!errors.subCategory}
									helperText={touched.subCategory && errors.subCategory}
									sx={{ gridColumn: 'span 3' }}
								/>
							</Grid>
							<Grid item sm={12}>
								<div
									className="image-upload"
									style={{
										display: 'flex',
										flexDirection: 'column',
										marginTop: '10px',
										marginLeft: '25px',
										gap: '10px',
									}}
								>
									Upload Image
									<input
										type="file"
										lable="Image"
										id="image-upload"
										onChange={(e) => setFieldValue('image', e.target.files[0])}
										accept=".jpeg, .png, .jpg"
									/>
								</div>
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
														<TextField
															variant="filled"
															type="text"
															label="Color"
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.color}
															name={`variation[${index}].color`}
															error={!!touched.color && !!errors.color}
															helperText={touched.color && errors.color}
														/>
														<TextField
															variant="filled"
															type="text"
															label="Size"
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.size}
															name={`variation[${index}].size`}
															error={!!touched.size && !!errors.size}
															helperText={touched.size && errors.size}
														/>
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
						<Box display="flex" justifyContent="end" mt="20px" mr="500px">
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

export default EditProducts;

// function convertToBase64(file) {
// 	return (resolve, reject) => {
// 		const fileReader = new FileReader();
// 		fileReader.readAsDataURL(file);
// 		fileReader.onload = () => {
// 			resolve(fileReader.result);
// 		};
// 		fileReader.onerror = (error) => {
// 			reject(error);
// 		};
// 	};
// }
