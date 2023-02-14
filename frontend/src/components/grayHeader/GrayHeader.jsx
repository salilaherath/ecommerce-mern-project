import './grayHeader.scss';

const GrayHeader = () => {
	return (
		<div className="gheader">
			<div className="inquiries">
				<span>For Inquiries: </span>+94 76 543 4789
			</div>
			<div className="right">
				<p className="login">Login</p>

				<div class="vl"></div>
				<p className="currency">LKR</p>
			</div>
		</div>
	);
};

export default GrayHeader;
