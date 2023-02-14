import React from 'react';
import { useState } from 'react';
import './shop.scss';
import products from '../../products';
import ProductCard from '../../components/productCard/ProductCard';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const Shop = () => {
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
						<select
							name="color"
							id=""
							onChange={handleFilters}
							defaultValue={'DEFAULT'}
						>
							<option value="DEFAULT" disabled>
								Color
							</option>
							<option value="White">White</option>
							<option value="Black">Black</option>
							<option value="Red">Red</option>
							<option value="Blue">Blue</option>
							<option value="Yellow">Yellow</option>
							<option value="Gray">Gray</option>
							<option value="Orange">Orange</option>
						</select>

						{/* <FormGroup name='color' onChange={handleFilters}>
            <FormControlLabel
              control={<Checkbox style={{ paddingBottom: 0, paddingTop: 0 }} />}
              label='BLACK'
            />
            <FormControlLabel
              control={<Checkbox style={{ paddingBottom: 0, paddingTop: 0 }} />}
              label='GREY'
            />
            <FormControlLabel
              control={<Checkbox style={{ paddingBottom: 0, paddingTop: 0 }} />}
              label='RED'
            />
            <FormControlLabel
              control={<Checkbox style={{ paddingBottom: 0, paddingTop: 0 }} />}
              label='BLUE'
            />
            <FormControlLabel
              control={<Checkbox style={{ paddingBottom: 0, paddingTop: 0 }} />}
              label='YELLOW'
            />
            <FormControlLabel
              control={<Checkbox style={{ paddingBottom: 0, paddingTop: 0 }} />}
              label='GREEN'
            />
          </FormGroup> */}
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
						{/* <FormGroup name='size' onChange={handleFilters}>
            <FormControlLabel
              control={<Checkbox style={{ paddingBottom: 0, paddingTop: 0 }} />}
              label='S'
            />
            <FormControlLabel
              control={<Checkbox style={{ paddingBottom: 0, paddingTop: 0 }} />}
              label='M'
            />
            <FormControlLabel
              control={<Checkbox style={{ paddingBottom: 0, paddingTop: 0 }} />}
              label='L'
            />
            <FormControlLabel
              control={<Checkbox style={{ paddingBottom: 0, paddingTop: 0 }} />}
              label='XL'
            />
          </FormGroup> */}
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

				<div className="products">
					{products.map((product) => (
						<ProductCard product={product} />
					))}
					{/* <Products cat={cat} filters={filters} sort={sort} /> */}
				</div>
			</div>
		</div>
	);
};

export default Shop;
