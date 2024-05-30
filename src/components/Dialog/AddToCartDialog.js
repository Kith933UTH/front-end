import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	IconButton,
} from '@material-tailwind/react';
import { ProductCard } from '../Products/ProductCard/ProductCard';
import { addToCart } from '../Cart/CartSlice';
import OptionList from '../OptionList/OptionList';
import { removeDuplicates } from '../../utils';
import notificationSlice from '../Notification/NotificationSlice';
import Loading from '../Loading/Loading';

const AddToCartDialog = ({ icon, buttonStyle, data }) => {
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
				// dispatch(
				// 	notificationSlice.actions.showNotification({
				// 		type: 'success',
				// 		message: 'Added to cart',
				// 	})
				// );
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

	return (
		<>
			<IconButton onClick={handleOpen} className={buttonStyle}>
				{icon}
			</IconButton>
			<Dialog
				open={open}
				handler={handleOpen}
				className="bg-main shadow-md shadow-gray-800 *:selection:!text-gray-900 *:selection:!bg-highlight "
			>
				<DialogBody className="p-0 md:p-4">
					<ProductCard
						detail={true}
						data={data}
						variant={chooseVariant}
					>
						{data?.ram && (
							<OptionList
								wrapperStyle={
									'px-4 flex flex-row gap-1 mb-4 flex-wrap'
								}
								data={removeDuplicates(
									data.variants.map((item) => item.ram)
								)}
								choose={chooseVariant.ram}
								handleChoose={handleChooseRam}
							/>
						)}
						{data?.hardDrive && (
							<OptionList
								wrapperStyle={
									'px-4 flex flex-row gap-1 mb-4 flex-wrap'
								}
								data={removeDuplicates(
									data.variants
										.filter(
											(item) =>
												item.ram === chooseVariant.ram
										)
										.map((item) => item.hardDrive)
								)}
								choose={chooseVariant.hardDrive}
								handleChoose={handleChooseHardDrive}
							/>
						)}
						{data?.rom && (
							<OptionList
								wrapperStyle={
									'px-4 flex flex-row gap-1 mb-4 flex-wrap'
								}
								data={removeDuplicates(
									data.variants
										.filter(
											(item) =>
												item.ram === chooseVariant.ram
										)
										.map((item) => item.rom)
								)}
								choose={chooseVariant.rom}
								handleChoose={handleChooseHardDrive}
							/>
						)}
						{data?.color && (
							<OptionList
								wrapperStyle={
									'px-4 flex flex-row gap-1 mb-4 flex-wrap'
								}
								data={removeDuplicates(
									data.variants
										.filter((item) => {
											if (item?.hardDrive) {
												return (
													item.ram ===
														chooseVariant.ram &&
													item.hardDrive ===
														chooseVariant.hardDrive
												);
											} else if (item?.rom) {
												return (
													item.ram ===
														chooseVariant.ram &&
													item.rom ===
														chooseVariant.rom
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
					</ProductCard>
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="red"
						onClick={handleOpen}
						className="mr-1"
					>
						<span>Cancel</span>
					</Button>
					<Button
						// variant="gradient"
						// color="green"
						className={`bg-highlight py-3 rounded-xl border-text border-solid border-[1px] text-main shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 ${
							loading ? 'pointer-events-none opacity-60 p-2' : ''
						}`}
						onClick={handleAddToCart}
						disabled={
							cartList.filter(
								(item) =>
									item.product._id === chooseVariant._id &&
									item.quantity >= 5
							).length > 0
						}
					>
						{loading ? (
							<Loading
								customStyle={'!min-h-4 !w-[136px] !p-1'}
								sizeStyle={'h-4 w-4'}
							/>
						) : (
							<span>Add to cart</span>
						)}
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default AddToCartDialog;
