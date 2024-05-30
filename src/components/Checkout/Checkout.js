import React, { useEffect, useState } from 'react';
import Infor from './ShipingInfor/Infor';
import Address from './ShipingInfor/Address';
import Order from './Order/Order';
import Payment from './ShipingInfor/Payment';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { getData, postData } from '../../api';
import SWRconfig from '../../api/SWRconfig';
import Loading from '../Loading/Loading';
import PhoneNumber from './ShipingInfor/PhoneNumber';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { removeEntireCart } from '../Cart/CartSlice';
import notificationSlice from '../Notification/NotificationSlice';

const phoneNumberRegex = /^0\d{9}$/;

const Checkout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartList = useSelector((state) => state.cart);
	const loggedUser = useSelector((state) => state.users);

	const userFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + loggedUser.accessToken },
		});

	const { data, error, isLoading } = useSWR(
		'/users/' + loggedUser.userInfo.id,
		userFetcher,
		SWRconfig
	);

	const [orderInfo, setOrderInfo] = useState({
		phoneNumber: '',
		address: '',
	});

	useEffect(() => {
		setOrderInfo((prev) => {
			return {
				...prev,
				address:
					data?.address && data.address.length > 0
						? data?.address?.filter(
								(item) => item.defaultAddress
						  )[0].address
						: '',
				phoneNumber: data?.phoneNumber ? data.phoneNumber : '',
			};
		});
	}, [data]);

	const handleChooseAddress = (value) =>
		setOrderInfo({ ...orderInfo, address: value });
	const handleSetPhoneNumber = (value) =>
		setOrderInfo({ ...orderInfo, phoneNumber: value });

	const [placeOrderLoading, setPlaceOrderLoading] = useState(false);

	const handlePlaceOrder = () => {
		setPlaceOrderLoading(true);
		postData(
			'orders',
			{
				orderItems: cartList.data.map((item) => {
					return {
						productVariantId: item.product._id,
						quantity: item.quantity,
					};
				}),
				phoneNumber: orderInfo.phoneNumber,
				address: orderInfo.address,
				paymentMethod: 'Payment on delivery',
			},
			{
				headers: {
					Authorization: 'Bearer ' + loggedUser.accessToken,
				},
			}
		)
			.then((results) => {
				dispatch(
					removeEntireCart({
						token: loggedUser.accessToken,
						id: loggedUser.userInfo.id,
					})
				);
				setPlaceOrderLoading(false);
				navigate('complete');
			})
			.catch((error) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: error?.response.data.message || 'Error',
					})
				);
				setPlaceOrderLoading(false);
			});
	};
	return (
		<div className="w-full my-6 grid grid-cols-1 gap-8 md:grid-cols-8 ">
			<div className="w-full md:col-span-3 flex flex-col gap-4">
				{isLoading && (
					<>
						<div className="w-full bg-main rounded-md p-4">
							<Loading customStyle={'min-h-32'} />
						</div>
						<div className="w-full bg-main rounded-md p-4">
							<Loading customStyle={'min-h-48'} />
						</div>
						<div className="w-full bg-main rounded-md p-4">
							<Loading customStyle={'min-h-32'} />
						</div>
						<div className="w-full bg-main rounded-md p-4">
							<Loading customStyle={'min-h-32'} />
						</div>
					</>
				)}
				{!error && data && orderInfo && (
					<>
						<Infor data={data} />

						<Address
							data={data.address}
							chooseAddress={orderInfo.address}
							handler={handleChooseAddress}
						/>
						{!data?.phoneNumber && data.phoneNumber === '' && (
							<PhoneNumber
								value={orderInfo.phoneNumber}
								handler={handleSetPhoneNumber}
							/>
						)}
						<Payment />
					</>
				)}
			</div>
			<div className="w-full md:col-span-5">
				<Order user={loggedUser} cartList={cartList} />
				{cartList.data.length > 0 ? (
					!placeOrderLoading ? (
						<Button
							fullWidth
							className="text-sm text-main mt-4 bg-highlight"
							onClick={handlePlaceOrder}
							disabled={
								orderInfo.address === '' ||
								orderInfo.phoneNumber === '' ||
								!phoneNumberRegex.test(orderInfo.phoneNumber)
							}
						>
							Place order
						</Button>
					) : (
						<Button
							fullWidth
							className="text-sm text-main mt-4 p-0 bg-highlight cursor-not-allowed pointer-events-none"
						>
							<Loading
								customStyle={'!min-h-11'}
								sizeStyle={'h-6 w-6'}
							/>
						</Button>
					)
				) : (
					<Link to="/">
						<Button
							fullWidth
							className="text-sm text-main mt-4 bg-highlight"
						>
							Back to Home
						</Button>
					</Link>
				)}
			</div>
		</div>
		// <div></div>
	);
};

export default Checkout;
