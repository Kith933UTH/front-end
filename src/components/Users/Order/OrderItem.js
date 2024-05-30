import React from 'react';
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { FormatNumber } from '../../../utils';
// import {
// 	ArrowPathIcon,
// 	CheckCircleIcon,
// 	ExclamationTriangleIcon,
// } from '@heroicons/react/24/outline';

const OrderItem = ({ data }) => {
	const productLen = data.orderItems.length;
	return (
		<div className="w-full bg-main rounded-md py-4 px-5">
			<div className="w-full flex justify-between pb-3 border-solid border-b-[1px] border-gray-700">
				<div className="flex gap-1 items-baseline">
					<Typography className="text-text text-sm">
						Order:
					</Typography>
					<Typography className="text-text text-sm md:text-base font-semibold">
						#{data._id}
					</Typography>
				</div>
				{/* {data.status === 'spending' ? (
					<Typography className="text-blue-400 text-sm md:text-base font-semibold flex gap-1 items-center">
						<ArrowPathIcon className="w-4 h-4" />
						Spending
					</Typography>
				) : data.status === 'received' ? (
					<Typography className="text-highlight text-sm md:text-base font-semibold flex gap-1 items-center">
						<CheckCircleIcon className="w-4 h-4" />
						Received
					</Typography>
				) : (
					<Typography className="text-red-700 text-sm md:text-base font-semibold flex gap-1 items-center">
						<ExclamationTriangleIcon className="w-4 h-4" />
						Cancel
					</Typography>
				)} */}
			</div>
			<div className="w-full flex gap-4 flex-col md:flex-row justify-between py-3 border-solid border-b-[1px] border-gray-700">
				<div className="flex gap-4">
					<img
						src={data.orderItems[0].product.image.imageUrl}
						className="w-20 h-20 object-cover"
						alt="product"
					/>
					<Link to={data._id}>
						<Typography className="text-text text-base">
							{`${data.orderItems[0].product.name} (
								${data.orderItems[0].product?.ram ? data.orderItems[0].product.ram + ',' : ''}  
								${data.orderItems[0].product?.rom ? data.orderItems[0].product.rom + ',' : ''} 
								${
									data.orderItems[0].product?.hardDrive
										? data.orderItems[0].product.hardDrive +
										  ','
										: ''
								}
								${data.orderItems[0].product.color})`}{' '}
							{productLen > 1 ? (
								<span className="block">
									and{' '}
									<span className="font-semibold">
										{productLen - 1} other product
									</span>
								</span>
							) : (
								''
							)}
						</Typography>
					</Link>
				</div>
				<Typography className="text-text text-base text-right mt-4 md:mt-0">
					Total:{' '}
					<span className="font-semibold text-base md:text-lg">
						{FormatNumber(data.total) + ' '}{' '}
						<span className="text-base">VND</span>
					</span>
				</Typography>
			</div>
			<div className="w-full text-center md:text-right mt-2">
				<Link
					to={data._id}
					className="bg-transparent inline-block md:py-2 px-4 border-solid rounded md:border-[1px] border-highlight text-highlight hover:bg-highlight hover:text-background delay-100 "
				>
					<Typography className="font-medium text-base md:text-sm normal-case">
						View detail
					</Typography>
				</Link>
			</div>
		</div>
	);
};

export default OrderItem;
