import './newArrivals.scss';
import products from '../../products';
import ProductCard from '../productCard/ProductCard';

const NewArrivals = () => {
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
						<ProductCard product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default NewArrivals;
