import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Typography } from '@material-tailwind/react';
import { FormatNumber, formatTimestampWithTime } from '../../utils';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getData } from '../../api';
import SWRconfig from '../../api/SWRconfig';
import useSWR from 'swr';
import AdminWideLayout from '../../layouts/AdminWideLayout';
import Loading from '../Loading/Loading';

const labelFormatter = (value) => {
	let val = Math.abs(value);
	if (val >= 1000000) {
		val = (val / 1000000).toFixed(1) + ' M';
	}
	return val;
};

const saleQuantityChartConfig = {
	type: 'pie',
	width: 260,
	height: 260,
	series: [10, 10, 10, 10, 10, 10, 10, 10, 10],
	options: {
		labels: [
			'Laptop',
			'Phone',
			'Tablet',
			'Smartwatch',
			'Cable',
			'Charger',
			'Headphone',
			'Mouse',
			'Keyboard',
		],
		chart: {
			toolbar: {
				show: false,
			},
		},
		title: {
			show: '',
		},
		dataLabels: {
			enabled: true,
		},
		colors: [
			'#86efac',
			'#a5f3fc',
			'#bfdbfe',
			'#fca5a5',
			'#fde68a',
			'#e9d5ff',
			'#fecdd3',
			'#d9f99d',
			'#d6d3d1',
		],
		legend: {
			show: false,
		},
		plotOptions: {
			pie: {
				expandOnClick: false,
			},
		},
	},
};

const saleStatisticChartConfig = {
	type: 'line',
	height: 360,
	width: 760,
	series: [
		{
			name: 'revenue',
			type: 'area',
			data: [],
		},
		{
			name: 'quantity',
			type: 'line',
			data: [],
		},
	],
	options: {
		chart: {
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false,
			},
		},
		title: {
			show: '',
		},
		dataLabels: {
			enabled: false,
		},
		fill: {
			type: 'solid',
			// opacity: [0.35, 1],
		},
		colors: ['#86efac', '#fca5a5'],
		stroke: {
			lineCap: 'round',
			curve: 'smooth',
		},
		markers: {
			size: 0,
		},
		xaxis: {
			axisTicks: {
				show: false,
			},
			axisBorder: {
				show: false,
			},
			labels: {
				style: {
					colors: '#616161',
					fontSize: '12px',
					fontFamily: 'inherit',
					fontWeight: 400,
				},
			},
			categories: [],
		},
		yaxis: [
			{
				labels: {
					style: {
						colors: '#616161',
						fontSize: '12px',
						fontFamily: 'inherit',
						fontWeight: 400,
					},
					formatter: labelFormatter,
				},
			},
			{
				opposite: true,
				labels: {
					style: {
						colors: '#616161',
						fontSize: '12px',
						fontFamily: 'inherit',
						fontWeight: 400,
					},
				},
			},
		],
		grid: {
			show: true,
			borderColor: '#dddddd',
			strokeDashArray: 5,
			xaxis: {
				lines: {
					show: true,
				},
			},
			padding: {
				top: 5,
				right: 20,
			},
		},
	},
};

const Dashboard = () => {
	const token = useSelector((state) => state.users.accessToken);

	const statisticFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + token },
		});

	//quantity data
	const {
		data: statisticsData,
		error: statisticsError,
		isLoading: statisticsLoading,
	} = useSWR('orders/statistics', statisticFetcher, SWRconfig);

	const [chartData, setChartData] = useState(null);
	useEffect(() => {
		if (statisticsData)
			setChartData({
				...saleQuantityChartConfig,
				series: [
					statisticsData.products.laptop.quantity,
					statisticsData.products.smartPhone.quantity,
					statisticsData.products.tablet.quantity,
					statisticsData.products.smartWatch.quantity,
					statisticsData.products.cable.quantity,
					statisticsData.products.charger.quantity,
					statisticsData.products.headphone.quantity,
					statisticsData.products.mouse.quantity,
				],
			});
	}, [statisticsData]);

	//latest orders data
	const {
		data: latestOrderList,
		error: latestOrderError,
		isLoading: latestOrderLoading,
	} = useSWR('/orders', statisticFetcher, SWRconfig);

	//sale data
	const {
		data: saleData,
		error: saleDataError,
		isLoading: saleDataLoading,
	} = useSWR('/orders/statistics/chart', statisticFetcher, SWRconfig);

	const [saleChartData, setSaleChartData] = useState(null);

	useEffect(() => {
		if (saleData)
			setSaleChartData({
				...saleStatisticChartConfig,
				series: [
					{
						name: 'Revenue',
						type: 'area',
						data: saleData.map((item) => item.revenue),
					},
					{
						name: 'Quantity',
						type: 'line',
						data: saleData.map((item) => item.quantity),
					},
				],
				options: {
					...saleStatisticChartConfig.options,
					xaxis: {
						axisTicks: {
							show: false,
						},
						axisBorder: {
							show: false,
						},
						labels: {
							style: {
								colors: '#616161',
								fontSize: '12px',
								fontFamily: 'inherit',
								fontWeight: 400,
							},
						},
						categories: saleData.map((item) => item.month),
					},
				},
			});
	}, [saleData]);

	return (
		<AdminWideLayout>
			<div className="text-main">
				<div className="flex justify-between">
					<Typography className="text-xl font-semibold my-6">
						Dashboard
					</Typography>
				</div>
				<div className="grid grid-cols-3 gap-4">
					<div className="col-span-2 flex flex-col gap-4">
						{/* sale information  */}
						<div className="w-full h-min bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
							{statisticsLoading ? (
								<Loading customStyle={'!min-h-32'} />
							) : (
								!statisticsError &&
								statisticsData && (
									<>
										<Typography className="p-5 text-base font-semibold">
											Lifetime Sales
										</Typography>
										<div className="flex flex-col gap-2 p-5 pt-0">
											<div className="flex gap-4 items-center">
												<Typography className="text-sm font-medium">
													Number of orders:{' '}
													<span className="text-admin font-semibold">
														{
															statisticsData.numberOfOrder
														}
													</span>
												</Typography>
											</div>
											<div className="flex gap-4 items-center">
												<Typography className="text-sm font-medium">
													Lifetime Revenue:{' '}
													<span className="text-admin font-semibold">
														{FormatNumber(
															statisticsData
																.products
																.revenue
														)}{' '}
														VND
													</span>
												</Typography>
											</div>
										</div>
									</>
								)
							)}
						</div>

						{/* sale data chart  */}
						<div className="w-full h-min bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
							{saleDataLoading ? (
								<Loading customStyle={'!min-h-96'} />
							) : (
								!saleDataError &&
								saleData &&
								saleChartData && (
									<>
										<Typography className="p-5 pb-0 text-base font-semibold">
											Sale Statistics
										</Typography>

										<div className="w-full flex justify-center items-center">
											<Chart {...saleChartData} />
										</div>
									</>
								)
							)}
						</div>

						{/* latest orders  */}
						<div className="w-full h-min bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
							{latestOrderLoading && (
								<>
									<div className="animate-pulse grid grid-cols-[repeat(3,minmax(0,_1fr))_100px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
										<Typography
											as="div"
											variant="h1"
											className="mb-4 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
									</div>
									<div className="animate-pulse grid grid-cols-[repeat(3,minmax(0,_1fr))_100px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
										<Typography
											as="div"
											variant="h1"
											className="mb-4 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
									</div>
									<div className="animate-pulse grid grid-cols-[repeat(3,minmax(0,_1fr))_100px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
										<Typography
											as="div"
											variant="h1"
											className="mb-4 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
									</div>
									<div className="animate-pulse grid grid-cols-[repeat(3,minmax(0,_1fr))_100px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
										<Typography
											as="div"
											variant="h1"
											className="mb-4 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
									</div>
									<div className="animate-pulse grid grid-cols-[repeat(3,minmax(0,_1fr))_100px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
										<Typography
											as="div"
											variant="h1"
											className="mb-4 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
										<Typography
											as="div"
											variant="paragraph"
											className="mb-2 h-3 rounded-full bg-gray-300"
										>
											&nbsp;
										</Typography>
									</div>
								</>
							)}

							{!latestOrderError &&
							latestOrderList &&
							latestOrderList?.length > 0 ? (
								<>
									<div className="flex justify-between items-center">
										<Typography className="p-5 text-base font-semibold">
											Latest Orders
										</Typography>
										<Link to="/admin/orders">
											<Typography className="hover:underline mx-5 text-blue-600 text-sm font-medium">
												All orders
											</Typography>
										</Link>
									</div>
									{latestOrderList
										.map((order, index) =>
											index < 10 ? (
												<div
													key={order._id}
													className="grid grid-cols-[repeat(3,minmax(0,_1fr))_120px] gap-8 p-4 border-b-[1px] border-solid border-gray-300 content-center"
												>
													<Link
														to={
															'/admin/orders/' +
															order._id.toString()
														}
													>
														<Typography className="text-sm font-semibold hover:underline ">
															#
															{order._id
																.toString()
																.slice(10)}
														</Typography>
													</Link>
													<Link
														to={
															'/admin/customers/' +
															order.user._id.toString()
														}
													>
														<Typography className="text-sm font-semibold hover:underline text-blue-900">
															{order.user.email}
														</Typography>
													</Link>
													<Typography className="text-sm">
														{formatTimestampWithTime(
															order.createdAt
														)}
													</Typography>
													<Typography className="text-sm text-right">
														{FormatNumber(
															order.total
														)}{' '}
														VND
													</Typography>
												</div>
											) : null
										)
										.filter((item) => item !== null)}
								</>
							) : (
								!latestOrderLoading && (
									<Typography className="text-lg font-medium my-2 text-center">
										No orders yet.
									</Typography>
								)
							)}
						</div>
					</div>
					<div className="col-span-1 flex flex-col gap-4">
						{/* order status & chart  */}
						<div className="w-full h-min flex h- flex-col content-center bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
							{statisticsLoading ? (
								<Loading customStyle={'min-h-96'} />
							) : (
								!statisticsError &&
								statisticsData &&
								statisticsData.products && (
									<>
										<div className="flex flex-col p-5 gap-2 border-b-[1px] border-solid border-gray-300">
											<Typography className="text-base font-semibold pb-2">
												Sold Quantity
											</Typography>
											<div className="grid grid-cols-2 gap-2">
												<div className="flex gap-2 items-center ">
													<span className="w-3 h-3 rounded-full bg-green-300"></span>{' '}
													<Typography className="text-sm font-normal">
														{
															statisticsData
																.products.laptop
																.quantity
														}{' '}
														laptops
													</Typography>
												</div>
												<div className="flex gap-2 items-center">
													<span className="w-3 h-3 rounded-full bg-cyan-200"></span>{' '}
													<Typography className="text-sm font-normal">
														{
															statisticsData
																.products
																.smartPhone
																.quantity
														}{' '}
														phones
													</Typography>
												</div>
												<div className="flex gap-2 items-center ">
													<span className="w-3 h-3 rounded-full bg-blue-200"></span>{' '}
													<Typography className="text-sm font-normal">
														{
															statisticsData
																.products.tablet
																.quantity
														}{' '}
														tables
													</Typography>
												</div>
												<div className="flex gap-2 items-center">
													<span className="w-3 h-3 rounded-full bg-red-300"></span>{' '}
													<Typography className="text-sm font-normal">
														{
															statisticsData
																.products
																.smartWatch
																.quantity
														}{' '}
														smartwatches
													</Typography>
												</div>
												<div className="flex gap-2 items-center ">
													<span className="w-3 h-3 rounded-full bg-amber-200"></span>{' '}
													<Typography className="text-sm font-normal">
														{
															statisticsData
																.products.cable
																.quantity
														}{' '}
														cables
													</Typography>
												</div>
												<div className="flex gap-2 items-center">
													<span className="w-3 h-3 rounded-full bg-purple-200"></span>{' '}
													<Typography className="text-sm font-normal">
														{
															statisticsData
																.products
																.charger
																.quantity
														}{' '}
														chargers
													</Typography>
												</div>
												<div className="flex gap-2 items-center ">
													<span className="w-3 h-3 rounded-full bg-rose"></span>{' '}
													<Typography className="text-sm font-normal">
														{
															statisticsData
																.products
																.headphone
																.quantity
														}{' '}
														headphones
													</Typography>
												</div>
												<div className="flex gap-2 items-center">
													<span className="w-3 h-3 rounded-full bg-lime-200"></span>{' '}
													<Typography className="text-sm font-normal">
														{
															statisticsData
																.products.mouse
																.quantity
														}{' '}
														mouses
													</Typography>
												</div>
												<div className="flex gap-2 items-center ">
													<span className="w-3 h-3 rounded-full bg-stone"></span>{' '}
													<Typography className="text-sm font-normal">
														{
															statisticsData
																.products
																.keyboard
																.quantity
														}{' '}
														keyboards
													</Typography>
												</div>
											</div>
										</div>
										{chartData && (
											<div className="w-full flex py-4 justify-center items-center">
												<Chart {...chartData} />
											</div>
										)}
									</>
								)
							)}
						</div>
						{/* products  */}
						<div className="w-full h-min flex flex-col content-center bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
							{statisticsLoading ? (
								<Loading customStyle={'!min-h-32'} />
							) : (
								!statisticsError &&
								statisticsData &&
								statisticsData.numberOfProduct && (
									<div className="flex flex-col p-5 gap-2 border-b-[1px] border-solid border-gray-300">
										<div className="flex justify-between ">
											<Typography className="pb-2 text-base font-semibold">
												Products
											</Typography>
											<Link to="/admin/products/laptops">
												<Typography className="hover:underline text-blue-600 text-sm font-medium">
													All products
												</Typography>
											</Link>
										</div>
										<div className="flex gap-4 items-center">
											<Typography className="text-sm font-medium">
												Number of products:{' '}
												<span className="text-admin font-semibold">
													{
														statisticsData.numberOfProduct
													}
												</span>
											</Typography>
										</div>
									</div>
								)
							)}
						</div>
						{/* customers  */}
						<div className="w-full h-min flex flex-col content-center bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
							{statisticsLoading ? (
								<Loading customStyle={'min-h-96'} />
							) : (
								!statisticsError &&
								statisticsData &&
								statisticsData.user && (
									<div className="flex flex-col p-5 gap-2 border-b-[1px] border-solid border-gray-300">
										<div className="flex justify-between ">
											<Typography className="pb-2 text-base font-semibold">
												Customers
											</Typography>
											<Link to="/admin/customers">
												<Typography className="hover:underline text-blue-600 text-sm font-medium">
													All customers
												</Typography>
											</Link>
										</div>

										<div className="flex gap-4 items-center">
											<Typography className="text-sm font-medium">
												Number of customers:{' '}
												<span className="text-admin font-semibold">
													{
														statisticsData.user
															?.numberOfUser
													}
												</span>
											</Typography>
										</div>
										<div className="flex gap-4 items-center">
											<Typography className="text-sm font-medium">
												Enabled customers:{' '}
												<span className="text-admin font-semibold">
													{
														statisticsData.user
															?.numberOfEnableUser
													}
												</span>
											</Typography>
										</div>
										<div className="flex gap-4 items-center">
											<Typography className="text-sm font-medium">
												Disabled customers:{' '}
												<span className="text-admin font-semibold">
													{
														statisticsData.user
															?.numberOfDisableUser
													}
												</span>
											</Typography>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</AdminWideLayout>
	);
};

export default Dashboard;
