import React from 'react';

import useScrollTop from '../hooks/useScrollTop';

const AdminWideLayout = ({ children }) => {
	useScrollTop();
	return (
		<div className="max-w-[1200px] mx-auto min-h-screen ">{children}</div>
	);
};

export default AdminWideLayout;
