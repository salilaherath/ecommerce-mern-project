import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './register.scss';
import { registerUser, reset } from '../../features/users/userLogInDataSlice';
import { toast } from 'react-toastify';

const Register = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	//const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userLogInDetails = useSelector((state) => state.userLogInDetails);
	const { userInfo, isError, isLoading, isSuccess, message } = userLogInDetails;

	useEffect(() => {
		if (isSuccess || userInfo) {
			navigate('/');
			dispatch(reset());
		}
		if (isError) {
			toast.error(message);
			dispatch(reset());
		}
		if (passwordMessage) {
			toast.error(passwordMessage);
			setPasswordMessage('');
			dispatch(reset());
		}
	}, [
		userInfo,
		navigate,
		isSuccess,
		message,
		isError,
		dispatch,
		passwordMessage,
	]);
	console.log(passwordMessage);
	const submitHandler = (e) => {
		e.preventDefault();
		// if (password !== confirmPassword) {
		// 	setPasswordMessage('Passwords do not match');
		// } else {
		// 	dispatch(registerUser({ name, email, password }));
		// }
		dispatch(registerUser({ name, email, password }));
	};
	return (
		<div className="overlay">
			<div className="container">
				<h2>Register</h2>
				<p>Name</p>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<p>Email</p>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<p>Password</p>
				<input
					type="password"
					value={password}
					name=""
					id=""
					onChange={(e) => setPassword(e.target.value)}
				/>
				<p>Confirm Password</p>
				<input
					type="password"
					value={password}
					name=""
					id=""
					// onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" onClick={submitHandler}>
					Register
				</button>
			</div>
		</div>
	);
};

export default Register;
