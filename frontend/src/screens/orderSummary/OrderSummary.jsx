import './orderSummary.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../../features/orders/orderActions';
import { resetOrderStatus } from '../../features/orders/orderDataSlice';
import { CircularProgress } from '@mui/material';

const OrderSummary = () => {
	const dispatch = useDispatch();
	const { id: orderID } = useParams();
	const [orderDetails, setOrderDetails] = useState();
	// const logedUser = useSelector((state) => state.logInDetails.userInfo);
	const { order, isError, isSuccess, isLoading } = useSelector(
		(state) => state.orders
	);
	var itemsPrice;
	if (order) {
		itemsPrice = order.orderItems.reduce(
			(acc, item) => acc + item.price * item.qty,
			0
		);
	}

	useEffect(() => {
		dispatch(getOrderById(orderID));
	}, []);

	if (isSuccess) {
		setOrderDetails(order);
		dispatch(resetOrderStatus());
	}
	return isLoading ? (
		<CircularProgress />
	) : isError ? (
		<h3>{Error}</h3>
	) : !order ? (
		<CircularProgress />
	) : (
		<div className="container-summary">
			<h2>THANK YOU FOR THE ORDER!</h2>
			<div className="section">
				<div className="orderSummary">
					<h3>Order Summary</h3>
					<h3>Order ID</h3>
					<p>{order._id}</p>
					<h3>Delivery Address</h3>
					<p>
						{' '}
						<strong>Name: </strong>
						{order.shippingAddress.name}
					</p>
					<p>
						{' '}
						<strong>Address: </strong>
						{order.shippingAddress.address}
					</p>
					<p>
						{' '}
						<strong>City/Town: </strong>
						{order.shippingAddress.city}
					</p>
					<p>
						<strong>Contact No: </strong>
						{order.shippingAddress.contactNo}
					</p>
					<h3>Ordered Date</h3>
					<p>
						<strong>Date: </strong>
						{new Date(order.createdAt).toLocaleDateString()}
					</p>
					<h3>Order Status</h3>
					<p>
						{order.orderStatus.charAt(0).toUpperCase() +
							order.orderStatus.slice(1)}
					</p>
				</div>
				<div className="orderItems">
					<h3>Order Items</h3>
					<div className="order-container">
						{order.orderItems.map((item) => (
							<div className="order" key={item.id}>
								<img src={item.image} alt="" />
								<div className="info">
									<p>{item.name}</p>
									<p>Color : {item.color}</p>
									<p>Size : {item.size}</p>
									<p>Quantity : {item.qty}</p>
									<p className="price">Rs. {item.price}.00</p>
								</div>
							</div>
						))}
						<div className="hl"></div>
						<table>
							<tr className="total">
								<td>Total</td>
								<td>
									Rs.
									{order.orderItems
										.reduce((acc, item) => acc + item.qty * item.price, 0)
										.toFixed(2)}
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
