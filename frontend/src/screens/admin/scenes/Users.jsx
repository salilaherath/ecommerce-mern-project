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
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const [selectionModel, setSelectionModel] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = () => {
		userService.getUsers().then((data) => {
			setUsers(data);
		});
	};

	const handleMakeAdmin = (checked, userId) => {
		const updatedUsers = [...users];
		const userIndex = updatedUsers.findIndex((user) => user._id === userId);
		updatedUsers[userIndex].isAdmin = checked;

		axios
			.put(
				`/api/users/${userId}/makeAdmin`,
				{ isAdmin: checked },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
					},
				}
			)
			.then((response) => {
				const updatedUser = response.data;
				const updatedUserIndex = updatedUsers.findIndex(
					(user) => user._id === updatedUser._id
				);
				updatedUsers[updatedUserIndex] = updatedUser;
				setUsers(updatedUsers);
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
					defaultChecked={params.row.isAdmin}
					onChange={(checked) => handleMakeAdmin(checked, params.row._id)}
				/>
			),
			flex: 1,
		},
	];

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
					onSelectionModelChange={(newSelectionModel) => {
						setSelectionModel(newSelectionModel);
					}}
					selectionModel={selectionModel}
				/>
			</Box>
		</Box>
	);
};

export default Users;
