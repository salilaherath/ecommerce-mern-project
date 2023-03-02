import axios from 'axios';

const checkCart = async (id, qty, color, size, variant) => {
	const { data } = await axios.get(`/api/products/${id}`);
	return {
		product: data._id,
		name: data.name,
		image: data.image,
		price: data.price,
		color: color,
		size: size,
		countInStock: data.countInStock,
		qty: parseInt(qty),
		variant: variant,
	};
};

const cartDataService = {
	checkCart,
};
export default cartDataService;
