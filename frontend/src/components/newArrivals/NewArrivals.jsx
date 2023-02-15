import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './newArrivals.scss';
import ProductCard from '../productCard/ProductCard';
import { listProducts } from '../../actions/productActions';

const NewArrivals = () => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

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
				{loading ? (
					<h2>Loading...</h2>
				) : error ? (
					<h3>{error}</h3>
				) : (
					<div className="products">
						{products.map((product) => (
							<ProductCard product={product} key={product._id} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default NewArrivals;
