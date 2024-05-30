import {
	Typography,
	Dialog,
	Card,
	CardBody,
	Button,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Radio,
	Checkbox,
} from '@material-tailwind/react';
import React, { useMemo, useState } from 'react';
import { Commune, District, Province } from '../../../resources/AddressVN';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { getData, updateData } from '../../../api';
import notificationSlice from '../../Notification/NotificationSlice';
import usersSlice from '../../Users/UsersSlice';
import useSWR from 'swr';
import SWRconfig from '../../../api/SWRconfig';

const AddressSelect = ({ title, value, data, handler, disabled }) => {
	return (
		<Menu>
			<MenuHandler>
				<Button
					className={`normal-case bg-transparent shadow-none border-gray-700 border-solid border-[1px] ${
						disabled &&
						'pointer-events-none cursor-not-allowed select-none'
					}`}
				>
					{value.name ? (
						<Typography className="text-highlight">
							{value.name}
						</Typography>
					) : (
						<Typography className="text-gray-500">
							{title}
						</Typography>
					)}
				</Button>
			</MenuHandler>
			<MenuList className="z-[10000] max-h-64">
				{data.map((pro) => (
					<MenuItem key={pro.name} onClick={() => handler(pro)}>
						{pro.name}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

const AddAddressDialog = ({ open, handler }) => {
	const loggedUser = useSelector((state) => state.users);
	const userFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + loggedUser.accessToken },
		});

	const { data, mutate } = useSWR(
		'/users/' + loggedUser.userInfo.id,
		userFetcher,
		SWRconfig
	);

	const dispatch = useDispatch();
	const [address, setAddress] = useState({
		province: { name: '' },
		district: { name: '' },
		commune: { name: '' },
		street: '',
		defaultAddress: false,
	});
	const [isValidStreet, setIsValidStreet] = useState(true);

	const districtList = useMemo(() => {
		return District.filter(
			(dis) => dis.idProvince === address.province.idProvince
		);
	}, [address.province]);

	const communeList = useMemo(() => {
		return Commune.filter(
			(com) => com.idDistrict === address.district.idDistrict
		);
	}, [address.district]);

	const handleChangeProvince = (e) => {
		setAddress({
			...address,
			province: e,
			district: { name: '' },
			commune: { name: '' },
		});
	};

	const handleChangeDistrict = (e) => {
		setAddress({ ...address, district: e, commune: { name: '' } });
	};

	const handleChangeCommune = (e) => {
		setAddress({ ...address, commune: e });
	};

	const handleCheckStreet = (e) => {
		setAddress({
			...address,
			street: e.target.value,
		});
		setIsValidStreet(e.target.value !== '' && e.target.value.length >= 10);
	};

	const handleSubmitCreateAddress = (e) => {
		e.preventDefault();
		const newAddress = `${address.street}, ${address.commune.name}, ${address.district.name}, ${address.province.name}`;

		updateData(
			'users/' + data._id,
			{
				username: data.username,
				email: data.email,
				phoneNumber: data.phoneNumber,
				address: address.defaultAddress
					? [
							...data.address.map((item) => {
								return { ...item, defaultAddress: false };
							}),
							{ address: newAddress, defaultAddress: true },
					  ]
					: [
							...data.address,
							{ address: newAddress, defaultAddress: false },
					  ],
			},
			{
				headers: {
					Authorization: 'Bearer ' + loggedUser.accessToken,
				},
			}
		)
			.then((results) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Updated success',
					})
				);
				dispatch(usersSlice.actions.setToken(results));
				mutate();
				handler();
				// dispatch(refreshToken());
			})
			.catch((error) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: error?.response.data.message || 'Error',
					})
				);
			});
	};

	return (
		<>
			<Button
				variant="text"
				className="flex gap-2 items-center text-highlight py-2 px-2 mt-2 text-sm normal-case"
				color="light-green"
				onClick={handler}
			>
				<PlusCircleIcon className="h-6 w-6 text-highlight" />
				Add a new address
			</Button>
			<Dialog
				size="md"
				open={open}
				handler={handler}
				className="shadow-md shadow-gray-700 bg-main *:selection:text-gray-900 *:selection:bg-highlight z-50"
			>
				<Card className="mx-auto w-full bg-main text-text p-4">
					<CardBody className="flex flex-col gap-4 py-0 px-2 md:px-6">
						<Typography
							variant="h4"
							className="text-highlight mt-4 mb-2 text-center"
						>
							Add a new delivery address
						</Typography>
						<form className="flex flex-col">
							<div className="grid grid-cols-1 md:grid-cols-2 pb-4 rounded-md gap-4 ">
								{/* Province  */}
								<AddressSelect
									title={'Province'}
									value={address.province}
									data={Province}
									handler={handleChangeProvince}
									disabled={false}
								/>

								{/* District  */}
								<AddressSelect
									title={'District'}
									value={address.district}
									data={districtList}
									handler={handleChangeDistrict}
									disabled={address.province.name === ''}
								/>

								{/* Commune  */}
								<AddressSelect
									title={'Commune'}
									value={address.commune}
									data={communeList}
									handler={handleChangeCommune}
									disabled={address.district.name === ''}
								/>

								{/* Street  */}
								<input
									name="text"
									required={true}
									spellCheck="false"
									className={`text-highlight text-center placeholder:text-base placeholder:text-gray-500 p-2 w-full bg-transparent rounded-md border-solid border-[1px] border-gray-700 focus:outline-none ${
										address.street !== '' &&
										'border-gray-700'
									} ${
										!isValidStreet &&
										'border-red-700 selection:bg-red-700 placeholder:!text-red-700 !text-red-700'
									}`}
									placeholder="Detailed address, Street Name"
									value={address.street}
									onChange={handleCheckStreet}
								/>
								{!isValidStreet && (
									<Typography className="text-sm text-red-600 font-medium mt-1 col-span-1 md:col-span-2 selection:bg-red-700">
										Please enter detailed address. At least
										10 characters.
									</Typography>
								)}
								<Checkbox
									name="rate"
									color="light-green"
									className="hover:before:opacity-0 border-highlight w-4 h-4"
									containerProps={{
										className: 'p-1',
									}}
									label={
										<Typography className="text-highlight text-base ml-2">
											Set as default address
										</Typography>
									}
									checked={address.defaultAddress}
									onChange={() =>
										setAddress({
											...address,
											defaultAddress:
												!address.defaultAddress,
										})
									}
								/>
							</div>
							<div className="flex gap-4 mt-6 justify-end">
								<Button
									variant="text"
									color="red"
									onClick={handler}
									className=""
								>
									<span>Cancel</span>
								</Button>
								<Button
									onClick={handleSubmitCreateAddress}
									type="submit"
									className={`bg-highlight px-4 py-2 text-main flex justify-center items-center gap-2 pointer-events-none hover:opacity-50 opacity-50 ${
										address.province.name !== '' &&
										address.district.name !== '' &&
										address.commune.name !== '' &&
										address.street !== '' &&
										isValidStreet &&
										'pointer-events-auto opacity-100'
									} `}
								>
									Save
								</Button>
							</div>
						</form>
					</CardBody>
				</Card>
			</Dialog>
		</>
	);
};

const Address = ({ data, chooseAddress, handler }) => {
	// if (!chooseAddress)
	// 	handler(data.filter((item) => item.defaultAddress)[0].address);
	const [openAddAddress, setOpenAddAddress] = useState(false);
	const handleOpenAddAddress = () => setOpenAddAddress(!openAddAddress);
	return (
		<div className="w-full bg-main rounded-md p-4">
			<Typography className="text-text text-base font-semibold uppercase mb-2">
				DELIVERY ADDRESS
			</Typography>
			{data?.map((address) => (
				<div
					className="border-solid border-b-[1px] border-gray-700"
					key={address.address}
				>
					<Radio
						name="delivery-address"
						color="light-green"
						className="hover:before:opacity-0 w-4 h-4 hover:border-highlight"
						containerProps={{
							className: '',
						}}
						label={
							<Typography className="text-base block text-wrap ml-2">
								{address.address}
							</Typography>
						}
						checked={address.address === chooseAddress}
						onChange={() => handler(address.address)}
						labelProps={{ className: 'text-text py-4' }}
					/>
				</div>
			))}
			<AddAddressDialog
				open={openAddAddress}
				handler={handleOpenAddAddress}
			/>
		</div>
	);
};

export default Address;
