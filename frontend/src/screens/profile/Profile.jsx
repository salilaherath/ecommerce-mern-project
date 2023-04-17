import './profile.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProfile,
	updateProfile,
	resetProfileStatus,
} from '../../features/users/profileDataSlice';
import {
	setUserInfoName,
	setUserInfoMail,
} from '../../features/users/userLogInDataSlice';
import { Button, Select } from 'antd';
import axios from 'axios';

const ProfileScreen = () => {
	const [orders, setOrders] = useState([]);
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const { profileInfo, isError, message, updateIsSuccess } = useSelector(
		(state) => state.profileDetails
	);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			Error(message);
			dispatch(resetProfileStatus());
		}
		if (passwordMessage) {
			Error(passwordMessage);
			setPasswordMessage('');
			dispatch(resetProfileStatus());
		}
		if (updateIsSuccess) {
			Error('succesfully updated');
			dispatch(setUserInfoName(name));
			dispatch(setUserInfoMail(email));
			dispatch(resetProfileStatus());
		}

		if (!userInfo) {
			navigate('/login');
		} else {
			if (profileInfo === null || profileInfo.email !== userInfo.email) {
				//console.log(userInfo['token'])
				dispatch(getProfile({ token: userInfo['token'] }));
			} else {
				setName(profileInfo.name);
				setEmail(profileInfo.email);
				setPassword('');
				setConfirmPassword('');
			}
		}
	}, [
		dispatch,
		navigate,
		profileInfo,
		userInfo,
		updateIsSuccess,
		isError,
		message,
		passwordMessage,
	]);

	useEffect(() => {
		axios
			.get('/api/orders/myorders', {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			})
			.then((response) => setOrders(response.data))
			.catch((error) => console.error(error));
	}, []);
	// useEffect(() => {
	// 	console.log(name);
	// }, [name]);
	console.log(passwordMessage);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setPasswordMessage('Passwords do not match');
		} else {
			setPasswordMessage('');
			console.log(name);
			dispatch(
				updateProfile({ name, email, password, token: userInfo['token'] })
			);
		}
	};

	const navigateOrder = (orderId) => {
		navigate(`/orders/${orderId}`);
	};

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const handleCompleteOrder = async (orderId) => {
		try {
			const { data } = await axios.put(
				`/api/orders/${orderId}/deliver`,
				{},
				config
			);
		} catch (error) {}
	};

	return (
		<div className="container">
			<h2>PROFILE</h2>
			<div className="layout">
				<div className="left">
					<h3>PROFILE INFORMATION</h3>
					<form onSubmit={submitHandler}>
						<label htmlFor="name">Name</label>
						<br />
						<input
							id="name"
							name="name"
							type="text"
							defaultValue={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<br />
						<br />

						<label htmlFor="email">Email Address</label>
						<br />
						<input
							id="email"
							name="email"
							type="email"
							defaultValue={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<br />
						<br />

						<label htmlFor="password">Password</label>
						<br />
						<input
							id="password"
							name="password"
							type="password"
							defaultValue={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<br />
						<br />

						<label htmlFor="confirmPassword">Confirm Password</label>
						<br />
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							defaultValue={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<br />
						{passwordMessage && <span>{passwordMessage}</span>}
						<button type="submit">UPDATE</button>
					</form>
				</div>
				<div className="right">
					<h3>MY ORDERS</h3>
					{orders
						.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
						.map((order) => (
							<div key={order._id} className="card">
								<div>
									<h4
										className="order-num"
										onClick={() => navigateOrder(order._id)}
									>
										Order Number: #{order._id}
									</h4>
									<h4>Order Items:</h4>
									{order.orderItems.map((item) => (
										<p key={item._id}>
											{item.name} x {item.qty}
										</p>
									))}
								</div>
								<div className="rightSection">
									<h4>Order Total: Rs. {order.totalPrice.toFixed(2)}</h4>
									<h4>Ordered Date: {order.createdAt.substr(0, 10)}</h4>
									<h4>
										Order Status:{' '}
										{order.orderStatus.charAt(0).toUpperCase() +
											order.orderStatus.slice(1)}
									</h4>
									<Button
										type="primary"
										disabled={
											order.isDelivered || order.orderStatus !== 'shipped'
										}
										onClick={() => handleCompleteOrder(order._id)}
									>
										{order.isDelivered ? 'Completed' : 'Complete'}
									</Button>
									{/* <Select
									defaultValue="Ordered"
									style={{ width: 120 }}
									// onChange={handleChange}
									options={[
										{ value: 'ordered', label: 'Ordered' },
										{ value: 'received', label: 'Received' },
									]}
								/> */}
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default ProfileScreen;
