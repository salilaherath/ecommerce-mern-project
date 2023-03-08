import axios from 'axios';

const API_URL = '/api/products';

const listProduct = async (id) => {
	const response = await axios.get(`/api/products/${id}`);
	// console.log(response.data);
	if (response.data) {
		//localStorage.setItem('product',JSON.stringify(response.data))
	}
	return response.data;
};

//retrieve products
const getProducts = async () => {
	const response = await axios.get(API_URL);

	if (response.data) {
		localStorage.setItem('products', JSON.stringify(response.data));
	}

	return response.data;
};

//retrieve total products
const getTotalProducts = async () => {
	const response = await axios.get('api/products/total');
	return response.data;
};

//Add products
const addProducts = async (obj) => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${userInfo.token}`,
		},
	};
	const response = await axios.post(`/api/products`, obj, config);
	return response.data;
};

//Delete products
const deleteProducts = async (id) => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo.token}`,
		},
	};
	const response = await axios.delete(`/api/products/${id}`, config);
	return response.data;
};

const productService = {
	getProducts,
	listProduct,
	addProducts,
	deleteProducts,
	getTotalProducts,
};
export default productService;
