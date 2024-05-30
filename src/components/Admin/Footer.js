import { Typography } from '@material-tailwind/react';
import React from 'react';

const Footer = () => {
	return (
		<div className="bg-gray-100 p-4 px-6 border-t-[1px] border-solid border-gray-300">
			<Typography className="text-gray-600 text-sm">
				Copyright © 2024 TechShop
			</Typography>
			<Typography className="text-gray-600 text-sm">
				Version 1.0 dev
			</Typography>
		</div>
	);
};

export default Footer;
