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
				'shippingAddress.name': order.shippingAddress.name,
				'shippingAddress.address': order.shippingAddress.address,
				'shippingAddress.contactNo': order.shippingAddress.contactNo,
			};
		});
	};

	useEffect(() => {
		orderService.getOrders().then((data) => {
			setOrders(transformOrderData(data.orders));
		});
	}, []);

	// const handleChange = (e, params) => {
	// 	const updatedStatus = e.target.value;
	// 	const orderId = params.id;

	// 	// Make a request to update the order status
	// 	axios
	// 		.put(`/api/orders/${orderId}/status`, { status: updatedStatus })
	// 		.then((res) => {
	// 			console.log('Order status updated successfully!');
	// 			// You can also update the UI to show the updated status
	// 		})
	// 		.catch((err) => {
	// 			console.error('Error updating order status:', err);
	// 			// You can show an error message to the user
	// 		});
	// };

	const columns = [
		{ field: '_id', headerName: 'ID', flex: 0.6 },
		{
			field: 'shippingAddress.name',
			headerName: 'Name',
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
		{
			field: 'shippingAddress.contactNo',
			headerName: 'Contact Number',
			flex: 0.5,
		},
		{
			field: 'totalPrice',
			headerName: 'Total (Rs)',
			flex: 0.5,
		},
		{
			field: 'orderStatus',
			headerName: 'Order Status',
			// renderCell: (params) => (
			// 	<Select
			// 		defaultValue={orders.orderStatus}
			// 		style={{ width: 120 }}
			// 		onChange={(e) => handleChange(e, params)}
			// 		options={[
			// 			{ value: 'ordered', label: 'Ordered' },
			// 			{ value: 'packed', label: 'Packed' },
			// 			{ value: 'shipped', label: 'Shipped' },
			// 			{ value: 'delivered', label: 'Delivered' },
			// 		]}
			// 	/>
			// ),
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
					getRowId={(row) => row._id}
					rows={orders || []}
					columns={columns}
					pagination
					rowsPerPageOptions={[10, 25, 50]}
					pageSize={10}
				/>
			</Box>
		</Box>
	);
};

export default Orders;
