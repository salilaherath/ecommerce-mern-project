import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import LandingPageLayout from './layouts/LandingPageLayout';
import DashboardLayout from './layouts/DashboardLayout';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<LandingPageLayout />} />
						<Route path="/*" element={<LandingPageLayout />} />
						<Route path="dashboard/*" element={<DashboardLayout />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
