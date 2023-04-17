import React, { useState } from 'react';
import './header.scss';
import { Link, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';

const Header = () => {
	const cart = useSelector((state) => state.cart);
	const [keyword, setKeyword] = useState('');
	const { cartItems } = cart;

	const navigate = useNavigate();

	const navigateToCart = () => {
		navigate('/cart');
	};

	const searchHandler = () => {
		if (keyword.trim()) {
			navigate(`/shop?search=${keyword}`);
		} else {
			navigate('/shop');
		}
	};

	return (
		<div className="full_header">
			<div className="header">
				<div className="logo">
					Vintage Clothing<span>.</span>
				</div>
				<div className="right">
					<ul>
						<Link to={'/'} style={{ textDecoration: 'none' }}>
							<li className="item">Home</li>
						</Link>
						<div class="vl"></div>
						<Link to={'/shop'} style={{ textDecoration: 'none' }}>
							<li className="item">Shop</li>
						</Link>
						<div class="vl"></div>
						<Link to={'/about'} style={{ textDecoration: 'none' }}>
							<li className="item">About Us</li>
						</Link>
						<div class="vl"></div>
						<Link to={'/contact'} style={{ textDecoration: 'none' }}>
							<li className="item">Contact</li>
						</Link>
					</ul>
					<div className="search">
						<input
							type="text"
							placeholder="Search"
							onChange={(e) => setKeyword(e.target.value)}
						/>
						<span onClick={searchHandler}>
							<SearchOutlinedIcon />
						</span>
					</div>
					<div className="btn_cart" onClick={navigateToCart}>
						<button>
							<span className="icon">
								<ShoppingCartOutlinedIcon />
							</span>
							<span className="text">{cartItems.length} Item(s)</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
