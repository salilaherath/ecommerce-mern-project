import { Outlet, Route, Routes } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import GrayHeader from '../components/grayHeader/GrayHeader';
import Header from '../components/header/Header';
import About from '../screens/about/About';
import Cart from '../screens/cart/Cart';
import Checkout from '../screens/checkout/Checkout';
import Contact from '../screens/contact/Contact';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import Payment from '../screens/payment/Payment';
import ProductDetails from '../screens/productDetails/ProductDetails';
import ProfileScreen from '../screens/profile/Profile';
import Register from '../screens/register/Register';
import Shop from '../screens/shop/Shop';

const LandingPageLayout = () => {
	return (
		<div className="landingpage-layout">
			<GrayHeader />
			<Header />
			<main>
				<Routes>
					<Route path="/">
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
						<Route path="checkout" element={<Checkout />} />
						<Route path="payment" element={<Payment />} />
						<Route path="users/profile" element={<ProfileScreen />} />
					</Route>
				</Routes>
			</main>
			<Footer />
		</div>
	);
};

export default LandingPageLayout;
