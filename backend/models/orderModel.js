import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				color: { type: String, required: true },
				size: { type: String, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			name: { type: String, required: true },
			address: { type: String, required: true },
			city: { type: String, required: true },
			contactNo: { type: Number, required: true },
		},

		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		discountPrice: { type: Number, required: true, default: 0.0 },
		totalPrice: { type: Number, required: true, default: 0.0 },
		isPaid: { type: Boolean, required: true, default: false },
		paidAt: { type: Date },
		orderStatus: {
			type: String,
			enum: ['ordered', 'packed', 'shipped', 'completed'],
			default: 'ordered',
		},
		isDelivered: { type: Boolean, required: true, default: false },
		deliveredAt: { type: Date },
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
