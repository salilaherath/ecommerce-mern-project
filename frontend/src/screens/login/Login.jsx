import React, { useState, useEffect } from 'react';
import './login.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from '../../features/users/userLogInDataSlice';
import { toast } from 'react-toastify';

const Login = () => {
	const [searchParams] = useSearchParams();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInfo, isError, isLoading, message } = useSelector(
		(state) => state.userLogInDetails
	);
	const redirect = searchParams.get('redirect')
		? searchParams.get('redirect')
		: '';

	useEffect(() => {
		if (userInfo) {
			navigate(`/${redirect}`);
		}
		if (isError) {
			toast.error(message);
		}
	}, [userInfo, navigate, isError, message, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(logInUser({ email, password }));
	};

	return (
		<div className="overlay">
			<div className="container">
				<h2>Login</h2>
				<p>Email</p>
				<input type="text" onChange={(e) => setEmail(e.target.value)} />
				<p>Password</p>
				<input
					type="password"
					id=""
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={submitHandler}>Login</button>
				{isError && <div className="error">{message}</div>}
				<p>
					Don't have an account? Please,{' '}
					<span onClick={() => navigate('/register')}>register</span> here!
				</p>
			</div>
		</div>
	);
};

export default Login;
