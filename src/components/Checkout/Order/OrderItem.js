import { ButtonGroup, IconButton, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity } from '../../Cart/CartSlice';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { FormatNumber } from '../../../utils';
import { OrderItemSkeleton } from './OrderItemSkeleton';

const OrderItem = ({ data, user, deleteHandler, isLoading }) => {
	const dispatch = useDispatch();
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
			name: data.productType,
		});
	};
	useEffect(() => {
		if (!isLoading) setIsEdit(false);
	}, [isLoading]);

	return !isEdit ? (
		<>
			<div className="p-0 gap-4 flex mb-4">
				{/* Cart item image  */}
				<img
					className="h-20 w-20 md:h-28 md:w-28 rounded-lg object-contain object-center"
					src={data.product.image.imageUrl}
					alt={data.product.image.imageName}
				/>

				{/* Cart item body  */}
				<div className="flex-1">
					<div className="flex flex-row justify-between gap-2">
						<div>
							<Typography
								variant="paragraph"
								className="uppercase font-medium text-base text-text mb-2 cursor-default hover:underline"
							>
								{data.product.name}
							</Typography>
							<Typography
								variant="paragraph"
								className="uppercase text-xs font-medium text-text mb-3 cursor-default flex gap-2"
							>
								{data.product?.ram && (
									<span className="border-solid border-[1px] border-text p-1 rounded">
										{data.product.ram}
									</span>
								)}
								{data.product?.hardDrive && (
									<span className="border-solid border-[1px] border-text p-1 rounded">
										{data.product.hardDrive}
									</span>
								)}
								{data.product?.rom && (
									<span className="border-solid border-[1px] border-text p-1 rounded">
										{data.product.rom}
									</span>
								)}
								<span className="border-solid border-[1px] border-text p-1 rounded">
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
							className="text-text items-center"
						>
							<IconButton
								variant="text"
								className="hover:bg-black/10"
								disabled={data.quantity <= 1}
								onClick={handleDecreaseQuantity}
							>
								<MinusIcon className="w-4 h-4 text-white" />
							</IconButton>

							<IconButton className="font-md text-text text-base pointer-events-none">
								{data.quantity}
							</IconButton>

							<IconButton
								variant="text"
								className="hover:bg-black/10"
								disabled={data.quantity >= 5}
								onClick={handleIncreaseQuantity}
							>
								<PlusIcon className="w-4 h-4 text-white" />
							</IconButton>
						</ButtonGroup>
						<Typography
							variant="paragraph"
							className="text-text text-base opacity-80 mr-4"
						>
							{FormatNumber(
								(data.product.price *
									(100 -
										data.product.discount
											.discountPercentage)) /
									100
							)}
						</Typography>
						<Typography
							variant="paragraph"
							className="text-text text-base font-semibold"
						>
							{FormatNumber(
								((data.product.price *
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
			</div>
			<hr className="my-3" />
		</>
	) : (
		<OrderItemSkeleton />
	);
};

export default OrderItem;
