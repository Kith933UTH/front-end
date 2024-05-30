import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Typography,
} from '@material-tailwind/react';
import { FormatNumber } from '../../../utils';
import { removeFromCart } from '../../Cart/CartSlice';
import OrderItem from './OrderItem';
import Loading from '../../Loading/Loading';

const Order = ({ user, cartList }) => {
	const dispatch = useDispatch();

	//calculate total
	const total = useMemo(() => {
		return cartList.data.reduce((total, cur) => {
			return (
				total +
				((cur.product.price *
					(100 - cur.product.discount.discountPercentage)) /
					100) *
					cur.quantity
			);
		}, 0);
	}, [cartList]);

	//confirm delete dialog
	const [dataDelete, setDataDelete] = useState({ id: '', name: '' });
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
	const toggleConfirmDialog = () => setOpenConfirmDialog(!openConfirmDialog);

	const handleOpenDeleteDialog = (data) => {
		setDataDelete(data);
		toggleConfirmDialog();
	};

	const handleDeleteFromCart = () => {
		if (
			cartList.data.filter((item) => item._id === dataDelete.id).length >
			0
		) {
			dispatch(
				removeFromCart({
					token: user.accessToken,
					id: user.userInfo.id,
					idRemove: dataDelete.id,
				})
			);
		}
		toggleConfirmDialog();
	};

	return (
		<div className="w-full bg-main rounded-md p-4">
			{cartList.isLoading && cartList.data.length === 0 && (
				<Loading customStyle={'min-h-56'} />
			)}
			{cartList.data.length > 0 ? (
				<>
					<Typography className="text-text text-base font-semibold uppercase mb-3">
						Your order
					</Typography>
					<div className="">
						{cartList.data.map((item) => (
							<OrderItem
								key={item._id}
								data={item}
								user={{
									token: user.accessToken,
									id: user.userInfo.id,
								}}
								deleteHandler={handleOpenDeleteDialog}
								isLoading={cartList.isLoading}
							/>
						))}
					</div>
					<Typography
						variant="paragraph"
						className="text-text text-lg font-semibold flex justify-between"
					>
						<span>Total: </span>
						<span className="text-highlight">
							{FormatNumber(total)} VND
						</span>
					</Typography>
					{/*confirm delete dialog  */}
					<Dialog
						size="xs"
						open={openConfirmDialog}
						handler={toggleConfirmDialog}
					>
						<DialogHeader className="justify-center">
							Are you sure?
						</DialogHeader>
						<DialogBody className="text-center font-normal text-lg">
							Remove{' '}
							<span className="text-red-600">
								{dataDelete.name}
							</span>{' '}
							from your cart ?
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
								color="red"
								onClick={handleDeleteFromCart}
							>
								<span>Continue</span>
							</Button>
						</DialogFooter>
					</Dialog>
				</>
			) : (
				!cartList.isLoading && (
					<Typography className="text-text text-xl font-semibold text-center">
						There are no products in your order.
					</Typography>
				)
			)}
		</div>
	);
};

export default Order;
