import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/users/userLogInDataSlice';
import { resetWithProfile } from '../../features/users/profileDataSlice';
import { Button, Dropdown } from 'antd';
import './grayHeader.scss';

const GrayHeader = () => {
	const dispatch = useDispatch();
	const userLogInDetails = useSelector((state) => state.userLogInDetails);
	const { userInfo } = userLogInDetails;
	const logoutHandler = () => {
		dispatch(logout());
		dispatch(resetWithProfile());
	};

	const navigate = useNavigate();

	const navigateToProfile = () => {
		navigate('/users/profile');
	};

	const navigateToDashboard = () => {
		navigate('/dashboard');
	};

	const items = [
		{
			key: '1',
			//label: <p>Dashboard</p>,
			label: (
				<p
					onClick={
						userInfo && userInfo.isAdmin
							? navigateToDashboard
							: navigateToProfile
					}
				>
					{userInfo && userInfo.isAdmin ? 'Dashboard' : 'Profile'}
				</p>
			),
		},
		{
			key: '2',
			label: <p onClick={logoutHandler}>Logout</p>,
		},
	];
	return (
		<div className="gheader">
			<div className="inquiries">
				<span>For Inquiries: </span>+94 76 543 4789
			</div>
			<div className="right">
				{userInfo ? (
					<Dropdown
						menu={{
							items,
						}}
						placement="bottomLeft"
						arrow
					>
						<Button>{userInfo.name}</Button>
					</Dropdown>
				) : (
					<Link
						to={'/login'}
						className="login"
						style={{ textDecoration: 'none', color: 'black' }}
					>
						Login
					</Link>
				)}

				<div class="vl"></div>
				<p className="currency">LKR</p>
			</div>
		</div>
	);
};

export default GrayHeader;
