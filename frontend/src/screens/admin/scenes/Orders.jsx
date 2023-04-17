import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../theme';
import Header from '../components/Header';
import { Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import orderService from '../../../features/orders/orderService';

const Orders = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);
	const [orderStatus, setOrderStatus] = useState(orders.orderStatus);

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

	const orderDetails = (id) => {
		const url = `/orders/${id}`;
		window.open(url, '_blank');
	};

	useEffect(() => {
		orderService.getOrders().then((data) => {
			setOrders(transformOrderData(data.orders));
		});
	}, []);

	const handleStatusChange = async (value, params) => {
		const updatedStatus = value;
		console.log(updatedStatus);
		const orderId = params.id;

		try {
			const response = await orderService.updateOrderStatus(orderId, value);
			setOrderStatus(response.orderStatus);
		} catch (error) {
			console.error(error);
			// handle error
		}
	};

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
			renderCell: (params) => (
				<Select
					defaultValue={params.value}
					style={{ width: 120 }}
					onChange={(value) => handleStatusChange(value, params)}
					options={[
						{ value: 'ordered', label: 'Ordered' },
						{ value: 'packed', label: 'Packed' },
						{ value: 'shipped', label: 'Shipped' },
					]}
				/>
			),
			flex: 1,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			renderCell: (params) => {
				const id = params.row._id;
				return (
					<Button
						type="primary"
						icon={<CopyOutlined />}
						size="middle"
						onClick={() => orderDetails(id)}
					/>
				);
			},
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
