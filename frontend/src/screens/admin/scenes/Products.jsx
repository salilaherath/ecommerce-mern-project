import { Avatar, Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../theme';
import Header from '../components/Header';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productService from '../../../features/products/productService';
import { message, Popconfirm } from 'antd';

const Products = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const confirm = (e) => {
		console.log(e);
		message.success('Deleted the product');
	};
	const cancel = (e) => {
		console.log(e);
		message.error('Click on No');
	};

	const columns = [
		{ field: '_id', headerName: 'ID' },
		{
			field: 'image',
			headerName: 'Image',
			renderCell: (params) => <Avatar src={params.value} />,
			flex: 0.5,
		},
		{
			field: 'name',
			headerName: 'Name',
			flex: 0.8,
		},
		{
			field: 'brand',
			headerName: 'Brand',
			headerAlign: 'left',
			align: 'left',
		},
		{
			field: 'categories',
			headerName: 'Categories',
			flex: 1,
		},
		{
			field: 'color',
			headerName: 'Colors',
			flex: 1,
		},
		{
			field: 'size',
			headerName: 'Sizes',
			flex: 1,
		},
		{
			field: 'price',
			headerName: 'Price',
			flex: 0.6,
		},
		{
			field: 'countInStock',
			headerName: 'Count In Stock',
			flex: 0.9,
		},
		{
			field: 'numReviews',
			headerName: 'No. of Reviews',
			flex: 1,
		},
		{
			field: 'rating',
			headerName: 'Rating',
			flex: 1,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			headerAlign: 'center',
			renderCell: (cellValues) => {
				return (
					<>
						<Popconfirm
							title="Delete the Product"
							description="Are you sure to delete this product?"
							onConfirm={confirm}
							onCancel={cancel}
							okText="Yes"
							cancelText="No"
						>
							<Button sx={{ color: colors.grey[100] }}>
								<DeleteIcon />
							</Button>
						</Popconfirm>
						<Button sx={{ color: colors.grey[100] }}>
							<EditIcon />
						</Button>
					</>
				);
			},
		},
	];

	const [products, setProducts] = useState([]);
	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = () => {
		productService.getProducts().then((data) => {
			setProducts(data);
		});
	};

	const navigate = useNavigate();

	const navigateAddProducts = () => {
		navigate('/dashboard/addProducts');
	};

	return (
		<Box m="20px">
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Header
					title="PRODUCTS"
					subtitle="Manage Products of Vintage Clothing"
				/>

				<Box>
					<Button
						onClick={navigateAddProducts}
						sx={{
							backgroundColor: colors.blueAccent[700],
							color: colors.grey[100],
							fontSize: '14px',
							fontWeight: 'bold',
							padding: '10px 20px',
						}}
					>
						<DownloadOutlinedIcon sx={{ mr: '10px' }} />
						Add Products
					</Button>
				</Box>
			</Box>
			<Box
				m="0 0 0 0"
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
					'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
						color: `${colors.grey[100]} !important`,
					},
				}}
			>
				<DataGrid
					checkboxSelection
					getRowId={(row) => row._id}
					rows={products || []}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
				/>
			</Box>
		</Box>
	);
};

export default Products;
