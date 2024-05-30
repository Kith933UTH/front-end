import { Typography } from '@material-tailwind/react';
import React from 'react';
import { LAPTOPPOLICY } from '../../../resources/Laptop';
import { PHONEPOLICY } from '../../../resources/Phone';
import { TABLETPOLICY } from '../../../resources/Tablet';
import { SMARTWATCHPOLICY } from '../../../resources/SmartWatch';
import { CHARGERPOLICY } from '../../../resources/Charger';
import { CABLEPOLICY } from '../../../resources/Cable';
import { HEADPHONEPOLICY } from '../../../resources/Headphone';
import { MOUSEPOLICY } from '../../../resources/Mouse';
import { KEYBOARDPOLICY } from '../../../resources/Keyboard';

const ProductPolicy = ({ type }) => {
	let data = null;

	switch (type) {
		case 'Laptop': {
			data = LAPTOPPOLICY;
			break;
		}
		case 'Phone': {
			data = PHONEPOLICY;
			break;
		}
		case 'Tablet': {
			data = TABLETPOLICY;
			break;
		}
		case 'Smart Watch': {
			data = SMARTWATCHPOLICY;
			break;
		}
		case 'Charger': {
			data = CHARGERPOLICY;
			break;
		}
		case 'Cable': {
			data = CABLEPOLICY;
			break;
		}
		case 'Headphone': {
			data = HEADPHONEPOLICY;
			break;
		}
		case 'Mouse': {
			data = MOUSEPOLICY;
			break;
		}
		case 'Keyboard': {
			data = KEYBOARDPOLICY;
			break;
		}

		default: {
			data = [];
		}
	}

	return (
		<div className="w-full h-max grid grid-cols-1 gap-x-6 laptop:grid-cols-2 border-solid border-[1px] border-gray-700 px-4 rounded-xl mb-6">
			{data?.map((item, index) => {
				return (
					<div
						className={`flex flex-row gap-4 py-4 border-solid border-t-[1px] border-gray-700 md:border-t-0 ${
							index === 2 && data.length % 2 !== 0
								? 'laptop:col-span-2 border-solid md:border-t-[1px] border-gray-700'
								: ''
						} ${index === 0 ? 'border-t-0' : ''}`}
						key={item.content}
					>
						<div>{item.icon} </div>
						<Typography className="text-base text-text">
							{item.content}
						</Typography>
					</div>
				);
			})}
		</div>
	);
};

export default ProductPolicy;
