import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { getData } from '../../../api';
import useSWR from 'swr';
import SWRconfig from '../../../api/SWRconfig';
import { FormatNumber } from '../../../utils';
import Loading from '../../Loading/Loading';

const getCatePath = (product) => {
	if (product?.laptop) return 'laptops';
	if (product?.smartPhone) return 'smartPhones';
	if (product?.tablet) return 'tablets';
	if (product?.smartWatch) return 'smartwatches';
	if (product?.charger) return 'chargers';
	if (product?.cable) return 'cables';
	if (product?.headphone) return 'headphones';
	if (product?.mouse) return 'mouses';
	if (product?.keyboard) return 'keyboards';
	return '';
};

const getCateAttr = (product) => {
	if (product?.laptop) return 'laptop';
	if (product?.smartPhone) return 'smartPhone';
	if (product?.tablet) return 'tablet';
	if (product?.smartWatch) return 'smartWatch';
	if (product?.charger) return 'charger';
	if (product?.cable) return 'cable';
	if (product?.headphone) return 'headphone';
	if (product?.mouse) return 'mouse';
	if (product?.keyboard) return 'keyboard';
	return '';
};

const OrderDetail = () => {
	const { orderId } = useParams();

	const token = useSelector((state) => state.users.accessToken);

	const userFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + token },
		});

	const { data, error, isLoading } = useSWR(
		'/orders/' + orderId,
		userFetcher,
		SWRconfig
	);

	const navigate = useNavigate();

	return (
		<AdminLayout>
			<div className="text-main">
				{/* title  */}
				<div className="flex gap-4 items-center">
					<IconButton
						size="sm"
						variant="outlined"
						className="border-main text-main focus:ring-transparent rounded-sm"
						onClick={() => navigate(-1)}
					>
						<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
					</IconButton>

					<Typography className="text-xl font-semibold my-4">
						Order <span className="text-admin">#{orderId}</span>
					</Typography>

					{/* {orderData.status === 'completed' ? (
						<Typography className="text-xs rounded-full bg-green-600 text-white w-min px-2 py-1">
							Completed
						</Typography>
					) : orderData.status === 'pending' ? (
						<Typography className="text-xs rounded-full bg-gray-400 text-white w-min px-2 py-1">
							Pending
						</Typography>
					) : orderData.status === 'processing' ? (
						<Typography className="text-xs rounded-full bg-gray-400 text-white w-min px-2 py-1">
							Processing
						</Typography>
					) : (
						<Typography className="text-xs rounded-full bg-red-600 text-white w-min px-2 py-1">
							Cancelled
						</Typography>
					)} */}
				</div>
				<div className="w-full grid grid-cols-5 gap-4">
					{/* Order  */}
					<div className="w-full h-min col-span-3 bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
						{isLoading ? (
							<Loading />
						) : (
							<>
								<Typography className="p-4 pb-0 text-base font-semibold">
									Products
								</Typography>
								{!error &&
									data?.orderItems.map((item) => (
										<div
											className="flex gap-4 p-4 items-center"
											key={item._id}
										>
											<img
												src={
													item.product.image.imageUrl
												}
												alt="product"
												className="w-20 h-20 object-cover"
											/>
											<div className="flex flex-col gap-2 flex-1">
												<Link
													to={
														'/admin/products/' +
														getCatePath(
															item.product
														) +
														'/' +
														item.product[
															getCateAttr(
																item.product
															)
														]
													}
												>
													<Typography className="text-sm font-semibold">
														{item.product.name}
													</Typography>
													<Typography className="text-sm font-normal">
														(
														{item.product?.ram
															? item.product.ram +
															  ' - '
															: ''}
														{item.product?.hardDrive
															? item.product
																	.hardDrive +
															  ' - '
															: ''}{' '}
														{item.product?.rom
															? item.product.rom +
															  ' - '
															: ''}{' '}
														{item.product?.color})
													</Typography>
												</Link>
												<Typography className="text-sm font-medium">
													{FormatNumber(
														item.product.price
													)}{' '}
													x {item.quantity}
												</Typography>
											</div>
											<Typography className="text-sm font-medium w-max text-right">
												{FormatNumber(
													item.product.price *
														item.quantity
												)}{' '}
												VND
											</Typography>
										</div>
									))}
								{!error && data?.total && (
									<Typography className="p-4 text-base font-semibold text-right border-t-[1px] border-solid border-gray-300">
										Total:{' '}
										<span className="text-admin">
											{FormatNumber(data?.total)} VND
										</span>
									</Typography>
								)}
							</>
						)}
					</div>
					{/* information  */}
					<div className="w-full h-min col-span-2 bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
						{isLoading ? (
							<Loading />
						) : (
							<>
								<Typography className="p-4 text-base font-semibold">
									Customer
								</Typography>
								{!error && data?.user && (
									<div className="flex flex-col gap-4 p-4 pt-0 ">
										<div className="grid grid-cols-[70px_1fr] gap-4">
											<Typography className="text-sm font-medium">
												Name:
											</Typography>
											<Typography className="text-sm font-medium">
												{data.user.username}
											</Typography>
										</div>
										<div className="grid grid-cols-[70px_1fr] gap-4">
											<Typography className="text-sm font-medium">
												Email:
											</Typography>
											<Link
												to={
													'/admin/customers/' +
													data.user._id
												}
											>
												<Typography className="text-sm text-blue-700 font-medium">
													{data.user.email}
												</Typography>
											</Link>
										</div>
										<div className="grid grid-cols-[70px_1fr] gap-4">
											<Typography className="text-sm font-medium">
												Phone:
											</Typography>
											<Typography className="text-sm font-medium">
												{data.phoneNumber}
											</Typography>
										</div>
										<div className="grid grid-cols-[70px_1fr] gap-4">
											<Typography className="text-sm font-medium">
												Address:
											</Typography>
											<Typography className="text-sm font-medium">
												{data.address}
											</Typography>
										</div>
									</div>
								)}
								<Typography className="p-4 text-base font-semibold border-t-[1px] border-solid border-gray-300">
									Payment
								</Typography>
								{!error && (
									<div className="flex flex-col gap-4 p-4 pt-0 ">
										<div className="grid grid-cols-[70px_1fr] gap-4">
											<Typography className="text-sm font-medium">
												Method:
											</Typography>
											<Typography className="text-sm font-medium">
												{data?.paymentMethod || 'COD'}
											</Typography>
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default OrderDetail;
