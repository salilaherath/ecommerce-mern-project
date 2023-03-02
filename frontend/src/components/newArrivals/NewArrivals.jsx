import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './newArrivals.scss';
import ProductCard from '../productCard/ProductCard';
//import { listProducts } from '../../actions/productActions';
import { CircularProgress } from '@mui/material';
import { fetchLatestProducts } from '../../features/products/latestProductsSlice';

const NewArrivals = ({ category }) => {
	// const dispatch = useDispatch();

	// const productList = useSelector((state) => state.productList);
	// //const { loading, error, products } = productList;

	// useEffect(() => {
	// 	dispatch(listProducts());
	// }, [dispatch]);

	// const [products, setProducts] = useState([]);

	// useEffect(() => {
	// 	async function fetchLatestProducts() {
	// 		const response = await axios.get('/api/products/latest');
	// 		setProducts(response.data);
	// 	}

	// 	fetchLatestProducts();
	// }, []);

	const dispatch = useDispatch();
	const latestProducts = useSelector((state) => state.latestProducts.products);
	//const { isLoading, isError, isSuccess, message } = latestProducts;

	useEffect(() => {
		dispatch(fetchLatestProducts(category));
	}, [dispatch, category]);

	return (
		<div>
			<div className="newArrival">
				{/* {isLoading ? (
					<CircularProgress />
				) : isError ? (
					<h3>{Error}</h3>
				) : ( */}
				<div className="products">
					{latestProducts.map((product) => (
						<ProductCard product={product} key={product._id} />
					))}
				</div>
				{/* )} */}
			</div>
		</div>
	);
};

export default NewArrivals;
