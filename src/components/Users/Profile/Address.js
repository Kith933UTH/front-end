import React, { useMemo, useState } from 'react';
import { Province, District, Commune } from '../../../resources/AddressVN';
import {
	Typography,
	Dialog,
	Card,
	CardBody,
	Button,
	Checkbox,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import {
	PencilSquareIcon,
	PlusCircleIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import { updateData } from '../../../api';
import notificationSlice from '../../Notification/NotificationSlice';
import { useDispatch } from 'react-redux';
import usersSlice from '../UsersSlice';
import Loading from '../../Loading/Loading';

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

const AddAddressDialog = ({ open, handler, data, token, mutate }) => {
	const dispatch = useDispatch();
	const [address, setAddress] = useState({
		province: { name: '' },
		district: { name: '' },
		commune: { name: '' },
		street: '',
		defaultAddress: false,
	});
	const [isValidStreet, setIsValidStreet] = useState(true);
	const [loading, setLoading] = useState(false);

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
		setLoading(true);
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
					Authorization: 'Bearer ' + token,
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
				setAddress({
					province: { name: '' },
					district: { name: '' },
					commune: { name: '' },
					street: '',
					defaultAddress: false,
				});
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
			})
			.finally(() => setLoading(false));
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
									{loading ? (
										<Loading
											customStyle={'!min-h-6 !w-8 !p-0'}
											sizeStyle={'h-4 w-4'}
										/>
									) : (
										<span>Save</span>
									)}
								</Button>
							</div>
						</form>
					</CardBody>
				</Card>
			</Dialog>
		</>
	);
};

const EditAddressDialog = ({ open, handler, data, addressIndex, submit }) => {
	const [address, setAddress] = useState({
		province: data.province,
		district: data.district,
		commune: data.commune,
		street: data.street,
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

	const handleSubmitUpdateAddress = (e) => {
		e.preventDefault();
		const newAddress = `${address.street}, ${address.commune.name}, ${address.district.name}, ${address.province.name}`;
		submit(newAddress, address.defaultAddress, addressIndex);
	};

	return (
		<>
			<Button
				variant="text"
				className="flex gap-2 items-center text-highlight py-2 px-2 mt-2 text-sm normal-case"
				color="light-green"
				onClick={handler}
			>
				<PencilSquareIcon className="text-highlight h-6 w-6" />
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
								{!data.defaultAddress && (
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
								)}
							</div>
							<div className="flex gap-4 mt-6 justify-end">
								<Button
									variant="text"
									color="red"
									onClick={() => {
										handler();
										setAddress({
											province: data.province,
											district: data.district,
											commune: data.commune,
											street: data.street,
											defaultAddress: data.defaultAddress,
										});
									}}
									className=""
								>
									<span>Cancel</span>
								</Button>
								<Button
									onClick={handleSubmitUpdateAddress}
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

const DeleteAddressDialog = ({ open, handler, addressIndex, submit }) => {
	const handleSubmitDeleteAddress = (e) => {
		e.preventDefault();
		submit(addressIndex);
	};

	return (
		<>
			<Button
				variant="text"
				className="flex gap-2 items-center text-red-700 py-2 px-2 mt-2 text-sm normal-case"
				color="red"
				onClick={handler}
			>
				<TrashIcon className="text-red-700 h-6 w-6" />
			</Button>

			<Dialog
				size="xs"
				open={open}
				handler={handler}
				className="shadow-md shadow-gray-700 bg-main *:selection:text-gray-900 *:selection:bg-highlight z-50"
			>
				{/* <DialogHeader className="justify-center text-text text-center">
					Are you sure remove this address?
				</DialogHeader> */}
				<DialogBody className="text-center font-medium pt-8 text-xl text-text">
					Are you sure remove this address?
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="gray"
						onClick={handler}
						className="mr-1 text-text"
					>
						<span>Cancel</span>
					</Button>
					<Button
						variant="gradient"
						color="red"
						onClick={handleSubmitDeleteAddress}
					>
						<span>Continue</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

const AddressItem = ({ address, data, token, mutate }) => {
	const dispatch = useDispatch();
	const addressIndex = data.address.indexOf(
		data.address.find((x) => x.address === address.address)
	);
	const addressSplit = address.address.split(', ');

	const province = Province.find((item) => item.name === addressSplit[3]);
	const district = District.find((item) => item.name === addressSplit[2]);
	const commune = Commune.find((item) => item.name === addressSplit[1]);

	const [openEditAddress, setOpenEditAddress] = useState(false);
	const handleOpenEditAddress = () => setOpenEditAddress(!openEditAddress);

	const [openDeleteAddress, setOpenDeleteAddress] = useState(false);
	const handleOpenDeleteAddress = () =>
		setOpenDeleteAddress(!openDeleteAddress);

	const handleUpdateAddress = (newAddress, isDefault, index) => {
		updateData(
			'users/' + data._id,
			{
				username: data.username,
				email: data.email,
				phoneNumber: data.phoneNumber,
				address: isDefault
					? data.address.map((item, i) => {
							if (i === index) {
								return {
									address: newAddress,
									defaultAddress: true,
								};
							} else {
								return { ...item, defaultAddress: false };
							}
					  })
					: [
							...data.address.map((item, i) => {
								if (i === index) {
									return {
										address: newAddress,
										defaultAddress: false,
									};
								} else {
									return item;
								}
							}),
					  ],
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
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
				handleOpenEditAddress();
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

	const handleDeleteAddress = (index) => {
		updateData(
			'users/' + data._id,
			{
				username: data.username,
				email: data.email,
				phoneNumber: data.phoneNumber,
				address: data.address
					.map((item, i) => {
						if (i === index) {
							return null;
						} else {
							return item;
						}
					})
					.filter((item) => item !== null),
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
			.then((results) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Deleted success',
					})
				);
				dispatch(usersSlice.actions.setToken(results));
				mutate();
				handleOpenDeleteAddress();
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
		<div className="flex justify-between py-4 border-solid border-b-[1px] border-gray-700">
			<div>
				<Typography className="text-base">{address.address}</Typography>
				{address.defaultAddress ? (
					<div className="bg-highlight px-2 py-1 text-background text-sm rounded-sm w-max mt-2">
						Default address
					</div>
				) : (
					''
				)}
			</div>
			<div className="flex gap-2">
				<EditAddressDialog
					open={openEditAddress}
					handler={handleOpenEditAddress}
					data={{
						province,
						district,
						commune,
						street: addressSplit[0],
						defaultAddress: address.defaultAddress,
					}}
					addressIndex={addressIndex}
					submit={handleUpdateAddress}
				/>
				{!address.defaultAddress && (
					<DeleteAddressDialog
						open={openDeleteAddress}
						handler={handleOpenDeleteAddress}
						addressIndex={addressIndex}
						submit={handleDeleteAddress}
					/>
				)}
			</div>
		</div>
	);
};

const Address = ({ data, token, mutate }) => {
	const [openAddAddress, setOpenAddAddress] = useState(false);
	const handleOpenAddAddress = () => setOpenAddAddress(!openAddAddress);
	return (
		<div className="w-full bg-main rounded-md p-4">
			<Typography className="text-text text-base font-semibold uppercase mb-2">
				DELIVERY ADDRESS
			</Typography>
			{data.address.map((address) => (
				<AddressItem
					key={address.address}
					address={address}
					data={data}
					token={token}
					mutate={mutate}
				/>
			))}
			<AddAddressDialog
				open={openAddAddress}
				handler={handleOpenAddAddress}
				data={data}
				token={token}
				mutate={mutate}
			/>
		</div>
	);
};

export default Address;
