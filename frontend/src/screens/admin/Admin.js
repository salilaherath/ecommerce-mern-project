import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import { ColorModeContext, useMode } from './theme';
import Dashboard from './scenes/Dashboard';
import Products from './scenes/Products';
import Users from './scenes/Users';
import Orders from './scenes/Orders';
import Charts from './scenes/Charts';

function Admin() {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<main className="content">
						<Topbar />
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/products" element={<Products />} />
							<Route path="/users" element={<Users />} />
							<Route path="/orders" element={<Orders />} />
							<Route path="/charts" element={<Charts />} />
						</Routes>
					</main>
					{/* <Sidebar isSidebar={isSidebar} />
           
              <Topbar setIsSidebar={setIsSidebar} /> */}
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default Admin;
