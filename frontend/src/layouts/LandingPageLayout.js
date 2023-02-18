import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import GrayHeader from '../components/grayHeader/GrayHeader';
import Header from '../components/header/Header';

const LandingPageLayout = () => {
	return (
		<div className="landingpage-layout">
			<GrayHeader />
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default LandingPageLayout;
