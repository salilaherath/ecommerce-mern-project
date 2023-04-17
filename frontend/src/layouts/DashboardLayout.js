import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Charts from '../screens/admin/scenes/Charts';
import AddProducts from '../screens/admin/scenes/AddProducts';
import Overview from '../screens/admin/scenes/Overview';
import Customers from '../screens/admin/scenes/Users';
import Sidebar from '../screens/admin/scenes/global/Sidebar';
import Topbar from '../screens/admin/scenes/global/Topbar';
import Orders from '../screens/admin/scenes/Orders';
import Products from '../screens/admin/scenes/Products';
import { ColorModeContext, useMode } from '../screens/admin/theme';
import './styles.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import EditProducts from '../screens/admin/scenes/EditProducts';
import Users from '../screens/admin/scenes/Users';

const DashboardLayout = () => {
	const [theme, colorMode] = useMode();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.userLogInDetails.userInfo);

	useEffect(() => {
		if (userInfo !== null) {
			if (!userInfo.isAdmin) {
				navigate('../login');
			}
		} else {
			navigate('../login');
		}
	}, [navigate, userInfo]);

	return (
		userInfo &&
		userInfo.isAdmin && (
			<div className="dashboard-layout">
				<ColorModeContext.Provider value={colorMode}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<div className="app">
							<Sidebar />
							<main className="content">
								<Topbar />
								<Routes>
									<Route path="/">
										<Route index element={<Overview />} />
										<Route path="products" element={<Products />} />
										<Route path="addProducts" element={<AddProducts />} />
										<Route path="editProducts/:id" element={<EditProducts />} />
										<Route path="users" element={<Users />} />
										<Route path="orders" element={<Orders />} />
										<Route path="charts" element={<Charts />} />
									</Route>
								</Routes>
							</main>
							{/* <Sidebar isSidebar={isSidebar} />
           
              <Topbar setIsSidebar={setIsSidebar} /> */}
						</div>
					</ThemeProvider>
				</ColorModeContext.Provider>
			</div>
		)
	);
};

export default DashboardLayout;
