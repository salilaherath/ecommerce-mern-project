import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../theme';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import userService from '../../../features/users/userService';
import { Switch } from 'antd';
import axios from 'axios';

const Users = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const onChange = (checked) => {
		console.log(`switch to ${checked}`);
	};
	const [users, setUsers] = useState([]);
	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = () => {
		userService.getUsers().then((data) => {
			setUsers(data);
		});
	};

	const handleMakeAdmin = (event, userId) => {
		const updatedUsers = [...users];
		const userIndex = updatedUsers.findIndex((user) => user._id === userId);
		updatedUsers[userIndex].isAdmin = event.target.checked;

		axios
			.put(`/api/users/${userId}`, { isAdmin: event.target.checked })
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const columns = [
		{ field: '_id', headerName: 'ID', flex: 1 },
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			cellClassName: 'name-column--cell',
		},
		// {
		// 	field: 'address',
		// 	headerName: 'Address',
		// 	headerAlign: 'left',
		// 	align: 'left',
		// },
		// {
		// 	field: 'phone',
		// 	headerName: 'Contact No.',
		// 	flex: 1,
		// },
		{
			field: 'email',
			headerName: 'Email',
			flex: 1,
		},
		{
			field: 'makeAdmin',
			headerName: 'Make Admin',
			renderCell: (params) => (
				<Switch
					checked={params.row.isAdmin}
					onChange={(event) => handleMakeAdmin(event, params.row._id)}
				/>
			),
			flex: 1,
		},
	];
	// const addCustomers=(customerdata)=>{
	// 	userService.addCustomers(c)
	// }

	return (
		<Box m="20px">
			<Header title="USERS" subtitle="Manage Users of Vintage Clothing" />
			<Box
				m="40px 0 0 0"
				height="75vh"
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none',
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none',
					},
					'& .name-column--cell': {
						color: colors.greenAccent[300],
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: colors.blueAccent[700],
						borderBottom: 'none',
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400],
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: colors.blueAccent[700],
					},
					'& .MuiCheckbox-root': {
						color: `${colors.greenAccent[200]} !important`,
					},
				}}
			>
				<DataGrid
					checkboxSelection
					getRowId={(row) => row._id}
					rows={users || []}
					columns={columns}
				/>
			</Box>
		</Box>
	);
};

export default Users;
