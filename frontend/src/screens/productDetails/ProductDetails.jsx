import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './productDetails.scss';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { listProduct } from '../../features/products/productDataSlice';
import { addToCart } from '../../features/cart/cartActions';
import { message } from 'antd';

const FilterColor = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 15px;
	background-color: ${(props) => props.color};
	margin: 0px 5px;
	cursor: pointer;
	border: ${(props) => (props.active ? '2px solid #ff4e00' : 'none')};
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
`;

const ProductDetails = () => {
	const [qty, setQty] = useState(1);
	const { id } = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listProduct(id));
	}, [dispatch, id]);

	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedColor, setSelectedColor] = useState(null);

	const handleQuantity = (type) => {
		if (type === 'dec') {
			qty > 1 && setQty(qty - 1);
		} else {
			qty < getCountInStock() && setQty(qty + 1);
		}
	};

	const { isLoading, isError, product } = useSelector(
		(state) => state.productDetails
	);

	const handleClick = () => {
		const selectedVariant = product.variation.find(
			(variant) =>
				variant.color === selectedColor && variant.size === selectedSize
		);

		if (selectedVariant) {
			const ob = {
				id: id,
				qty: qty,
				color: selectedColor,
				size: selectedSize,
				variant: selectedVariant._id,
			};
			dispatch(addToCart(ob));
		}
		messageApi.open({
			type: 'success',
			content: 'Successfully added this item to cart',
		});
	};

	const handleSizeChange = (size) => {
		setSelectedSize(size);
	};

	const handleColorChange = (color) => {
		setSelectedColor(color);
	};

	const getCountInStock = () => {
		if (selectedSize && selectedColor) {
			const selectedVariation = product.variation.find(
				(variation) =>
					variation.color === selectedColor && variation.size === selectedSize
			);
			return selectedVariation ? selectedVariation.countInStock : 0;
		} else {
			return product?.variation?.reduce(
				(total, variation) => total + variation.countInStock,
				0
			);
		}
	};

	return (
		<>
			{isLoading ? (
				<CircularProgress />
			) : isError ? (
				<h3>{Error}</h3>
			) : (
				<div className="productDetails">
					<div className="product">
						<div className="image">
							<div className="img1">
								<img src={product.image} alt="" />
							</div>
						</div>

						<div className="details">
							<div className="title">{product.name}</div>
							<div
								className={`stock ${
									getCountInStock() ? 'in-stock' : 'out-of-stock'
								}`}
							>
								{getCountInStock() > 0 ? 'In Stock' : 'Out of Stock'}
							</div>
							<div className="noItems">Only {getCountInStock()} Left</div>
							<div className="rate">
								<Rating value={product.rating} precision={0.5} readOnly />
								<div className="reviews">{product.numReviews} Reviews</div>
							</div>
							<div className="price">Rs. {product.price}.00</div>
							<div className="hl"></div>

							<div className="colorText">Color</div>
							<div className="color">
								<Filter>
									{product.variation &&
										Array.from(
											new Set(
												product.variation.map((variation) => variation.color)
											)
										).map((color, index) => (
											<FilterColor
												color={color}
												key={index}
												onClick={() => handleColorChange(color)}
												active={color === selectedColor}
												disabled={
													!product.variation.some(
														(variation) => variation.color === color
													)
												}
											></FilterColor>
										))}
								</Filter>
							</div>
							<div className="sizeText">Size</div>
							<div className="sizeBtn">
								{product.variation &&
									Array.from(
										new Set(
											product.variation.map((variation) => variation.size)
										)
									).map((size, index) => (
										<div
											className={`size ${
												selectedSize === size ? 'selected' : ''
											}`}
											key={index}
											onClick={() => handleSizeChange(size)}
											disabled={
												!product.variation.some(
													(variation) => variation.size === size
												)
											}
										>
											{size}
										</div>
									))}
							</div>
							<div className="description">
								<div className="text">Product Details</div>
								<div className="para">{product.description}</div>
							</div>
							<div className="hl"></div>

							{getCountInStock() > 0 && (
								<div className="quantity">
									<div className="dec" onClick={() => handleQuantity('dec')}>
										-
									</div>
									<div className="quan">{qty}</div>
									<div className="inc" onClick={() => handleQuantity('inc')}>
										+
									</div>
								</div>
							)}
							<div className="addToCartBtn">
								{contextHolder}
								<button onClick={handleClick}>
									<ShoppingCartOutlinedIcon className="icon" />{' '}
									<span>ADD TO CART</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductDetails;
