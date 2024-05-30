import { IconButton, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import AdminLayout from '../../../layouts/AdminLayout';
import { postData } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import notificationSlice from '../../Notification/NotificationSlice';
import Loading from '../../Loading/Loading';

const NewProduct = ({ title, url }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.users.accessToken);
	const [inputValue, setInputValue] = useState({ name: '', brand: '' });
	const [loading, setLoading] = useState(false);

	const handleSubmitAddProduct = (e) => {
		e.preventDefault();
		setLoading(true);
		postData(
			'products/' + url,
			{ name: inputValue.name, brand: inputValue.brand },
			{
				headers: { Authorization: 'Bearer ' + token },
			}
		)
			.then((res) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Add success',
					})
				);
			})
			.catch((err) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: err.response.data.message,
					})
				);
			})
			.finally(() => setLoading(false));
	};
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
						Create A{' '}
						<span className="text-admin">New {title} (+)</span>
					</Typography>
				</div>
				<div className="w-full flex flex-col gap-4">
					<div className="w-full bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
						<form className="p-4 pt-0 grid grid-cols-5 gap-2">
							<div className="col-span-3 flex flex-col gap-2">
								<Typography className="pt-4 text-base font-semibold">
									Name
								</Typography>
								<input
									type="text"
									placeholder="Ex: iPhone 15..."
									spellCheck="false"
									value={inputValue.name}
									onChange={(e) =>
										setInputValue({
											...inputValue,
											name: e.target.value,
										})
									}
									className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
								></input>
							</div>
							<div className="col-span-2 flex flex-col gap-2">
								<Typography className="pt-4 text-base font-semibold">
									Brand
								</Typography>
								<input
									type="text"
									placeholder="Brand"
									spellCheck="false"
									value={inputValue.brand}
									onChange={(e) =>
										setInputValue({
											...inputValue,
											brand: e.target.value,
										})
									}
									className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
								></input>
							</div>
							{/* 
							<div className="col-span-5 flex flex-col gap-2">
								<Typography className="text-sm font-medium">
									Description
								</Typography>
								<textarea
									type="text"
									placeholder="Description"
									spellCheck="false"
									rows={5}
									className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
								></textarea>
							</div> */}
							<div className="mt-2 col-span-5 flex justify-end">
								{loading ? (
									<button
										className={`w-min text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md pointer-events-none opacity-60`}
									>
										<Loading
											customStyle={
												'!min-h-[38px] !w-[66px] !p-0'
											}
											sizeStyle={'h-5 w-5'}
										/>
									</button>
								) : (
									<button
										type="submit"
										onClick={handleSubmitAddProduct}
										className={`w-min py-2 px-4 text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md hover:bg-strongAdmin
								 ${
										(inputValue.brand === '' ||
											inputValue.name === '') &&
										'pointer-events-none opacity-60'
									}`}
									>
										Save
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default NewProduct;
