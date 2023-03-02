import axios from 'axios';

const getOrderById = async (id) => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo.token}`,
		},
	};
	const { data } = await axios.get(`/api/orders/${id}`, config);
	return data;
};

const makeOrder = async (object) => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo.token}`,
		},
	};
	const { data } = await axios.post(`/api/orders`, object, config);

	return {
		_id: data._id,
		user: data.user,
		orderItems: data.orderItems,
		shippingAddress: data.shippingAddress,
		paymentResult: data.paymentResult,
		totalPrice: parseInt(data.totalPrice),
	};
};

const payOrder = async (orderID, paymentResult) => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo.token}`,
		},
	};
	const { data } = await axios.post(
		`/api/orders/${orderID}/pay`,
		paymentResult,
		config
	);
	return data;
};

const getMyOrders = async () => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo.token}`,
		},
	};
	const { data } = await axios.get(`/api/orders/myorders`, config);
	return data;
};
const orderDataService = {
	getOrderById,
	makeOrder,
	payOrder,
	getMyOrders,
};
export default orderDataService;
