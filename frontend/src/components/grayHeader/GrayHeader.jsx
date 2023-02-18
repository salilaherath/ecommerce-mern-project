import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/users/userLogInDataSlice';
import { resetWithProfile } from '../../features/users/profileDataSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './grayHeader.scss';

const GrayHeader = () => {
	const dispatch = useDispatch();
	const userLogInDetails = useSelector((state) => state.userLogInDetails);
	const { userInfo } = userLogInDetails;
	const logoutHandler = () => {
		dispatch(logout());
		dispatch(resetWithProfile());
	};
	return (
		<div className="gheader">
			<div className="inquiries">
				<span>For Inquiries: </span>+94 76 543 4789
			</div>
			<div className="right">
				{userInfo ? (
					<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
						<InputLabel id="demo-simple-select-label">
							{userInfo.name}
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							label="Age"
							autoWidth
						>
							<MenuItem>Profile</MenuItem>
							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
							{/* <MenuItem>Dashboard</MenuItem> */}
						</Select>
					</FormControl>
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
