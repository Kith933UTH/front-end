import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Checkbox,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Typography,
} from '@material-tailwind/react';
import {
	ScrollToTop,
	capitalizeFirstLetter,
	formatTimestamp,
} from '../../../utils';
import { Pagination } from '../Pagination';
import AdminWideLayout from '../../../layouts/AdminWideLayout';
import useSWR from 'swr';
import { getData, updateData } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import SWRconfig from '../../../api/SWRconfig';
import notificationSlice from '../../Notification/NotificationSlice';

const perPage = 10;

const CustomerList = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.users.accessToken);

	const userFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + token },
		});

	const {
		data: userList,

		error,
		isLoading,
		mutate,
	} = useSWR('/users', userFetcher, SWRconfig);
	const [data, setData] = useState(userList);

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
	const [searchValue, setSearchValue] = useState({ name: '', mail: '' });
	const handleSubmitSearchByCustomerName = (e) => {
		setSearchValue({ ...searchValue, name: e.target.value });
		e.target.blur();
	};
	const handleSubmitSearchByCustomerEmail = (e) => {
		setSearchValue({ ...searchValue, mail: e.target.value });
		e.target.blur();
	};

	useEffect(() => {
		setActive(1);
		setData(
			userList
				?.filter(
					(item) =>
						item.username
							.toLowerCase()
							.includes(searchValue.name.toLowerCase()) &&
						item.email
							.toLowerCase()
							.includes(searchValue.mail.toLowerCase())
				)
				?.map((item) => {
					return { ...item, isChoose: false };
				})
		);
	}, [searchValue, userList]);

	//choose list
	const [isChooseAll, setIsChooseAll] = useState(false);
	const [chooseQuantity, setChooseQuantity] = useState(0);

	useEffect(() => {
		const length = data?.filter((item) => item.isChoose).length;
		if (length === 0) setIsChooseAll(false);
		setChooseQuantity(length);
	}, [data]);

	useEffect(() => {
		setData((d) =>
			d?.map((item) => {
				return { ...item, isChoose: isChooseAll };
			})
		);
	}, [isChooseAll]);

	const handleChooseCustomer = (value) => {
		setData((d) =>
			d.map((item) => {
				return {
					...item,
					isChoose:
						value === item._id ? !item.isChoose : item.isChoose,
				};
			})
		);
	};

	//confirm dialog
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
	const toggleConfirmDialog = () => setOpenConfirmDialog(!openConfirmDialog);

	const handleOpenDeleteDialog = () => {
		toggleConfirmDialog();
	};

	const [actionType, setActionType] = useState('');
	//handle enable
	const handleEditCustomerStatus = () => {
		toggleConfirmDialog();
		// Tạo mảng các promise
		const promises = data
			.filter((item) => item.isChoose)
			.map((user) => {
				return new Promise((resolve, reject) => {
					updateData(
						'users/' + user._id,
						{
							username: user.username,
							email: user.email,
							phoneNumber: user.phoneNumber,
							address: user.address,
							status: actionType !== 'disable',
						},
						{
							headers: {
								Authorization: 'Bearer ' + token,
							},
						}
					)
						.then(resolve)
						.catch(reject);
				});
			});

		// // Chờ tất cả các promise hoàn thành
		Promise.all(promises)
			.then((results) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Updated success',
					})
				);
				setIsChooseAll(false);
				mutate();
			})
			.catch((error) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: error?.response.data.message || 'Error',
					})
				);
			});
	};

	return (
		<AdminWideLayout>
			<div className="text-main">
				<div className="flex justify-between">
					<Typography className="text-xl font-semibold my-6">
						Customers
					</Typography>
				</div>
				<div className="w-full bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
					{/* Header  */}
					{/* {!error && data?.length > 0 && ( */}
					<div className="p-4 pb-2 border-b-[1px] border-solid border-gray-300 pr-8">
						{/* <Typography className="text-sm font-bold">#</Typography> */}
						<div className="grid grid-cols-[50px_repeat(2,minmax(0,_1fr))_100px_100px] gap-4">
							<div className="mt-7">
								<Checkbox
									color="teal"
									className="h-5 w-5"
									checked={isChooseAll}
									onChange={() =>
										setIsChooseAll(!isChooseAll)
									}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Typography className="text-sm font-bold">
									Full Name
								</Typography>
								<input
									type="text"
									placeholder="Full name"
									spellCheck="false"
									className="h-min w-[70%] font-sans transition-all text-sm font-bold leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-800 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
									onKeyDown={(e) =>
										e.keyCode === 13 &&
										handleSubmitSearchByCustomerName(e)
									}
									onBlur={(e) =>
										handleSubmitSearchByCustomerName(e)
									}
								></input>
							</div>
							<div className="flex flex-col gap-2">
								<Typography className="text-sm font-bold">
									Email
								</Typography>
								<input
									type="text"
									placeholder="Email"
									spellCheck="false"
									className="h-min w-[70%] font-sans transition-all text-sm font-bold leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
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
								Status
							</Typography>
							<Typography className="text-sm font-bold">
								Create At
							</Typography>
						</div>
						{chooseQuantity > 0 && (
							<div className="flex flex-row mt-4 mb-2">
								<Typography className="px-4 py-2 text-sm font-semibold border-[1px] border-solid border-gray-300">
									{chooseQuantity} selected
								</Typography>
								<Typography
									className="px-4 py-2 text-sm font-semibold border-[1px] border-solid border-gray-300 cursor-pointer hover:opacity-80"
									onClick={() => {
										setActionType('disable');
										handleOpenDeleteDialog();
									}}
								>
									Disable
								</Typography>
								<Typography
									className="px-4 py-2 text-sm font-semibold border-[1px] border-solid border-gray-300 cursor-pointer hover:opacity-80"
									onClick={() => {
										setActionType('enable');
										handleOpenDeleteDialog();
									}}
								>
									Enable
								</Typography>
							</div>
						)}
					</div>

					{/* )} */}
					{/* skeleton  */}
					{isLoading && (
						<>
							<div className="animate-pulse grid grid-cols-[50px_repeat(2,minmax(0,_1fr))_100px_100px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
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
								<Typography
									as="div"
									variant="paragraph"
									className="mb-2 h-3 rounded-full bg-gray-300"
								>
									&nbsp;
								</Typography>
							</div>
							<div className="animate-pulse grid grid-cols-[50px_repeat(2,minmax(0,_1fr))_100px_100px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
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
								<Typography
									as="div"
									variant="paragraph"
									className="mb-2 h-3 rounded-full bg-gray-300"
								>
									&nbsp;
								</Typography>
							</div>
							<div className="animate-pulse grid grid-cols-[50px_repeat(2,minmax(0,_1fr))_100px_100px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
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
								<Typography
									as="div"
									variant="paragraph"
									className="mb-2 h-3 rounded-full bg-gray-300"
								>
									&nbsp;
								</Typography>
							</div>
							<div className="animate-pulse grid grid-cols-[50px_repeat(2,minmax(0,_1fr))_100px_100px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
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
								<Typography
									as="div"
									variant="paragraph"
									className="mb-2 h-3 rounded-full bg-gray-300"
								>
									&nbsp;
								</Typography>
							</div>
							<div className="animate-pulse grid grid-cols-[50px_repeat(2,minmax(0,_1fr))_100px_100px] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
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
					{/* list  */}
					{!error && data && data?.length > 0 ? (
						<>
							{data
								.map((customer, index) =>
									index < active * perPage &&
									index >= (active - 1) * perPage ? (
										<div
											key={customer._id}
											className="grid grid-cols-[50px_repeat(2,minmax(0,_1fr))_100px_100px] gap-4 p-4 py-2 border-b-[1px] border-solid border-gray-300 pr-8 content-center items-center"
										>
											{/* <Typography className="text-sm font-semibold">
												{index + 1}
											</Typography> */}
											<Checkbox
												color="teal"
												className="h-5 w-5"
												value={customer._id}
												checked={customer.isChoose}
												onChange={(e) =>
													handleChooseCustomer(
														e.target.value
													)
												}
											/>

											<Link
												to={
													'/admin/customers/' +
													customer._id.toString()
												}
											>
												<Typography className="text-sm h-min font-semibold hover:underline ">
													{customer.username}
												</Typography>
											</Link>
											<Typography className="text-sm h-max font-normal">
												{customer.email}
											</Typography>
											<div className="pl-4">
												{customer.status === true ? (
													<span className="w-3 h-3 inline-block rounded-full bg-admin"></span>
												) : (
													<span className="w-3 h-3 inline-block rounded-full bg-gray-300"></span>
												)}
											</div>
											<Typography className="text-sm font-normal">
												{formatTimestamp(
													customer.createdAt
												)}
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
							<Typography className="text-lg font-medium m-2 text-center">
								No customers found.
							</Typography>
						)
					)}
				</div>
			</div>
			{/* en/disable dialog  */}
			<Dialog
				size="xs"
				open={openConfirmDialog}
				handler={toggleConfirmDialog}
			>
				<DialogHeader className="justify-center">
					Are you sure?
				</DialogHeader>
				<DialogBody className="text-center font-normal text-lg">
					{capitalizeFirstLetter(actionType) + ' '}
					<span
						className={`${
							actionType === 'disable'
								? 'text-red-600'
								: 'text-admin'
						} font-medium`}
					>
						{chooseQuantity}
					</span>{' '}
					customers ?
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="gray"
						onClick={toggleConfirmDialog}
						className="mr-1"
					>
						<span>Cancel</span>
					</Button>
					<Button
						variant="gradient"
						color={`${actionType === 'disable' ? 'red' : 'green'}`}
						onClick={handleEditCustomerStatus}
					>
						<span>Continue</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</AdminWideLayout>
	);
};

export default CustomerList;
