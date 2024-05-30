import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	IconButton,
} from '@material-tailwind/react';
import notificationSlice from '../Notification/NotificationSlice';
import Loading from '../Loading/Loading';
import { deleteData } from '../../api';

const RemoveFromWishListDialog = ({
	icon,
	buttonStyle,
	idRemove,
	productName,
	mutate,
}) => {
	const user = useSelector((state) => state.users);
	const [loading, setLoading] = useState(false);

	//open
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);

	//dispatch
	const dispatch = useDispatch();
	const handleAddToWishList = () => {
		setLoading(true);

		deleteData(
			'/users/' + user.userInfo.id + '/favoriteProducts/' + idRemove,
			{
				headers: {
					Authorization: 'Bearer ' + user.accessToken,
				},
			}
		)
			.then(() => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Remove success',
					})
				);
				if (mutate) mutate();
				handleOpen();
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
			<IconButton onClick={handleOpen} className={buttonStyle}>
				{icon}
			</IconButton>
			<Dialog
				size="sm"
				open={open}
				handler={handleOpen}
				className="bg-main"
			>
				{/* <DialogHeader className="justify-center">
					Are you sure?
				</DialogHeader> */}
				<DialogBody className="text-center text-text font-semibold text-xl pb-2 pt-6 px-8">
					Remove <span className="text-red-700">{productName}</span>{' '}
					to your wish list ?
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="white"
						onClick={handleOpen}
						className="mr-1"
					>
						<span>Close</span>
					</Button>
					<Button
						className={`bg-red-700 py-3 rounded-xl border-[0px] text-text shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 ${
							loading ? 'pointer-events-none opacity-60 p-0' : ''
						}`}
						onClick={handleAddToWishList}
					>
						{loading ? (
							<Loading
								customStyle={'!min-h-[40px] !w-[134px] !p-0'}
								sizeStyle={'h-4 w-4'}
								color={'red'}
							/>
						) : (
							<span>Continue</span>
						)}
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default RemoveFromWishListDialog;
