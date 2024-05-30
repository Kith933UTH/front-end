import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
	ButtonGroup,
	IconButton,
	ListItem,
	ListItemPrefix,
	Typography,
} from '@material-tailwind/react';
import { FormatNumber, isTimestampPast } from '../../utils';
import { decreaseQuantity, increaseQuantity } from '../Cart/CartSlice';
import { CartItemSkeleton } from './CartItemSkeleton';

const CartItem = ({ data, user, deleteHandler, isLoading }) => {
	const dispatch = useDispatch();
	const isEndDate = isTimestampPast(data.product.discount.discountEndDate);

	const [isEdit, setIsEdit] = useState(false);
	const handleIncreaseQuantity = () => {
		setIsEdit(true);
		dispatch(
			increaseQuantity({
				...user,
				idUpdate: data._id,
				quantity: data.quantity < 5 ? data.quantity + 1 : data.quantity,
			})
		);
	};
	const handleDecreaseQuantity = () => {
		setIsEdit(true);
		dispatch(
			decreaseQuantity({
				...user,
				idUpdate: data._id,
				quantity: data.quantity > 1 ? data.quantity - 1 : data.quantity,
			})
		);
	};
	const handleRemove = () => {
		deleteHandler({
			id: data._id,
			name: data.product.name,
		});
	};

	useEffect(() => {
		if (!isLoading) setIsEdit(false);
	}, [isLoading]);

	return !isEdit ? (
		<>
			<ListItem
				className="p-0 active:bg-transparent focus:bg-transparent hover:bg-transparent mb-4"
				selected={false}
				ripple={false}
			>
				{/* Cart item image  */}
				<ListItemPrefix className="bg-transparent">
					<img
						className="h-20 w-20 rounded-lg object-contain object-center bg-transparent"
						src={data.product.image.imageUrl}
						alt={data.product.image.imageName}
					/>
				</ListItemPrefix>

				{/* Cart item body  */}
				<div className="flex-1">
					<div className="flex flex-row justify-between gap-2">
						<div>
							<Typography
								variant="paragraph"
								className="uppercase font-medium text-sm text-main mb-3 cursor-default hover:underline"
							>
								{data.product.name}
							</Typography>
							<Typography
								variant="paragraph"
								className="uppercase text-xs font-semibold text-main mb-3 cursor-default flex gap-2"
							>
								{data.product?.ram && (
									<span className="border-solid border-[1px] border-main p-1 rounded">
										{data.product.ram}
									</span>
								)}
								{data.product?.hardDrive && (
									<span className="border-solid border-[1px] border-main p-1 rounded">
										{data.product.hardDrive}
									</span>
								)}
								{data.product?.rom && (
									<span className="border-solid border-[1px] border-main p-1 rounded">
										{data.product.rom}
									</span>
								)}
								<span className="border-solid border-[1px] border-main p-1 rounded">
									{data.product.color}
								</span>
							</Typography>
						</div>
						{/* Cart item remove button  */}
						<IconButton
							variant="text"
							className="py-0 px-4 w-5 h-5 hover:bg-transparent hover:opacity-80"
							onClick={handleRemove}
						>
							<TrashIcon className="w-5 h-5 text-red-800" />
						</IconButton>
					</div>

					<div className="flex flex-row justify-between items-center gap-2  cursor-default">
						<ButtonGroup
							variant="text"
							size="sm"
							className="text-main items-center"
						>
							<IconButton
								variant="text"
								className="hover:bg-black/10"
								disabled={data.quantity <= 1}
								onClick={handleDecreaseQuantity}
							>
								<MinusIcon className="w-4 h-4 text-main" />
							</IconButton>

							<IconButton className="font-md text-main text-base pointer-events-none">
								{data.quantity}
							</IconButton>

							<IconButton
								variant="text"
								className="hover:bg-black/10"
								disabled={data.quantity >= 5}
								onClick={handleIncreaseQuantity}
							>
								<PlusIcon className="w-4 h-4 text-main" />
							</IconButton>
						</ButtonGroup>
						<Typography
							variant="paragraph"
							className="text-main text-sm opacity-80 mr-4"
						>
							{FormatNumber(
								isEndDate
									? data.product.price
									: (data.product.price *
											(100 -
												data.product.discount
													.discountPercentage)) /
											100
							)}
						</Typography>
						<Typography
							variant="paragraph"
							className="text-main text-sm font-semibold"
						>
							{FormatNumber(
								isEndDate
									? data.product.price * data.quantity
									: ((data.product.price *
											(100 -
												data.product.discount
													.discountPercentage)) /
											100) *
											data.quantity
							)}{' '}
							<span className="hidden md:inline">VND</span>
						</Typography>
					</div>
				</div>
			</ListItem>
			<hr className="my-3" />
		</>
	) : (
		<CartItemSkeleton />
	);
};

export default CartItem;
