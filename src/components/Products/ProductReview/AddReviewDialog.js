import React, { useEffect, useState } from 'react';
import {
	Badge,
	Button,
	Dialog,
	DialogBody,
	DialogHeader,
	IconButton,
	Typography,
} from '@material-tailwind/react';
import {
	PhotoIcon,
	StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';
import {
	ShieldCheckIcon,
	StarIcon as StarIconOutline,
	XMarkIcon,
} from '@heroicons/react/24/outline';

import { FileUploader } from 'react-drag-drop-files';
import { postFormData } from '../../../api';
import { useDispatch } from 'react-redux';
import notificationSlice from '../../Notification/NotificationSlice';
import Loading from '../../Loading/Loading';
const fileTypes = ['JPG', 'PNG', 'GIF'];

const AddReviewDialog = ({ productId, token, mutate }) => {
	const dispatch = useDispatch();
	//open dialog
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);

	// rating
	const [ratingLevel, setRatingLevel] = useState({
		choose: 5,
		level: ['Very bad', 'Bad', 'Fine', 'Good', 'Very good'],
	});
	const handleChooseRating = (value) => {
		setRatingLevel({ ...ratingLevel, choose: value });
	};

	const [selectedFile, setSelectedFile] = useState([]);
	const [preview, setPreview] = useState([]);

	useEffect(() => {
		if (selectedFile.length < 1) {
			setPreview([]);
			return;
		}
		setPreview(
			selectedFile.map((file) => {
				return URL.createObjectURL(file);
			})
		);

		//free memory when ever this component is unmounted
		return () => {
			preview.forEach((objectUrl) => {
				URL.revokeObjectURL(objectUrl);
			});
		};
	}, [selectedFile]);

	const handleChange = (file) => {
		setSelectedFile([...selectedFile, ...file].slice(0, 3));
	};

	const handleDeletePreviewImg = (value, url) => {
		URL.revokeObjectURL(url);
		const newSelectedFile = [...selectedFile];
		newSelectedFile.splice(value, 1);
		setSelectedFile(newSelectedFile);
	};

	//input value
	const [inputValue, setInputValue] = useState({
		comment: '',
		// email: '',
		// phone: '',
	});

	const [loading, setLoading] = useState(false);

	const clearReviewData = () => {
		setInputValue((prev) => {
			return { ...prev, comment: '' };
		});
		setRatingLevel({ ...ratingLevel, choose: 5 });
		preview.forEach((item) => URL.revokeObjectURL(item));
		setSelectedFile([]);
	};

	const handleAddReview = () => {
		setLoading(true);
		const formData = new FormData();
		formData.append('content', inputValue.comment);
		formData.append('productId', productId);
		formData.append('ratingStar', ratingLevel.choose);
		if (selectedFile.length > 0) {
			selectedFile.forEach((file) => {
				formData.append('images', file);
			});
		}

		postFormData('reviews', formData, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'multipart/form-data;',
			},
		})
			.then(() => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Add review success',
					})
				);
				mutate[0]();
				mutate[1]();
				handleOpen();
				clearReviewData();
			})
			.catch((err) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: err.response.data.message || 'Error',
					})
				);
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			<Button
				onClick={handleOpen}
				variant="outlined"
				className="bg-highlight text-main"
			>
				Write Review
			</Button>
			<Dialog
				open={open}
				size="md"
				handler={handleOpen}
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0.9, y: -100 },
				}}
				className="bg-main h-min overflow-y-scroll overflow-x-hidden flex flex-col shadow-md shadow-gray-800 *:selection:!text-gray-900 *:selection:!bg-highlight"
			>
				<DialogHeader className="justify-center py-0">
					<Typography className="text-text font-semibold px-8 pb-4 pt-8 text-2xl border-solid border-b-[2px] border-gray-700">
						What is your rating?
					</Typography>
				</DialogHeader>
				<DialogBody className="flex-1">
					<div className="grid grid-cols-5 md:gap-2 px-2 md:px-6 place-items-center w-max md:mx-auto mt-2">
						{ratingLevel.level.map((ratingItem, index) => {
							return (
								<div
									className="w-max flex flex-col md:gap-2 justify-center items-center"
									key={ratingItem}
								>
									<IconButton
										onClick={() =>
											handleChooseRating(index + 1)
										}
										className="bg-transparent flex justify-center"
										children={
											index <= ratingLevel.choose - 1 ? (
												<StarIconSolid className="w-6 h-6 md:w-10 md:h-10 text-highlight" />
											) : (
												<StarIconOutline className="w-6 h-6 md:w-10 md:h-10 text-highlight" />
											)
										}
									></IconButton>
									<Typography
										className={`text-text text-xs md:text-base ${
											index === ratingLevel.choose - 1
												? 'text-highlight font-medium'
												: ''
										}`}
									>
										{ratingItem}
									</Typography>
								</div>
							);
						})}
					</div>
					<form className="mt-4 px-4 flex flex-col">
						<textarea
							name="comment"
							placeholder="Your comment ..."
							spellCheck={false}
							value={inputValue.comment}
							onChange={(e) =>
								setInputValue({
									...inputValue,
									comment: e.target.value,
								})
							}
							className="rounded-lg text-text p-2 px-4 w-full bg-transparent border-solid border-[1px] border-gray-700"
						></textarea>
						{/* <div className="w-full grid md:grid-cols-2 gap-4 mt-2">
							<input
								name="name"
								required={true}
								className="rounded-lg text-text p-2 w-full bg-transparent border-solid border-[1px] border-gray-700"
								placeholder="Full name (required)"
								value={inputValue.name}
								onChange={(e) =>
									setInputValue({
										...inputValue,
										name: e.target.value,
									})
								}
							/>
							<input
								name="phone"
								type="tel"
								required={true}
								className="rounded-lg text-text p-2 w-full bg-transparent border-solid border-[1px] border-gray-700"
								placeholder="Phone number (required)"
								value={inputValue.phone}
								onChange={(e) =>
									setInputValue({
										...inputValue,
										phone: e.target.value,
									})
								}
							/>
						</div> */}
						<div className="flex gap-2 items-center mt-2">
							<ShieldCheckIcon className="w-6 h-6 text-highlight" />
							<Typography className="text-text text-sm">
								We is committed to keeping your phone number
								secure.
							</Typography>
						</div>
						{selectedFile.length < 3 && (
							<>
								<FileUploader
									handleChange={handleChange}
									name="reviewFiles"
									types={fileTypes}
									multiple={true}
									maxSize={3}
									children={
										<div className="w-full mt-2 h-20 bg-main rounded-md border-dashed border-[3px] border-gray-700 flex flex-col justify-center items-center p-3">
											<div className="flex gap-2 items-center">
												<PhotoIcon className="text-highlight w-8 h-8" />
												<Typography className="text-highlight md:text-base text-sm">
													Drop or click here to add
													your image
												</Typography>
											</div>
										</div>
									}
								/>
								<Typography className="text-text text-sm text-right mt-2">
									Allow: JPG, PNG, GIF (maximum 3 images)
								</Typography>
							</>
						)}
						<div className="flex gap-2 mt-4 flex-1">
							{selectedFile.length > 0 &&
								preview.map((item, index) => (
									<Badge
										key={item}
										content={
											<XMarkIcon
												className="w-4 h-4 text-text bg-main hover:opacity-60 cursor-pointer"
												onClick={() =>
													handleDeletePreviewImg(
														index,
														item
													)
												}
											/>
										}
										className="bg-transparent"
									>
										<img
											alt="review"
											className="h-24 w-24"
											src={item}
										/>
									</Badge>
								))}
						</div>
						<div className="flex justify-end gap-2">
							<Button
								variant="text"
								color="red"
								onClick={handleOpen}
								className="mr-1"
							>
								<span>Cancel</span>
							</Button>
							<Button
								variant="gradient"
								color="green"
								disabled={
									// inputValue.name === '' ||
									// inputValue.phone === ''
									inputValue.comment === ''
								}
								onClick={handleAddReview}
							>
								{loading ? (
									<Loading
										customStyle={'!min-h-4 !w-14 !p-0'}
										sizeStyle={'h-6 w-6'}
									/>
								) : (
									<span>Send</span>
								)}
							</Button>
						</div>
					</form>
				</DialogBody>
			</Dialog>
		</>
	);
};

export default AddReviewDialog;
