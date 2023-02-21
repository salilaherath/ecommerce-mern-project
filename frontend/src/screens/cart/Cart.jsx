import './cart.scss';
import {
	Link,
	useParams,
	useSearchParams,
	useNavigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToCart, removeFromCart } from '../../features/cart/cartDataSlice';
import Delete from '@mui/icons-material/Delete';

const Cart = () => {
	// const [products, setProducts] = useState();
	const { id: proID } = useParams();
	const [searchParams] = useSearchParams();
	const qty = searchParams.get('qty');
	const ob = { id: proID, qty: qty };
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { cartItems, isLoading, isError } = cart;

	useEffect(() => {
		if (proID) {
			dispatch(addToCart(ob));
		}
	}, [dispatch, proID, qty]);

	const removeFromCartHandler = (id) => {
		console.log('remove');
		dispatch(removeFromCart(id));
	};

	const handleCheckout = () => {
		navigate('/checkout');
	};

	return (
		<div className="cart-page">
			<div className="cart">
				<h2>CART</h2>
				<div className="section">
					{cartItems.length === 0 ? (
						<h3>Your cart is empty!</h3>
					) : (
						<div className="left-section">
							{cartItems.map((item) => (
								<div className="container" key={item.product}>
									<img src={item.image} alt={item.name} />
									<div className="details">
										<p>
											<span>Product: </span>
											{item.name}
										</p>
										<p>
											<span>ID: </span>
											{item.product}
										</p>
										<p>
											<span>Color: </span>
											{item.color}
										</p>
										<p>
											<span>Size: </span>
											{item.size}
										</p>
									</div>
									<div className="right">
										<div className="quantity">
											<div className="dec">-</div>
											<div className="quan">{item.qty}</div>
											<div className="inc">+</div>
										</div>
										<h3>Rs. {item.price * item.qty}.00</h3>
									</div>
									<Delete onClick={() => removeFromCartHandler(item.product)} />
								</div>
							))}
						</div>
					)}
					<div className="right-section">
						<div className="voucher">
							<h2>VOUCHER</h2>
							<p>Enter your coupon code if you have one.</p>
							<input
								type="text"
								name=""
								id="code"
								placeholder="Voucher code"
								className="input-code"
							/>
							<br />
							<button className="apply-btn">Apply</button>
						</div>

						<div className="checkout">
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
									{/* <td>Rs. {cart.total}.00</td> */}
									<td>
										Rs.
										{cartItems
											.reduce((acc, item) => acc + item.qty * item.price, 0)
											.toFixed(2)}
									</td>
								</tr>
							</table>
							{/* <StripeCheckout
                name='Vintage Clothing'
                image='https://i.ibb.co/0YmR3b8/3736-Converted.png'
                billingAddress
                shippingAddress
                description={`Your total is Rs. ${cart.total}.00`}
                amount={cart.total * 100}
                // token={onToken}
                stripeKey={KEY}
                currency='LKR'>
                <button className='checkout-btn'>CHECKOUT NOW</button>
              </StripeCheckout> */}
							<button className="checkout-btn" onClick={handleCheckout}>
								CHECKOUT NOW
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
