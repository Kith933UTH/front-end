import { Button, Chip, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import RatingBar from '../../RatingBar/RatingBar';
import OptionList from '../../OptionList/OptionList';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Cart/CartSlice';
import notificationSlice from '../../Notification/NotificationSlice';
import {
	FormatNumber,
	isTimestampPast,
	removeDuplicates,
} from '../../../utils';
import Loading from '../../Loading/Loading';
import usersSlice from '../../Users/UsersSlice';

const ProductBuy = ({ data }) => {
	const user = useSelector((state) => state.users);

	const cartList = useSelector((state) => state.cart.data);
	const [loading, setLoading] = useState(false);

	//open
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);

	//dispatch
	const dispatch = useDispatch();
	const handleAddToCart = () => {
		setLoading(true);
		dispatch(
			addToCart({
				token: user.accessToken,
				id: user.userInfo.id,
				product: chooseVariant,
			})
		).then((res) => {
			if (res?.error === undefined) {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Added to cart',
					})
				);
				handleOpen();
			} else {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: 'Add failed',
					})
				);
			}
			setLoading(false);
		});
	};

	// choose
	const [chooseVariant, setChooseVariant] = useState(data.variants[0]);

	const handleChooseRam = (value) => {
		setChooseVariant(
			data.variants.filter((item) => item.ram === value && item.status)[0]
		);
	};

	const handleChooseHardDrive = (value) => {
		if (chooseVariant?.hardDrive) {
			setChooseVariant(
				(prev) =>
					data.variants.filter(
						(item) =>
							item.ram === prev.ram &&
							item.color === prev.color &&
							item.hardDrive === value &&
							item.status
					)[0]
			);
		} else if (chooseVariant?.rom) {
			setChooseVariant(
				(prev) =>
					data.variants.filter(
						(item) =>
							item.ram === prev.ram &&
							item.color === prev.color &&
							item.rom === value &&
							item.status
					)[0]
			);
		}
	};
	const handleChooseColor = (value) => {
		if (chooseVariant?.hardDrive) {
			setChooseVariant(
				(prev) =>
					data.variants.filter(
						(item) =>
							item.ram === prev.ram &&
							item.hardDrive === prev.hardDrive &&
							item.color === value &&
							item.status
					)[0]
			);
		} else if (chooseVariant?.rom) {
			setChooseVariant(
				(prev) =>
					data.variants.filter(
						(item) =>
							item.ram === prev.ram &&
							item.rom === prev.rom &&
							item.color === value &&
							item.status
					)[0]
			);
		} else {
			setChooseVariant(
				(prev) =>
					data.variants.filter(
						(item) => item.color === value && item.status
					)[0]
			);
		}
	};

	const openLoginDialog = () => {
		dispatch(usersSlice.actions.setLoginDialog(true));
	};

	const isEndDate = isTimestampPast(chooseVariant.discount.discountEndDate);

	return (
		<>
			<Typography className="text-text text-2xl font-semibold mb-2">
				{data.name}
			</Typography>

			<Typography className="text-text text-base italic font-semibold opacity-70 mb-2">
				{data.brand}
			</Typography>

			<div className="flex flex-row gap-4 items-center mb-6">
				<RatingBar
					value={Math.floor(data.ratingStarStatistics.averageRating)}
					relatedStyle={'text-highlight text-sm w-4 h-4'}
					unrelatedStyle={'text-text text-sm w-4 h-4 '}
					wrapperStyle={'flex flex-row gap-1 hover:opacity-60'}
				/>
				<Typography className="text-text text-sm">
					({data.ratingStarStatistics.totalStars})
				</Typography>
			</div>

			{data?.rams && (
				<OptionList
					wrapperStyle={'flex flex-row gap-1 mb-4 flex-wrap'}
					data={removeDuplicates(
						data.variants.map((item) => item.ram)
					)}
					choose={chooseVariant.ram}
					handleChoose={handleChooseRam}
				/>
			)}
			{data?.hardDrives && (
				<OptionList
					wrapperStyle={'flex flex-row gap-1 mb-4 flex-wrap'}
					data={removeDuplicates(
						data.variants
							.filter((item) => item.ram === chooseVariant.ram)
							.map((item) => item.hardDrive)
					)}
					choose={chooseVariant.hardDrive}
					handleChoose={handleChooseHardDrive}
				/>
			)}
			{data?.roms && (
				<OptionList
					wrapperStyle={'flex flex-row gap-1 mb-4 flex-wrap'}
					data={removeDuplicates(
						data.variants
							.filter((item) => item.ram === chooseVariant.ram)
							.map((item) => item.rom)
					)}
					choose={chooseVariant.rom}
					handleChoose={handleChooseHardDrive}
				/>
			)}
			{data?.colors && (
				<OptionList
					wrapperStyle={'flex flex-row gap-1 mb-4 flex-wrap'}
					data={removeDuplicates(
						data.variants
							.filter((item) => {
								if (item?.hardDrive) {
									return (
										item.ram === chooseVariant.ram &&
										item.hardDrive ===
											chooseVariant.hardDrive
									);
								} else if (item?.rom) {
									return (
										item.ram === chooseVariant.ram &&
										item.rom === chooseVariant.rom
									);
								}
								return true;
							})
							.map((item) => item.color)
					)}
					choose={chooseVariant.color}
					handleChoose={handleChooseColor}
				/>
			)}

			<hr className="my-8 border-blue-gray-50" />

			<div className="flex flex-row gap-3 items-center">
				<Typography className="text-highlight text-xl font-semibold">
					{FormatNumber(
						isEndDate
							? chooseVariant.price
							: (chooseVariant.price *
									(100 -
										chooseVariant.discount
											.discountPercentage)) /
									100
					)}{' '}
					VND
				</Typography>
				{chooseVariant.discount.discountPercentage !== 0 && (
					<>
						<Typography className="text-text text-base line-through">
							{FormatNumber(chooseVariant.price)} VND
						</Typography>

						<Chip
							className="text-highlight border-highlight border-solid border-[1px] py-1 px-2"
							value={
								'-' +
								chooseVariant.discount.discountPercentage +
								'%'
							}
						/>
					</>
				)}
			</div>
			{user.accessToken === '' ? (
				<Button
					ripple={true}
					fullWidth={true}
					onClick={openLoginDialog}
					className={`bg-highlight my-4 py-3 rounded-xl border-text border-solid border-[1px] text-main shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100`}
				>
					<span>Add to cart</span>
				</Button>
			) : (
				<Button
					ripple={true}
					fullWidth={true}
					onClick={handleAddToCart}
					disabled={
						cartList.filter(
							(item) =>
								item.product._id === chooseVariant._id &&
								item.quantity >= 5
						).length > 0
					}
					className={`bg-highlight my-4 py-3 rounded-xl border-text border-solid border-[1px] text-main shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 ${
						loading ? 'pointer-events-none opacity-60 p-2' : ''
					}`}
				>
					{loading ? (
						<Loading
							customStyle={'!min-h-4 !w-full !p-1'}
							sizeStyle={'h-4 w-4'}
						/>
					) : (
						<span>Add to cart</span>
					)}
				</Button>
			)}
		</>
	);
};

export default ProductBuy;
