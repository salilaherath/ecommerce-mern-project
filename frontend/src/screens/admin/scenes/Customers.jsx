import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../theme';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import userService from '../../../features/users/userService';

const Customers = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
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
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
		},
	];
	const [customers, setCustomers] = useState([]);
	useEffect(() => {
		getCustomers();
	}, []);

	const getCustomers = () => {
		userService.getCustomers().then((data) => {
			setCustomers(data);
		});
	};
	// const addCustomers=(customerdata)=>{
	// 	userService.addCustomers(c)
	// }

	return (
		<Box m="20px">
			<Header
				title="CUSTOMERS"
				subtitle="Manage Customers of Vintage Clothing"
			/>
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
					rows={customers || []}
					columns={columns}
				/>
			</Box>
		</Box>
	);
};

export default Customers;
