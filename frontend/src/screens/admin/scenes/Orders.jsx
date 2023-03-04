import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../theme';
import Header from '../components/Header';
import { Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import orderService from '../../../features/orders/orderService';

const Orders = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [orders, setOrders] = useState([]);

	const transformOrderData = (orders) => {
		return orders.map((order) => {
			return {
				...order,
				'user.email': order.user.email,
				'shippingAddress.address': order.shippingAddress.address,
			};
		});
	};

	useEffect(() => {
		orderService.getOrders().then((data) => {
			setOrders(transformOrderData(data));
		});
	}, []);

	const columns = [
		{ field: '_id', headerName: 'ID', flex: 0.6 },
		{
			field: 'user.email',
			headerName: 'Customer Email',
			flex: 0.5,
			cellClassName: 'name-column--cell',
		},
		{
			field: 'shippingAddress.address',
			headerName: 'Delivery Address',
			headerAlign: 'left',
			align: 'left',
			flex: 0.7,
		},
		// {
		// 	field: 'phone',
		// 	headerName: 'Contact Number',
		// 	flex: 0.5,
		// },
		{
			field: 'totalPrice',
			headerName: 'Total (Rs)',
			flex: 0.5,
		},
		{
			field: 'status',
			headerName: 'Order Status',
			renderCell: (params) => (
				<Select
					defaultValue="Ordered"
					style={{ width: 120 }}
					// onChange={handleChange}
					options={[
						{ value: 'ordered', label: 'Ordered' },
						{ value: 'packed', label: 'Packed' },
						{ value: 'shipped', label: 'Shipped' },
						{ value: 'delivered', label: 'Delivered' },
					]}
				/>
			),
			flex: 1,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			renderCell: (params) => (
				<Button type="primary" icon={<CopyOutlined />} size="middle" />
			),
			flex: 1,
		},
	];

	return (
		<Box m="20px">
			<Header title="ORDERS" subtitle="Manage Orders of Vintage Clothing" />
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
					rows={orders || []}
					columns={columns}
				/>
			</Box>
		</Box>
	);
};

export default Orders;
