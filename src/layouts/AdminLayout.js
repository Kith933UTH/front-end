import React from 'react';
import useScrollTop from '../hooks/useScrollTop';

const AdminLayout = ({ children }) => {
	useScrollTop();
	return <div className="max-w-[940px] mx-auto min-h-screen">{children}</div>;
};

export default AdminLayout;
