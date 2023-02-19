import React from 'react';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import Home from './screens/home/Home';
import Shop from './screens/shop/Shop';
import About from './screens/about/About';
import Contact from './screens/contact/Contact';
import ProductDetails from './screens/productDetails/ProductDetails';
import Cart from './screens/cart/Cart';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import LandingPageLayout from './layouts/LandingPageLayout';
import Overview from './screens/admin/scenes/Overview';
import Products from './screens/admin/scenes/Products';
import Customers from './screens/admin/scenes/Customers';
import Orders from './screens/admin/scenes/Orders';
import Charts from './screens/admin/scenes/Charts';
import AddProducts from './screens/admin/scenes/AddProducts';
import DashboardLayout from './layouts/DashboardLayout';

const landingRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<LandingPageLayout />}>
			<Route index element={<Home />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="shop" element={<Shop />} />
			<Route path="shop/:category" element={<Shop />} />
			<Route path="about" element={<About />} />
			<Route path="contact" element={<Contact />} />
			<Route path="product/:id" element={<ProductDetails />} />
			<Route path="cart" element={<Cart />} />
			<Route path="cart/:id?" element={<Cart />} />
			<Route path="dashboard" element={<DashboardLayout />}>
				<Route path="overview" element={<Overview />} />
				<Route path="products" element={<Products />} />
				<Route path="customers" element={<Customers />} />
				<Route path="orders" element={<Orders />} />
				<Route path="charts" element={<Charts />} />
			</Route>
		</Route>
	)
);

const dashboardRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="dashboard/" element={<DashboardLayout />}>
			<Route index element={<Overview />} />
			<Route path="products" element={<Products />} />
			<Route path="addProducts" element={<AddProducts />} />
			<Route path="customers" element={<Customers />} />
			<Route path="orders" element={<Orders />} />
			<Route path="charts" element={<Charts />} />
		</Route>
	)
);

const App = () => {
	return <RouterProvider router={landingRouter} />;
	// return <RouterProvider router={dashboardRouter} />;
};

export default App;
