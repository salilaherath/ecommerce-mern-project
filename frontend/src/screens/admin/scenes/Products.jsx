import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../theme';
import { mockDataTeam } from '../../../data/mockData';
import Header from '../components/Header';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { useNavigate } from 'react-router-dom';

const Products = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const columns = [
		{ field: 'id', headerName: 'ID' },
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			cellClassName: 'name-column--cell',
		},
		{
			field: 'address',
			headerName: 'Address',
			headerAlign: 'left',
			align: 'left',
		},
		{
			field: 'phone',
			headerName: 'Contact No.',
			flex: 1,
		},
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
					rows={mockDataTeam}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
				/>
			</Box>
		</Box>
	);
};

export default Products;
