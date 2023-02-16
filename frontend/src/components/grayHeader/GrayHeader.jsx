import { Link } from 'react-router-dom';
import './grayHeader.scss';

const GrayHeader = () => {
	return (
		<div className="gheader">
			<div className="inquiries">
				<span>For Inquiries: </span>+94 76 543 4789
			</div>
			<div className="right">
				<Link
					to={'/login'}
					className="login"
					style={{ textDecoration: 'none', color: 'black' }}
				>
					Login
				</Link>

				<div class="vl"></div>
				<p className="currency">LKR</p>
			</div>
		</div>
	);
};

export default GrayHeader;
