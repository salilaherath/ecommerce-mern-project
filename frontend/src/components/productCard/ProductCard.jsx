import './productCard.scss';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Rating } from '@mui/material';

const ProductCard = ({ product }) => {
	return (
		<div>
			<div className="cards">
				<div className="card" key={product._id}>
					<div className="image">
						<img src={product.image} alt="" />
					</div>
					<div className="fRow">
						<div className="name">{product.name}</div>
						<ShoppingCartOutlinedIcon className="cart" />
					</div>

					<div className="sRow">
						<div className="price">Rs. {product.price}</div>
						<Rating value={product.rating} precision={0.5} readOnly />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
