import { BsKeyboard, BsLaptop, BsPhone } from 'react-icons/bs';
import { ImTablet } from 'react-icons/im';
import { IoWatch } from 'react-icons/io5';
import { TbBatteryCharging, TbGridDots } from 'react-icons/tb';
import { MdCable } from 'react-icons/md';
import { BiHeadphone } from 'react-icons/bi';
import { CiDesktopMouse2 } from 'react-icons/ci';

const CateList = [
	{ path: 'laptops', title: 'Laptop', children: null, icon: <BsPhone /> },
	{ path: 'smartPhones', title: 'Phone', children: null, icon: <BsLaptop /> },
	{ path: 'tablets', title: 'Tablet', children: null, icon: <ImTablet /> },
	{
		path: 'smartWatches',
		title: 'Smart Watch',
		children: null,
		icon: <IoWatch />,
	},
	{
		path: 'all-accessories',
		title: 'Accessories',
		icon: <TbGridDots />,
		children: [
			{
				path: 'chargers',
				title: 'Charger',
				children: null,
				icon: <TbBatteryCharging />,
			},
			{
				path: 'cables',
				title: 'Cable',
				children: null,
				icon: <MdCable />,
			},
			{
				path: 'headphones',
				title: 'Headphone',
				children: null,
				icon: <BiHeadphone />,
			},
			{
				path: 'mouses',
				title: 'Mouse',
				children: null,
				icon: <CiDesktopMouse2 />,
			},
			{
				path: 'keyboards',
				title: 'Keyboard',
				children: null,
				icon: <BsKeyboard />,
			},
		],
	},
];
export default CateList;
