import { Typography, Card, Button } from '@material-tailwind/react';
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from './UsersSlice';

const UserNav = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const username = useSelector((state) => state.users.userInfo.username);
	const handleLogout = () => {
		dispatch(logOut());
		navigate('/');
	};
	return (
		<Card className="w-full shadow-none bg-transparent">
			<div className="mb-4 md:px-4 border-solid border-b-[1px] border-slate-900 pb-4 flex justify-between items-center">
				<div className="text-text bg-main md:bg-transparent py-1 px-2 md:p-0 rounded-md md:rounded-none">
					<Typography className="text-lg">
						{/* {user.gender === 'male' ? 'Mr.' : 'Ms.'}{' '} */}
						<span className="text-xl font-semibold">
							{username}
						</span>
					</Typography>
				</div>
				<Button className="flex h-min md:hidden items-center justify-center text-red-700 text-xs font-semibold p-1 border-solid rounded border-[1px] border-red-700 normal-case hover:opacity-60">
					Log out
				</Button>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-1 gap-2">
				<NavLink
					to="/user/order"
					className={({ isActive }) =>
						`flex flex-col md:flex-row items-center font-semibold gap-1 md:gap-4 p-2 text-text text-lg rounded hover:opacity-60 ${
							isActive && 'bg-main !text-highlight'
						}`
					}
				>
					<ShoppingBagIcon className="h-6 w-6" />
					Orders
				</NavLink>

				<NavLink
					to="/user"
					className={({ isActive }) =>
						`flex flex-col md:flex-row items-center font-semibold gap-1 md:gap-4 p-2 text-text text-lg rounded hover:opacity-60 ${
							isActive && 'bg-main !text-highlight'
						}`
					}
					end
				>
					<UserCircleIcon className="h-6 w-6" />
					Profile
				</NavLink>

				<Button
					onClick={handleLogout}
					className="mt-4 hidden md:flex items-center justify-center text-red-700 text-base font-semibold p-2 border-solid rounded border-[1px] border-red-700 normal-case hover:opacity-60"
				>
					Log out
				</Button>
			</div>
		</Card>
	);
};

export default UserNav;
