import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNav from '../components/Users/UserNav';

const UserPage = () => {
	return (
		<div className="w-full my-6 grid grid-cols-1 gap-8 md:grid-cols-4">
			<div className="w-full md:col-span-1">
				<UserNav />
			</div>
			<div className="w-full md:col-span-3">
				<Outlet />
			</div>
		</div>
	);
};

export default UserPage;
