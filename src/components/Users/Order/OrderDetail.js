import React from 'react';
import { Typography } from '@material-tailwind/react';
import {
	// ArrowPathIcon,
	// CheckCircleIcon,
	// ExclamationTriangleIcon,
	MapPinIcon,
	CreditCardIcon,
	ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import { ConvertTimestampToDateOfWith, FormatNumber } from '../../../utils';
import SWRconfig from '../../../api/SWRconfig';
import useSWR from 'swr';
import { getData } from '../../../api';
import { useSelector } from 'react-redux';
import Loading from '../../Loading/Loading';

const OrderDetail = () => {
	const { orderId } = useParams();
	const loggedUser = useSelector((state) => state.users);
	const userFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + loggedUser.accessToken },
		});

	const { data, error, isLoading } = useSWR(
		'/orders/' + orderId,
		userFetcher,
		SWRconfig
	);

	return (
		<div className="w-full bg-transparent rounded-md px-5">
			<div className="w-full flex flex-col md:flex-row justify-between pb-3 gap-2">
				<div className="flex flex-col desktop:flex-row gap-1 items-baseline flex-1">
					{isLoading ? (
						<>
							<Typography
								as="div"
								className="h-6 w-full bg-gray-700 rounded-full mb-2"
							>
								&nbsp;
							</Typography>
							<Typography
								as="div"
								className="h-4 w-full bg-gray-700 rounded-full"
							>
								&nbsp;
							</Typography>
						</>
					) : (
						!error &&
						data && (
							<>
								<Typography className="text-text text-xl">
									Order ID{' '}
									<span className="text-text text-lg md:text-xl font-semibold">
										#{data._id}
										<span className="hidden desktop:inline">
											{' - '}
										</span>
									</span>
								</Typography>
								<Typography className="text-text text-base">
									Order at:{' '}
									{ConvertTimestampToDateOfWith(
										data.createdAt
									)}
								</Typography>
							</>
						)
					)}
				</div>
				{/* {data.status === 'spending' ? (
					<Typography className="text-blue-400 text-base md:text-base font-semibold flex gap-1 items-center">
						<ArrowPathIcon className="w-6 h-6" />
						Spending
					</Typography>
				) : data.status === 'received' ? (
					<Typography className="text-highlight text-base md:text-base font-semibold flex gap-1 items-center">
						<CheckCircleIcon className="w-6 h-6" />
						Received
					</Typography>
				) : (
					<Typography className="text-red-700 text-base md:text-base font-semibold flex gap-1 items-center">
						<ExclamationTriangleIcon className="w-6 h-6" />
						Cancel
					</Typography>
				)} */}
			</div>
			<div className="w-full grid md:grid-cols-6 gap-4 md:gap-6">
				<div className="w-full md:col-span-4 bg-main rounded-md p-4 flex flex-col gap-2">
					{isLoading ? (
						<Loading customStyle={'min-h-44'} />
					) : (
						!error &&
						data && (
							<>
								<Typography className="text-text text-base font-semibold uppercase flex gap-2 items-center">
									<MapPinIcon className="w-6 h-6" />
									Receiving information
								</Typography>

								<Typography className="w-full text-base text-text grid grid-cols-6 desktop:grid-cols-5">
									<span className="col-span-2 desktop:col-span-1">
										Receiver:{' '}
									</span>
									<span className="col-span-4 desktop:col-span-4">
										{data.user.username}
									</span>
								</Typography>
								<Typography className="w-full text-base text-text grid grid-cols-6 desktop:grid-cols-5">
									<span className="col-span-2 desktop:col-span-1">
										Phone number:
									</span>
									<span className="col-span-4 desktop:col-span-4">
										{data.phoneNumber}
									</span>
								</Typography>
								<Typography className="w-full text-base text-text grid grid-cols-6 desktop:grid-cols-5">
									<span className="col-span-2 desktop:col-span-1">
										Address:{' '}
									</span>
									<span className="col-span-4 desktop:col-span-4">
										{data.address}
									</span>
								</Typography>
							</>
						)
					)}
				</div>

				<div className="w-full md:col-span-2">
					<div className="w-full md:col-span-5 bg-main rounded-md p-4 flex flex-col gap-2 h-full">
						{isLoading ? (
							<Loading customStyle={'min-h-44'} />
						) : (
							!error &&
							data && (
								<>
									<Typography className="text-text text-base font-semibold uppercase flex gap-2 items-center">
										<CreditCardIcon className="w-6 h-6" />
										Payment method
									</Typography>
									{data?.paymentMethod ? (
										<Typography className="w-full text-base text-text">
											{data.paymentMethod}
										</Typography>
									) : (
										<Typography className="w-full text-base text-text">
											Payment on delivery
										</Typography>
									)}
								</>
							)
						)}
					</div>
				</div>
			</div>

			<div className="w-full bg-main rounded-md mt-4 md:mt-6 p-4">
				{isLoading ? (
					<Loading customStyle={'min-h-44'} />
				) : (
					!error &&
					data && (
						<>
							<Typography className="text-text text-base font-semibold uppercase flex gap-2 items-center mb-2">
								<ShoppingBagIcon className="w-6 h-6" />
								Products information
							</Typography>
							<div className="w-full flex gap-4 flex-col">
								{data.orderItems.map((item) => (
									<div
										key={item._id}
										className="flex gap-4 border-solid border-b-[1px] border-gray-700 py-3 "
									>
										<img
											src={item.product.image.imageUrl}
											className="w-20 h-20 object-cover"
											alt={item.product.image.imageName}
										/>
										<div className="flex justify-between flex-1 gap-4">
											<Typography className="inline-block text-text text-base">
												<span className="block font-medium mb-2">
													{`${item.product.name} (
								${item.product?.ram ? item.product.ram + ',' : ''}  
								${item.product?.rom ? item.product.rom + ',' : ''} 
								${item.product?.hardDrive ? item.product.hardDrive + ',' : ''}
								${item.product.color})`}{' '}
												</span>
												<span className="block text-sm">
													Quantity: {item.quantity}
												</span>
											</Typography>
											<Typography className="inline-block text-text text-base text-right">
												<span className="block font-medium mb-1">
													{FormatNumber(
														(item.product.price *
															item.quantity *
															(100 -
																item.product
																	.discount
																	.discountPercentage)) /
															100
													)}{' '}
													VND
												</span>
												{item.product.discount
													.discountPercentage !==
													0 && (
													<span className="block text-sm line-through ">
														{FormatNumber(
															item.product.price *
																item.quantity
														)}{' '}
														VND
													</span>
												)}
											</Typography>
										</div>
									</div>
								))}

								<Typography className="text-text text-base text-right mt-4 md:mt-0">
									Total:{' '}
									<span className="font-semibold text-base md:text-lg">
										{FormatNumber(data.total) + ' '}{' '}
										<span className="text-base">VND</span>
									</span>
								</Typography>
							</div>
						</>
					)
				)}
			</div>

			<div className="w-full text-center md:text-right mt-4">
				<Link
					to="/user/order"
					className="bg-transparent inline-block md:py-2 px-4 border-solid rounded md:border-[1px] border-highlight text-highlight hover:bg-highlight hover:text-background delay-100 "
				>
					<Typography className="font-medium text-base normal-case">
						Back to order list
					</Typography>
				</Link>
			</div>
		</div>
	);
};

export default OrderDetail;
