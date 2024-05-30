import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Typography,
} from '@material-tailwind/react';
import { ScrollToTop } from '../../../utils';
import { Pagination } from '../Pagination';
import useSWR from 'swr';
import { deleteData, getData } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import notificationSlice from '../../Notification/NotificationSlice';

const perPage = 10;

const ProductsList = ({ title, url }) => {
	const dispatch = useDispatch();
	const {
		data: productList,
		error,
		isLoading,
		mutate,
	} = useSWR('/products/' + url, getData);

	const [data, setData] = useState(productList);

	//pagination
	const [active, setActive] = useState(1);
	const lengthOfPage = Math.ceil(data?.length / perPage);
	useEffect(() => setActive(1), [url]);
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
	const [searchValue, setSearchValue] = useState({ name: '', brand: '' });
	const handleSubmitSearchByName = (e) => {
		setSearchValue({ ...searchValue, name: e.target.value });
		e.target.blur();
	};
	const handleSubmitSearchByBrand = (e) => {
		setSearchValue({ ...searchValue, brand: e.target.value });
		e.target.blur();
	};

	useEffect(() => {
		setActive(1);
		setData(
			productList?.filter(
				(item) =>
					item.name
						.toLowerCase()
						.includes(searchValue.name.toLowerCase()) &&
					item.brand
						.toLowerCase()
						.includes(searchValue.brand.toLowerCase())
			)
		);
	}, [searchValue, productList]);

	//delete product
	const token = useSelector((state) => state.users.accessToken);

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [infoDelete, setInfoDelete] = useState({ id: '', name: '' });

	const toggleDeleteDialog = () => setOpenDeleteDialog(!openDeleteDialog);
	const handleOpenDeleteDialog = (id, name) => {
		setInfoDelete({ id: id, name: name });
		toggleDeleteDialog();
	};

	const handleDeleteProduct = () => {
		toggleDeleteDialog();
		deleteData('products/' + url + '/' + infoDelete.id, {
			headers: { Authorization: 'Bearer ' + token },
		})
			.then((res) => {
				setInfoDelete({ id: '', name: '' });
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Delete success',
					})
				);
				mutate();
			})
			.catch((err) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: err.response.data.message,
					})
				);
			});
	};
	return (
		<AdminLayout>
			<div className="text-main">
				<div className="flex justify-between">
					<Typography className="text-xl font-semibold my-6">
						{title}
					</Typography>
					<div className="flex gap-4 items-center">
						{/* <Link to={'/admin/products/' + url + '/attributes'}>
							<Typography className="py-2 px-4 text-sm bg-white font-semibold border-[1px] border-solid border-gray-300 rounded-md hover:bg-gray-300">
								Attribute
							</Typography>
						</Link> */}
						<Link to={'/admin/products/' + url + '/new'}>
							<Typography className="py-2 px-4 text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md hover:bg-strongAdmin">
								New {title}
							</Typography>
						</Link>
					</div>
				</div>
				<div className="w-full bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
					{/* Header  */}
					{/* {!error && data?.length > 0 && ( */}
					<div className="grid grid-cols-[50px_repeat(4,minmax(0,_1fr))] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
						<Typography className="text-sm font-bold">#</Typography>
						<div className="flex flex-col gap-2  col-span-2">
							<Typography className="text-sm font-bold">
								Product Name
							</Typography>
							<input
								type="text"
								placeholder="Product name"
								spellCheck="false"
								defaultValue={searchValue.name}
								className="h-min font-sans transition-all text-sm font-bold leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md w-[50%] focus:border-admin"
								onKeyDown={(e) =>
									e.keyCode === 13 &&
									handleSubmitSearchByName(e)
								}
								onBlur={(e) => handleSubmitSearchByName(e)}
							></input>
						</div>
						<div className="flex flex-col gap-2 ">
							<Typography className="text-sm font-bold">
								Brand
							</Typography>
							<input
								type="text"
								placeholder="Brand"
								spellCheck="false"
								defaultValue={searchValue.brand}
								className="h-min font-sans transition-all text-sm font-bold leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
								onKeyDown={(e) =>
									e.keyCode === 13 &&
									handleSubmitSearchByBrand(e)
								}
								onBlur={(e) => handleSubmitSearchByBrand(e)}
							></input>
						</div>
						<Typography className="text-sm font-bold text-right mr-10">
							Modify
						</Typography>
					</div>
					{/* )} */}

					{/* skeleton  */}
					{isLoading && (
						<>
							<div className="animate-pulse grid grid-cols-[50px_repeat(4,minmax(0,_1fr))] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
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
									className="mb-2 h-3 rounded-full bg-gray-300 col-span-2"
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
								<div className="flex gap-2 justify-end">
									<Typography
										as="div"
										variant="paragraph"
										className="h-6 w-16 rounded-full bg-gray-300"
									>
										&nbsp;
									</Typography>
									<Typography
										as="div"
										variant="paragraph"
										className="h-6 w-16 rounded-full bg-gray-300"
									>
										&nbsp;
									</Typography>
								</div>
							</div>
							<div className="animate-pulse grid grid-cols-[50px_repeat(4,minmax(0,_1fr))] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
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
									className="mb-2 h-3 rounded-full bg-gray-300 col-span-2"
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
								<div className="flex gap-2 justify-end">
									<Typography
										as="div"
										variant="paragraph"
										className="h-6 w-16 rounded-full bg-gray-300"
									>
										&nbsp;
									</Typography>
									<Typography
										as="div"
										variant="paragraph"
										className="h-6 w-16 rounded-full bg-gray-300"
									>
										&nbsp;
									</Typography>
								</div>
							</div>
							<div className="animate-pulse grid grid-cols-[50px_repeat(4,minmax(0,_1fr))] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
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
									className="mb-2 h-3 rounded-full bg-gray-300 col-span-2"
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
								<div className="flex gap-2 justify-end">
									<Typography
										as="div"
										variant="paragraph"
										className="h-6 w-16 rounded-full bg-gray-300"
									>
										&nbsp;
									</Typography>
									<Typography
										as="div"
										variant="paragraph"
										className="h-6 w-16 rounded-full bg-gray-300"
									>
										&nbsp;
									</Typography>
								</div>
							</div>
							<div className="animate-pulse grid grid-cols-[50px_repeat(4,minmax(0,_1fr))] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8">
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
									className="mb-2 h-3 rounded-full bg-gray-300 col-span-2"
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
								<div className="flex gap-2 justify-end">
									<Typography
										as="div"
										variant="paragraph"
										className="h-6 w-16 rounded-full bg-gray-300"
									>
										&nbsp;
									</Typography>
									<Typography
										as="div"
										variant="paragraph"
										className="h-6 w-16 rounded-full bg-gray-300"
									>
										&nbsp;
									</Typography>
								</div>
							</div>
						</>
					)}

					{/* product list  */}
					{!error && data && data?.length > 0 ? (
						<>
							{data.map((product, index) =>
								index < active * perPage &&
								index >= (active - 1) * perPage ? (
									<div
										key={product._id}
										className="grid grid-cols-[50px_repeat(4,minmax(0,_1fr))] gap-4 p-4 border-b-[1px] border-solid border-gray-300 px-8"
									>
										<Typography className="text-sm font-semibold">
											{index + 1}
										</Typography>
										<Link
											to={
												'/admin/products/' +
												url +
												'/' +
												product._id
											}
											className="col-span-2"
										>
											<Typography className="text-sm font-semibold hover:underline ">
												{product.name}
											</Typography>
										</Link>
										<Typography className="text-sm">
											{product.brand}
										</Typography>
										<div className="flex gap-2 justify-end">
											<Link
												to={
													'/admin/products/' +
													url +
													'/' +
													product._id
												}
											>
												<Typography className="py-1 px-2 text-sm font-semibold border-[1px] border-solid border-gray-300 rounded-md hover:bg-gray-300">
													Edit
												</Typography>
											</Link>

											<Typography
												onClick={() =>
													handleOpenDeleteDialog(
														product._id,
														product.name
													)
												}
												className="py-1 px-2 text-sm font-semibold border-[1px] border-solid border-gray-300 rounded-md hover:bg-red-700 hover:text-white cursor-pointer"
											>
												Delete
											</Typography>
										</div>
									</div>
								) : null
							)}
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
								No product match.
							</Typography>
						)
					)}
				</div>
			</div>
			{/* delete dialog  */}
			<Dialog
				size="xs"
				open={openDeleteDialog}
				handler={toggleDeleteDialog}
			>
				<DialogHeader className="justify-center">
					Are you sure?
				</DialogHeader>
				<DialogBody className="text-center font-normal text-lg">
					Do you really want to delete the product{' '}
					<span className="text-red-600 font-medium">
						{infoDelete.name}
					</span>{' '}
					? This action cannot be undone.
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="gray"
						onClick={toggleDeleteDialog}
						className="mr-1"
					>
						<span>Cancel</span>
					</Button>
					<Button
						variant="gradient"
						color="red"
						onClick={handleDeleteProduct}
					>
						<span>Delete</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</AdminLayout>
	);
};

export default ProductsList;
