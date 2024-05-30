import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { Typography } from '@material-tailwind/react';

import laptopImg from '../../../assets/img/laptop-img.png';
import phoneImg from '../../../assets/img/smartphone-img.png';
import tabletImg from '../../../assets/img/tablet-img.png';
import smartwatchImg from '../../../assets/img/smartwatch-img.png';
import chargerImg from '../../../assets/img/charger-img.png';
import cableImg from '../../../assets/img/cable-img.png';
import headphoneImg from '../../../assets/img/headphone-img.png';
import mouseImg from '../../../assets/img/mouse-img.png';
import keyboardImg from '../../../assets/img/keyboard-img.png';

const ChooseNewProduct = () => {
	const cateList = [
		{
			title: 'Laptop',
			path: '/admin/products/laptops/new',
			img: laptopImg,
		},
		{
			title: 'Phone',
			path: '/admin/products/phones/new',
			img: phoneImg,
		},
		{
			title: 'Tablet',
			path: '/admin/products/tablets/new',
			img: tabletImg,
		},
		{
			title: 'Smartwatch',
			path: '/admin/products/smartwatches/new',
			img: smartwatchImg,
		},
		{
			title: 'Charger',
			path: '/admin/products/chargers/new',
			img: chargerImg,
		},
		{
			title: 'Cable',
			path: '/admin/products/cables/new',
			img: cableImg,
		},
		{
			title: 'Headphone',
			path: '/admin/products/headphones/new',
			img: headphoneImg,
		},
		{
			title: 'Mouse',
			path: '/admin/products/mouses/new',
			img: mouseImg,
		},
		{
			title: 'Keyboard',
			path: '/admin/products/keyboards/new',
			img: keyboardImg,
		},
	];

	return (
		<AdminLayout>
			<div className="text-main">
				<Typography className="text-xl font-semibold my-6">
					Create A New <span className="text-admin">Product (+)</span>
				</Typography>
				<div className="grid grid-cols-3 gap-6">
					{cateList.map((cate) => (
						<Link to={cate.path} key={cate.path}>
							<div className="hover:scale-105 hover:bg-gray-400 transform transition duration-300 flex flex-col items-center h-full w-full bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-500 p-5 gap-2">
								<img
									src={cate.img}
									alt={cate.title}
									className="w-16 h-16 object-cover"
								/>
								<Typography className="text-admin text-center font-extrabold text-xl -mr-4 tracking-[0.4rem] drop-shadow-[1px_1px_1px_white]">
									{cate.title}
								</Typography>
							</div>
						</Link>
					))}
				</div>
			</div>
		</AdminLayout>
	);
};

export default ChooseNewProduct;
