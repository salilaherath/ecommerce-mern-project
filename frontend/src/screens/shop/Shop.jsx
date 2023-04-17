import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './shop.scss';
import ProductCard from '../../components/productCard/ProductCard';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Checkbox } from 'antd';
import {
	fetchFilteredProducts,
	setCurrentPage,
} from '../../features/products/productsByFiltersDataSlice';

const theme = createTheme({
	palette: {
		primary: {
			main: '#FF4E00',
		},
		secondary: {
			main: '#494c7d',
		},
	},
});

const colorOptions = [
	{ label: 'Red', value: 'Red' },
	{ label: 'Green', value: 'Green' },
	{ label: 'Blue', value: 'Blue' },
	{ label: 'Orange', value: 'Orange' },
	{ label: 'Yellow', value: 'Yellow' },
	{ label: 'Black', value: 'Black' },
	{ label: 'White', value: 'White' },
];

const mainOptions = [
	{ label: 'Men', value: 'MEN' },
	{ label: 'Women', value: 'WOMEN' },
];

const subOptions = [
	{ label: 'T-Shirts', value: 'Tshirt' },
	{ label: 'Shirt', value: 'Shirt' },
	{ label: 'Shorts', value: 'Shorts' },
	{ label: 'Trousers', value: 'Trousers' },
];
const Shop = () => {
	const dispatch = useDispatch();
	const filteredProducts = useSelector(
		(state) => state.filteredProducts.products
	);
	const currentPage = useSelector(
		(state) => state.filteredProducts.currentPage
	);
	const totalPages = useSelector((state) => state.filteredProducts.totalPages);
	const [page, setPage] = useState(1);
	const [main, setMain] = useState([]);
	const [sub, setSub] = useState([]);
	const [color, setColor] = useState([]);
	// const { isLoading, isError, products } = filteredProducts;
	const [priceRange, setPriceRange] = React.useState([1000, 9000]);

	useEffect(() => {
		dispatch(
			fetchFilteredProducts({
				page,
				limit: 9,
				main,
				sub,
				color,
				priceRange,
			})
		);
		dispatch(setCurrentPage(page));
		window.scrollTo(0, 0);
	}, [dispatch, page, main, sub, color, priceRange]);

	const handlePriceChange = (event, newValue) => {
		setPriceRange(newValue);
	};

	const valuetext = (value) => {
		return `$${value}`;
	};

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const onMainCatChange = (values) => {
		setMain(values);
		setPage(1);
		dispatch(setCurrentPage(1));
	};

	const onSubCatChange = (values) => {
		setSub(values);
		setPage(1);
		dispatch(setCurrentPage(1));
	};

	const onColorChange = (values) => {
		setColor(values);
		setPage(1);
		dispatch(setCurrentPage(1));
	};

	return (
		<div className="shop">
			<div className="shop-container">
				<div className="filters">
					<div className="categories">
						<h3>SHOP BY CATEGORIES</h3>
						<Checkbox.Group
							onChange={onMainCatChange}
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{mainOptions.map((option) => (
								<Checkbox key={option.value} value={option.value}>
									{option.label}
								</Checkbox>
							))}
						</Checkbox.Group>

						<div className="hl"></div>

						<Checkbox.Group
							onChange={onSubCatChange}
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{subOptions.map((option) => (
								<Checkbox key={option.value} value={option.value}>
									{option.label}
								</Checkbox>
							))}
						</Checkbox.Group>
					</div>
					<div className="price-range">
						<h3>FILTER PRICE</h3>
						<ThemeProvider theme={theme}>
							<Box sx={{ width: 200 }}>
								<Slider
									getAriaLabel={() => 'Price Range'}
									value={priceRange}
									onChange={handlePriceChange}
									valueLabelDisplay="auto"
									getAriaValueText={valuetext}
									min={1000}
									max={9000}
									step={100}
								/>
								<div>
									Rs.{priceRange[0]} - Rs.{priceRange[1]}
								</div>
							</Box>
						</ThemeProvider>
					</div>
					<div className="colors">
						<h3>COLOR</h3>
						<Checkbox.Group
							onChange={onColorChange}
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{colorOptions.map((option) => (
								<Checkbox key={option.value} value={option.value}>
									{option.label}
								</Checkbox>
							))}
						</Checkbox.Group>
					</div>
					{/* <div className="colors">
						<h3>Sort Products:</h3>
						<select name="sort" id="" onChange={(e) => setSort(e.target.value)}>
							<option defaultValue="newest">Newest</option>
							<option value="asc">Price (asc)</option>
							<option value="desc">Price (desc)</option>
						</select>
					</div> */}
				</div>
				<div className="products">
					<div className="product_cards">
						{filteredProducts.map((product) => (
							<ProductCard product={product} key={product._id} />
						))}
					</div>
					<div className="pagination">
						<ThemeProvider theme={theme}>
							<Pagination
								count={10}
								page={page}
								onChange={handlePageChange}
								shape="rounded"
								color="primary"
							/>
						</ThemeProvider>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
