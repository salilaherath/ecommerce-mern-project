import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './shop.scss';
import ProductCard from '../../components/productCard/ProductCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { listProducts } from '../../features/products/productListDataSlice';
import { CircularProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Checkbox } from 'antd';

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

function valuetext(value) {
	return `${value}`;
}

const CheckboxGroup = Checkbox.Group;
const plainOptions = [
	'Red',
	'Green',
	'Blue',
	'Orange',
	'Yellow',
	'Black',
	'White',
];
const defaultCheckedList = [];

const Shop = () => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { isLoading, isError, products, isSuccess, message } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	const [value, setValue] = React.useState([1000, 5000]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState('newest');

	const handleFilters = (e) => {
		const value = e.target.value;
		setFilters({
			...filters,
			[e.target.name]: value,
		});
	};

	const [checkedList, setCheckedList] = useState(defaultCheckedList);
	const [indeterminate, setIndeterminate] = useState(true);
	const [checkAll, setCheckAll] = useState(false);
	const onChange = (list) => {
		setCheckedList(list);
		setIndeterminate(!!list.length && list.length < plainOptions.length);
		setCheckAll(list.length === plainOptions.length);
	};
	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? plainOptions : []);
		setIndeterminate(false);
		setCheckAll(e.target.checked);
	};

	return (
		<div className="shop">
			<div className="shop-container">
				<div className="filters">
					<div className="categories">
						<h3>SHOP BY CATEGORIES</h3>
						<ul>
							<li>
								<ArrowForwardIcon className="icon" />
								T-Shirts
							</li>
							<li>
								<ArrowForwardIcon className="icon" />
								Casual Shirts
							</li>
							<li>
								<ArrowForwardIcon className="icon" />
								Formal Shirts
							</li>
							<li>
								<ArrowForwardIcon className="icon" />
								Trousers
							</li>
							<li>
								<ArrowForwardIcon className="icon" />
								Shorts
							</li>
							<li>
								<ArrowForwardIcon className="icon" />
								Accessories
							</li>
							<li>
								<ArrowForwardIcon className="icon" />
								Underwear & Socks
							</li>
							<li>
								<ArrowForwardIcon className="icon" />
								Footwears
							</li>
						</ul>
					</div>
					<div className="price-range">
						<h3>FILTER PRICE</h3>
						<ThemeProvider theme={theme}>
							<Box sx={{ width: 200 }}>
								<Slider
									getAriaLabel={() => 'Price Range'}
									value={value}
									onChange={handleChange}
									valueLabelDisplay="auto"
									getAriaValueText={valuetext}
									min={1000}
									max={9000}
									step={100}
								/>
							</Box>
						</ThemeProvider>
					</div>
					<div className="colors">
						<h3>COLOR</h3>
						<Checkbox
							indeterminate={indeterminate}
							onChange={onCheckAllChange}
							checked={checkAll}
						>
							All Colors
						</Checkbox>
						<CheckboxGroup
							options={plainOptions}
							value={checkedList}
							onChange={onChange}
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginInlineStart: 0,
							}}
						/>
					</div>
					<div className="colors">
						<h3>SIZE</h3>
						<select
							name="size"
							id=""
							defaultValue={'DEFAULT'}
							onChange={handleFilters}
						>
							<option value="DEFAULT" disabled>
								Size
							</option>
							<option value="S">S</option>
							<option value="M">M</option>
							<option value="L">L</option>
							<option value="XL">XL</option>
						</select>
					</div>
					<div className="colors">
						<h3>Sort Products:</h3>
						<select name="sort" id="" onChange={(e) => setSort(e.target.value)}>
							<option defaultValue="newest">Newest</option>
							<option value="asc">Price (asc)</option>
							<option value="desc">Price (desc)</option>
						</select>
					</div>
				</div>

				{isLoading ? (
					<CircularProgress />
				) : isError ? (
					<h3>{Error}</h3>
				) : (
					<div className="products">
						<div className="product_cards">
							{products.map((product) => (
								<ProductCard product={product} key={product._id} />
							))}
						</div>
						<ThemeProvider theme={theme}>
							<Pagination count={10} shape="rounded" color="primary" />
						</ThemeProvider>
					</div>
				)}

				{/* <Products cat={cat} filters={filters} sort={sort} /> */}
			</div>
		</div>
	);
};

export default Shop;
