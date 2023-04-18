import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { mockLineData as data } from '../../../data/mockData';
import { useState, useEffect } from 'react';

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [monthlyRevenue, setMonthlyRevenue] = useState([]);
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));

	useEffect(() => {
		async function fetchMonthlyRevenue() {
			try {
				const response = await fetch('/api/orders/monthly', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
					},
				});
				const data = await response.json();
				const monthlyRevenueData = Object.keys(data.monthlyRevenue).map(
					(key) => ({
						x: new Date(0, parseInt(key), 1).toLocaleString('default', {
							month: 'long',
						}),
						y: data.monthlyRevenue[key],
					})
				);
				setMonthlyRevenue(monthlyRevenueData);
			} catch (error) {
				console.error(error);
			}
		}

		fetchMonthlyRevenue();
	}, []);

	return (
		<ResponsiveLine
			// data={[
			// 	{
			// 		id: '2023',
			// 		color: tokens('dark').redAccent[200],
			// 		data: monthlyRevenue,
			// 	},
			// ]}
			data={data}
			theme={{
				axis: {
					domain: {
						line: {
							stroke: colors.grey[100],
						},
					},
					legend: {
						text: {
							fill: colors.grey[100],
						},
					},
					ticks: {
						line: {
							stroke: colors.grey[100],
							strokeWidth: 1,
						},
						text: {
							fill: colors.grey[100],
						},
					},
				},
				legends: {
					text: {
						fill: colors.grey[100],
					},
				},
				tooltip: {
					container: {
						color: colors.primary[500],
					},
				},
			}}
			colors={isDashboard ? { datum: 'color' } : { scheme: 'nivo' }} // added
			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
			xScale={{ type: 'point' }}
			yScale={{
				type: 'linear',
				min: 'auto',
				max: 'auto',
				stacked: true,
				reverse: false,
			}}
			yFormat=" >-.2f"
			curve="catmullRom"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: 'bottom',
				tickSize: 0,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard ? undefined : 'Revenue', // added
				legendOffset: 36,
				legendPosition: 'middle',
			}}
			axisLeft={{
				orient: 'left',
				tickValues: 5, // added
				tickSize: 3,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard ? undefined : 'Year', // added
				legendOffset: -40,
				legendPosition: 'middle',
			}}
			enableGridX={false}
			enableGridY={false}
			pointSize={8}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			useMesh={true}
			legends={[
				{
					anchor: 'bottom-right',
					direction: 'column',
					justify: false,
					translateX: 100,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: 'left-to-right',
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 0.75,
					symbolSize: 12,
					symbolShape: 'circle',
					symbolBorderColor: 'rgba(0, 0, 0, .5)',
					effects: [
						{
							on: 'hover',
							style: {
								itemBackground: 'rgba(0, 0, 0, .03)',
								itemOpacity: 1,
							},
						},
					],
				},
			]}
		/>
	);
};

export default LineChart;
