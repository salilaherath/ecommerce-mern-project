import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import GrayHeader from './components/grayHeader/GrayHeader';
import Header from './components/header/Header';
import Home from './screens/home/Home';

const App = () => {
	return (
		<BrowserRouter>
			<GrayHeader />
			<Header />
			<div>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
