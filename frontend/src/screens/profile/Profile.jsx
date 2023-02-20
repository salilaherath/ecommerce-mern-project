import './profile.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProfile,
	updateProfile,
	reset,
} from '../../features/users/profileDataSlice';
import {
	setUserInfoName,
	setUserInfoMail,
} from '../../features/users/userLogInDataSlice';

const ProfileScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogInDetails);
	const { profileInfo, isError, message, updateIsSuccess } = useSelector(
		(state) => state.profileDetails
	);

	useEffect(() => {
		if (isError) {
			Error(message);
			dispatch(reset());
		}
		if (passwordMessage) {
			Error(passwordMessage);
			setPasswordMessage('');
			dispatch(reset());
		}
		if (updateIsSuccess) {
			Error('succesfully updated');
			dispatch(setUserInfoName(name));
			dispatch(setUserInfoMail(email));
			dispatch(reset());
		}

		if (!userInfo) {
			navigate('/login');
		} else {
			if (profileInfo === null || profileInfo.email !== userInfo.email) {
				//console.log(userInfo['token'])
				dispatch(getProfile({ token: userInfo['token'] }));
			} else {
				// setName(profileInfo.name);
				// setEmail(profileInfo.email);
			}
		}
	}, [
		dispatch,
		navigate,
		profileInfo,
		userInfo,
		updateIsSuccess,
		isError,
		email,
		message,
		passwordMessage,
		name,
	]);

	console.log(passwordMessage);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setPasswordMessage('Passwords do not match');
		} else {
			setPasswordMessage('');
			dispatch(
				updateProfile({ name, email, password, token: userInfo['token'] })
			);
		}
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
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
						<br />
						<br />

						<label htmlFor="email">Email Address</label>
						<br />
						<input
							id="email"
							name="email"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<br />
						<br />

						<label htmlFor="password">Password</label>
						<br />
						<input
							id="password"
							name="password"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						<br />
						<br />

						<label htmlFor="confirmPassword">Confirm Password</label>
						<br />
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
						/>
						<br />
						<button type="submit">UPDATE</button>
					</form>
				</div>
				<div className="right">RIGHT</div>
			</div>
		</div>
	);
};

export default ProfileScreen;
