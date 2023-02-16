import './cart.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
//import { userRequest } from '../../requestMethods';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	// const [products, setProducts] = useState();

	return (
		<div className="cart-page">
			<div className="cart">
				<h2>CART</h2>
				<div className="section">
					<div className="left-section">
						<div className="container">
							{/* <img src={products[0].img} alt="" /> */}
							<div className="details">
								<p>
									<span>Product: </span>
									{/* {products[0].title} */}
								</p>
								<p>
									<span>ID: </span>
									{/* {products[0].id} */}
								</p>
								<p>
									<span>Color: </span>
									{/* {products[0].color} */}
								</p>
								<p>
									<span>Size: </span>
									{/* {products[0].size} */}
								</p>
							</div>
							<div className="right">
								<div className="quantity">
									<div className="dec">-</div>
									<div className="quan">{/* {products[0].quantity} */}</div>
									<div className="inc">+</div>
								</div>
								<h3>
									{/* Rs. {products[0].price * products[0].quantity}.00 */}
								</h3>
							</div>
						</div>
						{/* {cart.products.map((product) => (
              <div className='container'>
                <img src={product.img} alt='' />
                <div className='details'>
                  <p>
                    <span>Product: </span>
                    {product.title}
                  </p>
                  <p>
                    <span>ID: </span>
                    {product._id}
                  </p>
                  <p>
                    <span>Color: </span>
                    {product.color}
                  </p>
                  <p>
                    <span>Size: </span>
                    {product.size}
                  </p>
                </div>
                <div className='right'>
                  <div className='quantity'>
                    <div className='dec'>-</div>
                    <div className='quan'>{product.quantity}</div>
                    <div className='inc'>+</div>
                  </div>
                  <h3>Rs. {product.price * product.quantity}.00</h3>
                </div>
              </div>
            ))} */}
					</div>
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
									{/* <td>Rs. {cart.total}.00</td> */}
									<td>Rs. 3400.00</td>
								</tr>
								<tr>
									<td>Discounts</td>
									<td>0</td>
								</tr>
								<tr className="total">
									<td>Total</td>
									{/* <td>Rs. {cart.total}.00</td> */}
									<td>Rs. 3400.00</td>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
