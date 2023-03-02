import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShippingAddress } from '../../features/cart/cartDataSlice';
import './checkout.scss';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
	const shippingAddress = useSelector((state) => state.cart.shippingAddress);
	const [formFields, setFormFields] = useState({
		name: shippingAddress.name,
		address: shippingAddress.address,
		city: shippingAddress.city,
		contactNo: shippingAddress.contactNo,
		email: shippingAddress.email,
	});

	const { name, address, city, contactNo, email } = formFields;
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(addShippingAddress(formFields));
		navigate('/payment');
	};
	const handleOnChange = (e) => {
		setFormFields((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleBackShopping = () => {
		navigate('/shop');
	};

	// const navigateToPayment = () => {
	// 	navigate('/payment');
	// };

	const { cartItems } = useSelector((state) => state.cart);

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
							<input
								type="text"
								name="contactNo"
								value={contactNo}
								onChange={handleOnChange}
								placeholder="Contact no"
							/>
							<input
								type="text"
								name="email"
								value={email}
								onChange={handleOnChange}
								placeholder="Email"
							/>
							<div className="buttons">
								<button className="shopping-btn" onClick={handleBackShopping}>
									BACK TO SHOPPING
								</button>
								<button
									className="payment-btn"
									type="submit"
									//onClick={navigateToPayment}
								>
									PAYMENT
								</button>
							</div>
						</form>
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

export default Checkout;
