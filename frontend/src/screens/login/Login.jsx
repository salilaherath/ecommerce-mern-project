import React, { useState } from 'react';
//import Register from '../register/Register';
import './login.scss';

const Login = ({ onClose }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className="overlay">
			<div className="container">
				<h2>Login</h2>
				<p>Email or Username</p>
				<input type="text" onChange={(e) => setUsername(e.target.value)} />
				<p>Password</p>
				<input
					type="password"
					name=""
					id=""
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button>Login</button>
				{/* {error && <div className='error'>Something went wrong...</div>} */}
				<p>
					Don't have an account? Please, <span>register</span> here!
				</p>
			</div>
		</div>
	);
};

export default Login;
