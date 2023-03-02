import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../theme';
import { mockDataTeam } from '../../../data/mockData';
import Header from '../components/Header';
import { Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const Orders = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const columns = [
		{ field: 'id', headerName: 'ID' },
		{
			field: 'name',
			headerName: 'Customer Name',
			flex: 0.5,
			cellClassName: 'name-column--cell',
		},
		{
			field: 'address',
			headerName: 'Delivery Address',
			headerAlign: 'left',
			align: 'left',
			flex: 0.7,
		},
		{
			field: 'phone',
			headerName: 'Contact Number',
			flex: 0.5,
		},
		{
			field: 'total',
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
				<DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
			</Box>
		</Box>
	);
};

export default Orders;
