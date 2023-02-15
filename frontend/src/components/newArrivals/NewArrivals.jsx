import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newArrivals.scss';
import ProductCard from '../productCard/ProductCard';

const NewArrivals = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get('/api/products');

			setProducts(data);
		};
		fetchProducts();
	}, []);

	return (
		<div>
			<div className="newArrival">
				<div className="title">NEW ARRIVALS</div>
				<div className="categories">
					<ul>
						<li className="item">Men</li>
						<li className="item">Women</li>
						<li className="item">Kids</li>
						<li className="item">Sale</li>
					</ul>
				</div>
				<div className="hl"></div>
				<div className="products">
					{products.map((product) => (
						<ProductCard product={product} key={product._id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default NewArrivals;
