import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShippingAddress } from '../../features/cart/cartDataSlice';

import './checkout.scss';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
	const shippingAddress = useSelector((state) => state.cart.shippingAddress);
	const [formFields, setFormFields] = useState({
		address: shippingAddress.address,
		city: shippingAddress.city,
		name: shippingAddress.name,
	});
	const { name, address, city } = formFields;
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(addShippingAddress(formFields));
		// navigate('/payment');
	};
	const handleOnChange = (e) => {
		setFormFields((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	// const navigate = useNavigate();
	// const handlePayment = () => {
	// 	navigate('/payment');
	// };
	const handleBackShopping = () => {
		navigate('/shop');
	};

	return (
		<div className="checkout-page">
			<div className="checkout-container">
				<h2>CHECKOUT</h2>

				<div className="container">
					<div className="billing-details">
						<h3>BILLING DETAILS</h3>
						<form className="form" onSubmit={submitHandler}>
							<input
								type="text"
								name="name"
								required
								value={name}
								onChange={handleOnChange}
								placeholder="Name"
							/>
							<input
								type="text"
								name="address"
								value={address}
								required
								onChange={handleOnChange}
								placeholder="Shipping address"
							/>
							<input
								type="text"
								name="city"
								value={city}
								required
								onChange={handleOnChange}
								placeholder="City"
							/>
							<input type="text" placeholder="Contact no" />
							<input type="text" placeholder="Email" />
							<div className="buttons">
								<button className="shopping-btn" onClick={handleBackShopping}>
									BACK TO SHOPPING
								</button>
								<button className="payment-btn" type="submit">
									PAYMENT
								</button>
							</div>
						</form>
					</div>
					<div className="order-details">
						<h3>YOUR ORDER</h3>
						<div className="order-container">
							<div className="order">
								<img src="" alt="" />
								<div className="info">
									<p>Crew Neck T Shirt</p>
									<p>Color : Navy Blue</p>
									<p>Size : L</p>
									<p className="price">Rs. 1200.00</p>
								</div>
							</div>
							<div className="order">
								<img src="" alt="" />
								<div className="info">
									<p>Crew Neck T Shirt</p>
									<p>Color : Navy Blue</p>
									<p>Size : L</p>
									<p className="price">Rs. 1200.00</p>
								</div>
							</div>
							<div className="hl"></div>
							<table>
								<tr>
									<td>Subtotal</td>
									<td>Rs.2400.00</td>
								</tr>
								<tr>
									<td>Discounts</td>
									<td>0</td>
								</tr>
								<tr className="total">
									<td>Total</td>
									<td>Rs.2400.00</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
