import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';
import Header from '../components/Header';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

const Charts = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box m="20px">
			<Header title="CHARTS" subtitle="Useful Charts for Management" />

			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="140px"
				gap="20px"
			>
				<Box
					gridColumn="span 6"
					gridRow="span 3"
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
						<Box height="400px" mt="-20px">
							<PieChart />
						</Box>
					</Box>
				</Box>
				<Box
					gridColumn="span 6"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
				>
					<Typography
						variant="h5"
						fontWeight="600"
						sx={{ padding: '30px 30px 0 30px' }}
					>
						Sales Quantity
					</Typography>
					<Box height="400px" mt="-20px">
						<BarChart isDashboard={true} />
					</Box>
				</Box>
				<Box
					gridColumn="span 6"
					gridRow="span 2"
					backgroundColor={colors.primary[400]}
					padding="30px"
				>
					<Typography variant="h5" fontWeight="600">
						Geography Based Traffic
					</Typography>
					<Box height="250px">
						<LineChart />
					</Box>
				</Box>
				<Box
					gridColumn="span 6"
					gridRow="span 2"
					backgroundColor={colors.primary[400]}
					padding="30px"
				>
					<Typography
						variant="h5"
						fontWeight="600"
						sx={{ marginBottom: '15px' }}
					>
						Geography Based Traffic
					</Typography>
					<Box height="200px"></Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Charts;
