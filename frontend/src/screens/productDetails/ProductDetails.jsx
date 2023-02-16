import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './productDetails.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { listProductDetails } from '../../actions/productActions';

const FilterColor = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 15px;
	background-color: ${(props) => props.color};
	margin: 0px 5px;
	cursor: pointer;
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
`;

const ProductDetails = () => {
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const { id } = useParams();

	useEffect(() => {
		dispatch(listProductDetails(id));
	}, [dispatch, id]);

	const [color, setColor] = useState('');
	const [size, setSize] = useState('');
	//const dispatch = useDispatch();

	// useEffect(() => {
	//   const getProduct = async () => {
	//     try {
	//       const res = await publicRequest.get('/products/find/' + id);
	//       setProduct(res.data);
	//     } catch (err) {}
	//   };
	//   getProduct();
	// }, [id]);

	const handleQuantity = (type) => {
		if (type === 'dec') {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
		}
	};

	let navigate = useNavigate();

	const handleClick = () => {
		navigate(`/cart/${id}?qty=${quantity}?color=${color}?size=${size}`);
	};

	return (
		<>
			{loading ? (
				<CircularProgress />
			) : error ? (
				<h3>{error}</h3>
			) : (
				<div className="productDetails">
					<div className="product">
						<div className="image">
							<div className="img1">
								<img src={product.image} alt="" />
							</div>

							{/* <div className="img2">
						<img src={product.image} alt="" />
					</div>

					<div className="img3">
						<img src={product.image} alt="" />
					</div>

					<div className="img4">
						<img src={product.image} alt="" />
					</div> */}
						</div>

						<div className="details">
							<div className="title">{product.name}</div>
							<div className="stock">
								{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
							</div>
							<div className="noItems">Only {product.countInStock} Left</div>
							<div className="rate">
								<Rating value={product.rating} precision={0.5} readOnly />
								<div className="reviews">{product.numReviews} Reviews</div>
							</div>
							<div className="price">Rs. {product.price}.00</div>
							<div className="hl"></div>
							<div className="sizeText">Size</div>
							<div className="sizeBtn">
								{product.size?.map((s) => (
									<div key={s} onClick={() => setSize(s)}>
										{s}
									</div>
								))}
							</div>
							<div className="colorText">Color</div>
							<div className="color">
								<Filter>
									{product.color?.map((c) => (
										<FilterColor
											color={c}
											key={c}
											onClick={() => setColor(c)}
										/>
									))}
								</Filter>
							</div>
							<div className="description">
								<div className="text">Product Details</div>
								<div className="para">{product.description}</div>
							</div>
							<div className="hl"></div>

							{product.countInStock > 0 && (
								<div className="quantity">
									<div className="dec" onClick={() => handleQuantity('dec')}>
										-
									</div>
									<div className="quan">{quantity}</div>
									<div className="inc" onClick={() => handleQuantity('inc')}>
										+
									</div>
								</div>
							)}
							<div className="addToCartBtn">
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
