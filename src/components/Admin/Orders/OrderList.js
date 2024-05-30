import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import {
	FormatNumber,
	ScrollToTop,
	formatTimestampWithTime,
} from '../../../utils';
import { Pagination } from '../Pagination';
import AdminWideLayout from '../../../layouts/AdminWideLayout';
import { useSelector } from 'react-redux';
import { getData } from '../../../api';
import useSWR from 'swr';
import SWRconfig from '../../../api/SWRconfig';

const perPage = 10;

const OrderList = () => {
	const token = useSelector((state) => state.users.accessToken);

	const ordersFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + token },
		});

	const {
		data: orderList,
		error,
		isLoading,
	} = useSWR('/orders', ordersFetcher, SWRconfig);

	const [data, setData] = useState(orderList);

	const [active, setActive] = useState(1);
	const lengthOfPage = Math.ceil(data?.length / perPage);

	const next = () => {
		if (active === lengthOfPage) return;
		setActive(active + 1);
	};

	const prev = () => {
		if (active === 1) return;
		setActive(active - 1);
	};

	useEffect(() => {
		ScrollToTop();
	}, [active]);

	//filter
	const [searchValue, setSearchValue] = useState({ id: '', mail: '' });
	const handleSubmitSearchByOrderID = (e) => {
		setSearchValue({ ...searchValue, id: e.target.value });
		e.target.blur();
	};
	const handleSubmitSearchByCustomerEmail = (e) => {
		setSearchValue({ ...searchValue, mail: e.target.value });
		e.target.blur();
	};

	useEffect(() => {
		setActive(1);
		setData(
			orderList?.filter(
				(item) =>
					item._id
						.toLowerCase()
						.includes(searchValue.id.toLowerCase()) &&
					item.user.email
						.toLowerCase()
						.includes(searchValue.mail.toLowerCase())
			)
		);
	}, [searchValue, orderList]);

	return (
		<AdminWideLayout>
			<div className="text-main">
				<div className="flex justify-between">
					<Typography className="text-xl font-semibold my-6">
						Orders
					</Typography>
				</div>
				<div className="w-full bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
					{/* {!error && data?.length > 0 && ( */}
					<div className="grid grid-cols-[repeat(3,minmax(0,_1fr))_150px] gap-8 p-4 border-b-[1px] border-solid border-gray-300 px-8">
						<div className="flex flex-col gap-2">
							<Typography className="text-sm font-bold">
								Order ID
							</Typography>
							<input
								type="text"
								placeholder="Order ID"
								spellCheck="false"
								defaultValue={searchValue.id}
								className="h-min font-sans transition-all text-sm font-bold leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
								onKeyDown={(e) =>
									e.keyCode === 13 &&
									handleSubmitSearchByOrderID(e)
								}
								onBlur={(e) => handleSubmitSearchByOrderID(e)}
							></input>
						</div>
						<div className="flex flex-col gap-2">
							<Typography className="text-sm font-bold">
								Customer Email
							</Typography>
							<input
								type="text"
								placeholder="Customer Email"
								spellCheck="false"
								defaultValue={searchValue.mail}
								className="h-min font-sans transition-all text-sm font-bold leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
								onKeyDown={(e) =>
									e.keyCode === 13 &&
									handleSubmitSearchByCustomerEmail(e)
								}
								onBlur={(e) =>
									handleSubmitSearchByCustomerEmail(e)
								}
							></input>
						</div>
						<Typography className="text-sm font-bold">
							Date
						</Typography>
						<Typography className="text-sm font-bold">
							Total
						</Typography>
					</div>
					{/* )} */}

					{isLoading && (
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

					{!error && data && data?.length > 0 ? (
						<>
							{data
								.map((order, index) =>
									index < active * perPage &&
									index >= (active - 1) * perPage ? (
										<div
											key={order._id}
											className="grid grid-cols-[repeat(3,minmax(0,_1fr))_150px] gap-8 p-4 border-b-[1px] border-solid border-gray-300 px-8 content-center"
										>
											<Link
												to={
													'/admin/orders/' +
													order._id.toString()
												}
											>
												<Typography className="text-sm font-semibold hover:underline ">
													#{order._id.toString()}
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
											<Typography className="text-sm">
												{FormatNumber(order.total)} VND
											</Typography>
										</div>
									) : null
								)
								.filter((item) => item !== null)}
							<Pagination
								lengthOfPage={lengthOfPage}
								active={active}
								next={next}
								prev={prev}
							/>
						</>
					) : (
						!isLoading && (
							<Typography className="text-lg font-medium my-2 text-center">
								No orders match.
							</Typography>
						)
					)}
				</div>
			</div>
		</AdminWideLayout>
	);
};

export default OrderList;
