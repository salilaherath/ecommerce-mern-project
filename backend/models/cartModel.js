import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		cartItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				size: { type: String, required: true },
				color: { type: String, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
	},
	{
		timestamps: true,
	}
);

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
