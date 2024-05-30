import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import AdminWideLayout from '../../../layouts/AdminWideLayout';
import { useSelector } from 'react-redux';
import { getData } from '../../../api';
import useSWR from 'swr';
import SWRconfig from '../../../api/SWRconfig';
import { FormatNumber, formatTimestampWithTime } from '../../../utils';
import Loading from '../../Loading/Loading';

const CustomerDetail = () => {
	const { customerId } = useParams();
	const navigate = useNavigate();

	const token = useSelector((state) => state.users.accessToken);

	const userFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + token },
		});

	const { data, error, isLoading } = useSWR(
		'/users/' + customerId,
		userFetcher,
		SWRconfig
	);

	const {
		data: orderList,
		error: orderListError,
		isLoading: orderListLoading,
	} = useSWR('/orders?userId=' + customerId, userFetcher, SWRconfig);

	return (
		<AdminWideLayout>
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
						Customer:{' '}
						{!error && data && (
							<span className="text-admin">
								{data?.username || 'Anonymous'}
							</span>
						)}
					</Typography>
				</div>
				<div className="w-full grid grid-cols-5 gap-4">
					{/* Order history  */}

					<div className="w-full h-min col-span-3 bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
						{orderListLoading ? (
							<Loading />
						) : !orderListError &&
						  orderList &&
						  orderList?.length > 0 ? (
							<>
								<Typography className="p-4 text-base font-semibold">
									Orders History
								</Typography>
								{orderList.map((order) => (
									<div
										key={order._id}
										className="grid grid-cols-[repeat(2,minmax(0,_1fr))_130px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 content-center"
									>
										<Link
											to={
												'/admin/orders/' +
												order._id.toString()
											}
										>
											<Typography className="text-sm font-semibold text-blue-700 hover:underline ">
												#{order._id}
											</Typography>
										</Link>
										<Typography className="text-sm font-medium">
											{formatTimestampWithTime(
												order.createdAt
											)}
										</Typography>
										{/* {order.status === 'completed' ? (
											<Typography className="text-xs h-min rounded-full bg-green-600 text-white w-min px-2 py-1">
												Completed
											</Typography>
										) : order.status === 'pending' ? (
											<Typography className="text-xs h-min rounded-full bg-gray-400 text-white w-min px-2 py-1">
												Pending
											</Typography>
										) : order.status === 'processing' ? (
											<Typography className="text-xs h-min rounded-full bg-gray-400 text-white w-min px-2 py-1">
												Processing
											</Typography>
										) : (
											<Typography className="text-xs h-min rounded-full bg-red-600 text-white w-min px-2 py-1">
												Cancelled
											</Typography>
										)} */}
										<Typography className="text-sm font-medium text-right">
											{FormatNumber(order.total)} VND
										</Typography>
									</div>
								))}
							</>
						) : (
							<Typography className="text-lg font-medium m-2">
								No orders yet.
							</Typography>
						)}
					</div>

					{/* information  */}

					<div className="w-full h-min col-span-2 bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
						{isLoading ? (
							<Loading />
						) : (
							!error &&
							data && (
								<>
									<Typography className="p-4 text-base font-semibold">
										Customer
									</Typography>
									<div className="flex flex-col gap-4 p-4 pt-0 ">
										<div className="grid grid-cols-[90px_1fr] gap-4">
											<Typography className="text-sm font-medium">
												Name:
											</Typography>
											<Typography className="text-sm font-medium">
												{data?.username}
											</Typography>
										</div>
										<div className="grid grid-cols-[90px_1fr] gap-4">
											<Typography className="text-sm font-medium">
												Email:
											</Typography>
											<Typography className="text-sm font-medium">
												{data?.email}
											</Typography>
										</div>
										<div className="grid grid-cols-[90px_1fr] gap-4">
											<Typography className="text-sm font-medium">
												Created At:
											</Typography>
											<Typography className="text-sm font-medium">
												{formatTimestampWithTime(
													data?.createdAt
												)}
											</Typography>
										</div>
										<div className="grid grid-cols-[90px_1fr] gap-4">
											<Typography className="text-sm font-medium">
												Status:
											</Typography>
											{data?.status ? (
												<Typography className="text-sm font-medium text-green-600">
													Active
												</Typography>
											) : (
												<Typography className="text-sm font-medium text-red-700">
													Disable
												</Typography>
											)}
										</div>
										{/* <div className="grid grid-cols-[90px_1fr] gap-4">
								<Typography className="text-sm font-medium">
									Phone:
								</Typography>
								<Typography className="text-sm font-medium">
									{customer.phone}
								</Typography>
							</div>
							<div className="grid grid-cols-[70px_1fr] gap-4">
								<Typography className="text-sm font-medium">
									Gender:
								</Typography>
								{customer.gender === 'male' ? (
									<Typography className="text-sm font-medium">
										Male
									</Typography>
								) : (
									<Typography className="text-sm font-medium">
										Female
									</Typography>
								)}
							</div> */}
									</div>

									<Typography className="p-4 text-base font-semibold border-t-[1px] border-solid border-gray-300">
										Address List
									</Typography>
									<div className="flex flex-col gap-4 p-4 pt-0 ">
										{data?.address &&
										data?.address.length > 0 ? (
											data.address.map((item, index) => (
												<div
													key={item.address}
													className="flex flex-col gap-2"
												>
													<Typography className="text-sm font-medium">
														{item.address}
													</Typography>
													{item.defaultAddress && (
														<Typography className="w-min text-xs font-medium rounded-full bg-admin text-white py-1 px-2">
															Default
														</Typography>
													)}
												</div>
											))
										) : (
											<Typography className="text-sm font-medium">
												No address saved.
											</Typography>
										)}
									</div>
								</>
							)
						)}
					</div>
				</div>
			</div>
		</AdminWideLayout>
	);
};

export default CustomerDetail;
