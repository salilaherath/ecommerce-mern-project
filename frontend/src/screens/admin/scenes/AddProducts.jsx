import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/Header';

const Form = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const handleFormSubmit = (values) => {
		console.log(values);
	};

	return (
		<Box m="20px">
			<Header title="ADD PRODUCTS" subtitle="Add New Products to the System" />

			<Formik
				onSubmit={handleFormSubmit}
				initialValues={initialValues}
				validationSchema={checkoutSchema}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
				}) => (
					<form onSubmit={handleSubmit}>
						<Box
							display="grid"
							gap="30px"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							sx={{
								'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
							}}
						>
							<TextField
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
								sx={{ gridColumn: 'span 2' }}
							/>
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
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Contact Number"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.contact}
								name="contact"
								error={!!touched.contact && !!errors.contact}
								helperText={touched.contact && errors.contact}
								sx={{ gridColumn: 'span 4' }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Address 1"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.address1}
								name="address1"
								error={!!touched.address1 && !!errors.address1}
								helperText={touched.address1 && errors.address1}
							/>
							<TextField
								variant="filled"
								type="text"
								label="Address 2"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.address2}
								name="address2"
								error={!!touched.address2 && !!errors.address2}
								helperText={touched.address2 && errors.address2}
							/>
						</Box>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button type="submit" color="secondary" variant="contained">
								Create New User
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

const phoneRegExp =
	/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
	name: yup.string().required('required'),
	price: yup.number().required('required'),
	contact: yup
		.string()
		.matches(phoneRegExp, 'Phone number is not valid')
		.required('required'),
	address1: yup.string().required('required'),
	address2: yup.string().required('required'),
});
const initialValues = {
	name: '',
	price: '',
	contact: '',
	address1: '',
	address2: '',
};

export default Form;
