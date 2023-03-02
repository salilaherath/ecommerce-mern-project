import { Box, IconButton, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import { logout } from '../../../../features/users/userLogInDataSlice';
import { resetWithProfile } from '../../../../features/users/profileDataSlice';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Dropdown } from 'antd';

const Topbar = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);

	const logoutHandler = () => {
		dispatch(logout());
		dispatch(resetWithProfile());
	};

	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate('/');
	};

	const items = [
		{
			key: '1',
			label: <p onClick={navigateToHome}>Home</p>,
		},
		{
			key: '2',
			label: <p onClick={logoutHandler}>Logout</p>,
		},
	];

	return (
		<Box display="flex" justifyContent="space-between" p={2}>
			{/* SEARCH BAR */}
			<Box
				display="flex"
				backgroundColor={colors.primary[400]}
				borderRadius="3px"
			>
				<InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
				<IconButton type="button" sx={{ p: 1 }}>
					<SearchIcon />
				</IconButton>
			</Box>

			{/* ICONS */}
			<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
				<IconButton>
					<NotificationsOutlinedIcon />
				</IconButton>
				<IconButton>
					<SettingsOutlinedIcon />
				</IconButton>
				<Dropdown
					menu={{
						items,
					}}
					placement="bottomLeft"
					arrow
				>
					<IconButton>
						<PersonOutlinedIcon />
					</IconButton>
				</Dropdown>
			</Box>
		</Box>
	);
};

export default Topbar;
