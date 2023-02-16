import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import GrayHeader from './components/grayHeader/GrayHeader';
import Header from './components/header/Header';
import Home from './screens/home/Home';
import Shop from './screens/shop/Shop';
import About from './screens/about/About';
import Contact from './screens/contact/Contact';
import ProductDetails from './screens/productDetails/ProductDetails';
import Cart from './screens/cart/Cart';

const App = () => {
	return (
		<BrowserRouter>
			<GrayHeader />
			<Header />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/shop/:category" element={<Shop />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/product/:id" element={<ProductDetails />} />
					<Route path="/cart/:id?" element={<Cart />} />
				</Routes>
			</div>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
