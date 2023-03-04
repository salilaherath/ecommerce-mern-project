import axios from 'axios';

//Retrive all orders
const getOrders = async () => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const response = await axios.get('/api/orders', config);
	if (response.data) {
		localStorage.setItem('orders', JSON.stringify(response.data));
	}

	return response.data;
};

const orderService = {
	getOrders,
};

export default orderService;
