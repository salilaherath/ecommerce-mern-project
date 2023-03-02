import './productCard.scss';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Rating } from '@mui/material';

const ProductCard = ({ product }) => {
	return (
		<div>
			<div className="cards">
				<div className="card" key={product._id}>
					<Link
						to={`/product/${product._id}`}
						style={{ textDecoration: 'none' }}
						className="image"
					>
						<img src={product.image} alt="" />
					</Link>
					<div className="fRow">
						<Link
							to={`/product/${product._id}`}
							style={{ textDecoration: 'none', color: 'black' }}
							className="name"
						>
							{product.name}
						</Link>
						<ShoppingCartOutlinedIcon className="cart" />
					</div>

					<div className="sRow">
						<div className="price">Rs. {product.price}.00</div>
						<Rating value={product.rating} precision={0.5} readOnly />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
