import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';
import { mockTransactions } from '../../../data/mockData';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import Header from '../components/Header';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import StatBox from '../components/StatBox';
import ProgressCircle from '../components/ProgressCircle';
import orderService from '../../../features/orders/orderService';
import { useEffect, useState } from 'react';
import productService from '../../../features/products/productService';
import userService from '../../../features/users/userService';

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [revenue, setRevenue] = useState([]);
	const [totalOrders, setTotalOrders] = useState(0);
	const [orders, setOrders] = useState([]);
	const [totalProducts, setTotalProducts] = useState(0);
	const [totalCustomers, setTotalCustomers] = useState(0);

	useEffect(() => {
		orderService.getOrders().then((data) => {
			setRevenue(data.totalRevenue);
			setTotalOrders(data.totalOrders);
		});

		orderService.getLatestOrders().then((data) => {
			const formattedData = data.map((order) => {
				const formattedDate = new Date(order.createdAt).toLocaleDateString();
				return { ...order, createdAt: formattedDate };
			});
			setOrders(formattedData);
		});

		productService.getTotalProducts().then((data) => {
			setTotalProducts(data);
		});

		userService.getCountOfCustomers().then((data) => {
			setTotalCustomers(data);
		});
	}, []);

	return (
		<Box m="20px">
			{/* HEADER */}
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Header
					title="OVERVIEW"
					subtitle="Welcome to Dashboard of Vintage Clothing"
				/>

				<Box>
					<Button
						sx={{
							backgroundColor: colors.blueAccent[700],
							color: colors.grey[100],
							fontSize: '14px',
							fontWeight: 'bold',
							padding: '10px 20px',
						}}
					>
						<DownloadOutlinedIcon sx={{ mr: '10px' }} />
						Download Reports
					</Button>
				</Box>
			</Box>

			{/* GRID & CHARTS */}
			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="140px"
				gap="20px"
			>
				{/* ROW 1 */}
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title={`Rs. ${revenue}.00`}
						subtitle="Total Revenue"
						progress="0.75"
						increase="+14%"
						icon={
							<PaidIcon
								sx={{ color: colors.greenAccent[600], fontSize: '34px' }}
							/>
						}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title={totalOrders}
						subtitle="Total Orders"
						progress="0.50"
						increase="+21%"
						icon={
							<PointOfSaleIcon
								sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
							/>
						}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title={totalProducts}
						subtitle="Total Products"
						progress="0.30"
						increase="+5%"
						icon={
							<Inventory2Icon
								sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
							/>
						}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title={totalCustomers}
						subtitle="Total Customers"
						progress="0.80"
						increase="+43%"
						icon={
							<PeopleIcon
								sx={{ color: colors.greenAccent[600], fontSize: '32px' }}
							/>
						}
					/>
				</Box>

				{/* ROW 2 */}
				<Box
					gridColumn="span 8"
					gridRow="span 2"
					backgroundColor={colors.primary[400]}
				>
					<Box
						mt="25px"
						p="0 30px"
						display="flex "
						justifyContent="space-between"
						alignItems="center"
					>
						<Box>
							<Typography
								variant="h5"
								fontWeight="600"
								color={colors.grey[100]}
							>
								Revenue Generated
							</Typography>
							<Typography
								variant="h3"
								fontWeight="bold"
								color={colors.greenAccent[500]}
							>
								Rs. {revenue}.00
							</Typography>
						</Box>
						<Box>
							<IconButton>
								<DownloadOutlinedIcon
									sx={{ fontSize: '26px', color: colors.greenAccent[500] }}
								/>
							</IconButton>
						</Box>
					</Box>
					<Box height="250px" m="-20px 0 0 0">
						<LineChart isDashboard={true} />
					</Box>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 2"
					backgroundColor={colors.primary[400]}
					overflow="auto"
				>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						borderBottom={`4px solid ${colors.primary[500]}`}
						colors={colors.grey[100]}
						p="15px"
					>
						<Typography color={colors.grey[100]} variant="h5" fontWeight="600">
							Recent Transactions
						</Typography>
					</Box>
					{orders.map((transaction) => (
						<Box
							key={transaction._id}
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							borderBottom={`4px solid ${colors.primary[500]}`}
							p="15px"
						>
							<Box>
								<Typography
									color={colors.greenAccent[500]}
									variant="h5"
									fontWeight="600"
								>
									{transaction._id}
								</Typography>
								<Typography color={colors.grey[100]}>
									{transaction.shippingAddress.name}
								</Typography>
							</Box>
							<Box color={colors.grey[100]}>{transaction.createdAt}</Box>
							<Box
								backgroundColor={colors.greenAccent[500]}
								p="5px 10px"
								borderRadius="4px"
							>
								Rs. {transaction.totalPrice}
							</Box>
						</Box>
					))}
				</Box>

				{/* ROW 3 */}
				<Box
					gridColumn="span 4"
					gridRow="span 2"
					backgroundColor={colors.primary[400]}
					p="30px"
				>
					<Typography variant="h5" fontWeight="600">
						Campaign
					</Typography>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
						mt="25px"
					>
						<ProgressCircle size="125" />
						<Typography
							variant="h5"
							color={colors.greenAccent[500]}
							sx={{ mt: '15px' }}
						>
							Rs. 48,352 revenue generated
						</Typography>
						<Typography>Includes extra misc expenditures and costs</Typography>
					</Box>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 2"
					backgroundColor={colors.primary[400]}
				>
					<Typography
						variant="h5"
						fontWeight="600"
						sx={{ padding: '30px 30px 0 30px' }}
					>
						Sales Quantity
					</Typography>
					<Box height="250px" mt="-20px">
						<BarChart isDashboard={true} />
					</Box>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 2"
					backgroundColor={colors.primary[400]}
					padding="30px"
				>
					<Typography
						variant="h5"
						fontWeight="600"
						sx={{ marginBottom: '15px' }}
					>
						{/* Geography Based Traffic */}
					</Typography>
					<Box height="200px">
						{/* <GeographyChart isDashboard={true} /> */}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
