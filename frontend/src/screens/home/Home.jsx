import './home.scss';
import { useState } from 'react';
import HomeGrid from '../../components/homeGrid/HomeGrid';
import NewArrivals from '../../components/newArrivals/NewArrivals';

const Home = () => {
	const [category, setCategory] = useState('MEN');

	const handleCategoryChange = (newCategory) => {
		setCategory(newCategory);
	};
	return (
		<div className="home">
			<HomeGrid />
			<div className="title">NEW ARRIVALS</div>
			<div className="categories">
				<ul>
					<li
						className={`item ${category === 'MEN' ? 'active' : ''}`}
						onClick={() => handleCategoryChange('MEN')}
					>
						Men
					</li>
					<li
						className={`item ${category === 'WOMEN' ? 'active' : ''}`}
						onClick={() => handleCategoryChange('WOMEN')}
					>
						Women
					</li>
					{/* <li
						className={`item ${category === 'Kids' ? 'active' : ''}`}
						onClick={() => handleCategoryChange('Kids')}
					>
						Kids
					</li> */}
				</ul>
			</div>
			<div className="hl"></div>
			<NewArrivals category={category} />
		</div>
	);
};

export default Home;
