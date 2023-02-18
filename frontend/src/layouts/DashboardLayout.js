import { CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../screens/admin/scenes/global/Sidebar';
import Topbar from '../screens/admin/scenes/global/Topbar';
import { ColorModeContext, useMode } from '../screens/admin/theme';
import './styles.scss';

const DashboardLayout = () => {
	const [theme, colorMode] = useMode();

	return (
		<div className="dashboard-layout">
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<div className="app">
						<Sidebar />
						<main className="content">
							<Topbar />
							<Outlet />
						</main>
						{/* <Sidebar isSidebar={isSidebar} />
           
              <Topbar setIsSidebar={setIsSidebar} /> */}
					</div>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</div>
	);
};

export default DashboardLayout;
