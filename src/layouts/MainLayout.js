import React from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useScrollTop from '../hooks/useScrollTop';

const MainLayout = ({ children }) => {
	useScrollTop();
	return (
		<>
			<Header />
			<div className="max-w-[1200px] mx-auto min-h-screen tablet:py-4 px-4 desktop:px-0">
				{children}
			</div>
			<Footer />
		</>
	);
};

export default MainLayout;
