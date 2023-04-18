import './homeGrid.scss';

const HomeGrid = () => {
	return (
		<div className="grid-container">
			<div className="first">
				{/* <div className="text">
					<div className="small">Top</div>
					<div className="big">Men</div>
					<div className="extra-small">30% OFF</div>
				</div> */}
			</div>
			<div className="second-container">
				<div className="second">
					{/* <div className="text">
						<div className="small">Top</div>
						<div className="big">Women</div>
						<div className="medium">30% OFF</div>
					</div> */}
				</div>
				<div className="third">
					{/* <div className="text">
						<div className="small">Top</div>
						<div className="big">Kids</div>
						<div className="medium">30% OFF</div>
					</div> */}
				</div>
				<div className="fourth">
					{/* <div className="text">
						<div className="small">Up to</div>
						<div className="big">10% Off</div>
						<div className="medium">Accessories</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default HomeGrid;
