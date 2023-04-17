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
		const orders = response.data.orders;
		const totalRevenue = orders.reduce(
			(acc, order) => acc + order.totalPrice,
			0
		);
		const totalOrders = response.data.totalOrders;
		localStorage.setItem('orders', JSON.stringify(orders));
		return {
			orders,
			totalRevenue,
			totalOrders,
		};
	}

	return response.data;
};

//Retrieve latest 8 orders
const getLatestOrders = async () => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const response = await axios.get('/api/orders/latest', config);
	return response.data;
};

// Update order status
const updateOrderStatus = async (id, orderStatus) => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	try {
		const response = await axios.put(
			`/api/orders/${id}/status`,
			{ orderStatus },
			config
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Error updating order status');
	}
};

const orderService = {
	getOrders,
	getLatestOrders,
	updateOrderStatus,
};

export default orderService;
