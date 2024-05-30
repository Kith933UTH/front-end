import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import {
	HomeIcon,
	FolderPlusIcon,
	// HashtagIcon,
	UsersIcon,
	ClipboardDocumentIcon,
} from '@heroicons/react/24/solid';
import {
	BsFillMouseFill,
	BsFillPhoneFill,
	BsFillTabletFill,
	BsKeyboardFill,
	BsLaptopFill,
} from 'react-icons/bs';
import { PiHeadphonesFill } from 'react-icons/pi';
import { TiBatteryCharge } from 'react-icons/ti';
import { IoWatch } from 'react-icons/io5';
import { MdCable } from 'react-icons/md';

const adminNavigateList = [
	{
		title: 'Quick Links',
		list: [
			{
				title: 'Dashboard',
				path: '/admin',
				icon: <HomeIcon className="w-4 h-4" />,
				end: true,
			},
			{
				title: 'New product',
				path: '/admin/products',
				icon: <FolderPlusIcon className="w-4 h-4" />,
				end: true,
			},
			// {
			// 	title: 'New attribute',
			// 	path: '/admin/attributes',
			// 	icon: <HashtagIcon className="w-4 h-4" />,
			// 	end: true,
			// },
		],
	},
	{
		title: 'Products',
		list: [
			{
				title: 'Laptop',
				path: '/admin/products/laptops',
				icon: <BsLaptopFill />,
			},
			{
				title: 'Phone',
				path: '/admin/products/smartPhones',
				icon: <BsFillPhoneFill />,
			},
			{
				title: 'Tablet',
				path: '/admin/products/tablets',
				icon: <BsFillTabletFill />,
			},
			{
				title: 'Smartwatch',
				path: '/admin/products/smartwatches',
				icon: <IoWatch />,
			},
			{
				title: 'Charger',
				path: '/admin/products/chargers',
				icon: <TiBatteryCharge />,
			},
			{
				title: 'Cable',
				path: '/admin/products/cables',
				icon: <MdCable />,
			},
			{
				title: 'Headphone',
				path: '/admin/products/headphones',
				icon: <PiHeadphonesFill />,
			},
			{
				title: 'Mouse',
				path: '/admin/products/mouses',
				icon: <BsFillMouseFill />,
			},
			{
				title: 'Keyboard',
				path: '/admin/products/keyboards',
				icon: <BsKeyboardFill />,
			},
		],
	},
	{
		title: 'Sale',
		list: [
			{
				title: 'Orders',
				path: '/admin/orders',
				icon: <ClipboardDocumentIcon className="w-4 h-4" />,
			},
		],
	},
	{
		title: 'Customers',
		list: [
			{
				title: 'Customers',
				path: '/admin/customers',
				icon: <UsersIcon className="w-4 h-4" />,
			},
		],
	},
];

const Sidebar = () => {
	return (
		<div className="w-full h-full bg-white shadow-xl text-main shadow-blue-gray-900/5 rounded-r-md flex flex-col">
			<div className="flex flex-col text-main overflow-y-scroll flex-1 admin-navigation pb-8 pt-1">
				{adminNavigateList.map((navigateItem) => (
					<div
						key={'navigate' + navigateItem.title}
						className="flex flex-col"
					>
						<Typography className="text-[11px] uppercase font-semibold pt-3 pb-3 pl-4">
							{navigateItem.title}
						</Typography>
						<div className="flex flex-col gap-1">
							{navigateItem.list.map((item) => (
								<NavLink
									key={'navigate-item-' + item.title}
									to={item.path}
									className={({ isActive }) =>
										`flex gap-3 ml-2 mr-1 pl-6 py-3 rounded-md hover:bg-gray-300 relative ${
											isActive &&
											'bg-gray-200 text-admin before:contents-[""] before:absolute before:h-full before:w-1 before:bg-admin before:left-0 before:top-0 before:rounded-md'
										}`
									}
									end={item?.end}
								>
									{item.icon}
									<Typography className="text-sm font-semibold">
										{item.title}
									</Typography>
								</NavLink>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
