import './payment.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { createOrder } from '../../features/orders/orderActions';
import { resetCart, setPrices } from '../../features/cart/cartDataSlice';
import { resetOrderStatus } from '../../features/orders/orderDataSlice';

const Payment = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [sdkReady, setSdkReady] = useState(false);

	const { isError, isSuccess, message, order, action } = useSelector(
		(state) => state.orders
	);

	const cart = useSelector((state) => state.cart);
	const { cartItems, shippingAddress } = cart;

	const itemsPrice = cart.cartItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	);

	const totalPrice = itemsPrice;

	const handleBackCart = () => {
		navigate('/cart');
	};

	const currency = 'USD';
	const style = { layout: 'vertical' };

	const addPayPalScript = async () => {
		const { data: clientID } = await axios.get('/api/config/paypal');
		setSdkReady(clientID);
	};

	useEffect(() => {
		if (!sdkReady) {
			addPayPalScript();
		}
		if (action === 'createOrder' && isSuccess) {
			navigate(`/orders/${order._id}`);
			dispatch(resetOrderStatus());
			dispatch(resetCart());
		}
		if (action === 'createOrder' && isError) {
			toast.error(message);
			dispatch(resetOrderStatus());
		}
	}, [
		isSuccess,
		isError,
		message,
		action,
		navigate,
		order,
		dispatch,
		sdkReady,
	]);

	const placeOrderHandler = (details) => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				totalPrice,
				paymentResult: {
					id: details.id,
					status: details.status,
					update_time: details.update_time,
					email_address: details.payer.email_address,
				},
			})
		);
	};

	return (
		<div className="payment-page">
			<div className="payment-container">
				<h2>PAYMENT</h2>
				<div className="container">
					<div className="billing-details">
						<h3>PAYMENT DETAILS</h3>
						<div className="shipping-details"></div>
						<div className="form">
							<h4>YOUR CREDIT CARD</h4>
							<input type="text" placeholder="Card number" />
							<input type="text" placeholder="Name on card" />
							<input type="text" placeholder="Expiration (MM/YY)" />
							<input type="text" placeholder="Security code" />
						</div>
						<button className="cart-btn" onClick={handleBackCart}>
							BACK TO CART
						</button>
						<button className="payment-btn">PAY NOW</button>
						<div className="or">----- OR -----</div>
						<div className="paypal">
							<PayPalScriptProvider
								options={{
									'client-id':
										'Ae3-1cfJsb1hONXExiFeade5o-un49JJoWTmB2NZ1QF4ozSzgBKCTBS5JzG8lpysZJNP_j95Q_zB1g_u',
								}}
							>
								<PayPalButtons
									style={style}
									forceReRender={[totalPrice, 'USD']}
									fundingSource={undefined}
									createOrder={(data, actions) => {
										return actions.order.create({
											purchase_units: [
												{
													amount: {
														currency_code: currency,
														value: totalPrice,
													},
												},
											],
										});
									}}
									onApprove={(data, actions) => {
										return actions.order.capture().then(function (details) {
											placeOrderHandler(details);
										});
									}}
								/>
							</PayPalScriptProvider>
						</div>
					</div>
					<div className="order-details">
						<h3>YOUR ORDER</h3>
						<div className="order-container">
							{cartItems.map((item) => (
								<div className="order" key={item.id}>
									<img src={item.image} alt="" />
									<div className="info">
										<p>{item.name}</p>
										<p>Color : {item.color}</p>
										<p>Size : {item.size}</p>
										<p className="price">Rs. {item.price}.00</p>
									</div>
								</div>
							))}
							<div className="hl"></div>
							<table>
								<tr>
									<td>Subtotal</td>
									<td>
										Rs.
										{cartItems
											.reduce((acc, item) => acc + item.qty * item.price, 0)
											.toFixed(2)}
									</td>
								</tr>
								<tr>
									<td>Discounts</td>
									<td>0</td>
								</tr>
								<tr className="total">
									<td>Total</td>
									<td>
										Rs.
										{cartItems
											.reduce((acc, item) => acc + item.qty * item.price, 0)
											.toFixed(2)}
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
