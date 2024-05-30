import {
	Badge,
	IconButton,
	Switch,
	Typography,
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	ArrowLeftIcon,
	PhotoIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import AdminLayout from '../../../../layouts/AdminLayout';
import { FileUploader } from 'react-drag-drop-files';
import useSWR from 'swr';
import {
	deleteData,
	getData,
	patchFormData,
	postData,
	postFormData,
	updateData,
} from '../../../../api';
import { formatTimestampToValue, isNumber } from '../../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import notificationSlice from '../../../Notification/NotificationSlice';
import { DetailPhoneInfo } from './DetailPhoneInfo';
import SWRconfig from '../../../../api/SWRconfig';
import Loading from '../../../Loading/Loading';

const fileTypes = ['JPG', 'PNG', 'GIF'];

const GeneralData = ({ data, productId, mutate }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.users.accessToken);
	const [inputValue, setInputValue] = useState({
		name: data.name,
		brand: data.brand,
	});
	const [loading, setLoading] = useState(false);

	const handleUpdateGeneralData = (e) => {
		e.preventDefault();
		setLoading(true);
		updateData(
			'products/smartPhones/' + productId,
			{ name: inputValue.name, brand: inputValue.brand },
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
			.then((res) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Updated success',
					})
				);
				mutate();
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
		<div className="w-full bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
			<Typography className="p-4 text-base font-semibold">
				General
			</Typography>
			<form className="p-4 pt-0 grid grid-cols-5 gap-2">
				<div className="col-span-3 flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Name
					</Typography>
					<input
						type="text"
						placeholder="Name"
						value={inputValue.name}
						onChange={(e) =>
							setInputValue({
								...inputValue,
								name: e.target.value,
							})
						}
						spellCheck="false"
						className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				</div>
				<div className="col-span-2 flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Brand
					</Typography>
					<input
						type="text"
						placeholder="Brand"
						value={inputValue.brand}
						onChange={(e) =>
							setInputValue({
								...inputValue,
								brand: e.target.value,
							})
						}
						spellCheck="false"
						className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				</div>
				<div className="text-right mt-2 col-span-5">
					{loading ? (
						<button
							className={`w-min text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md pointer-events-none opacity-60`}
						>
							<Loading
								customStyle={'!min-h-[38px] !w-[66px] !p-0'}
								sizeStyle={'h-5 w-5'}
							/>
						</button>
					) : (
						<button
							type="submit"
							onClick={handleUpdateGeneralData}
							className={`w-min py-2 px-4 text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md hover:bg-strongAdmin
								 ${
										(inputValue.brand === '' ||
											inputValue.name === '') &&
										'pointer-events-none opacity-60'
									}`}
						>
							Save
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

const DetailItem = ({ list, handleChange }) => {
	return list.map((item) => (
		<div className="px-4 py-2 pt-0" key={item.title}>
			<Typography className="text-sm font-medium">
				{item.title}
			</Typography>
			<input
				type="text"
				value={item.value}
				onChange={(e) =>
					handleChange(
						list.map((listItem) => {
							if (listItem.title === item.title)
								return { ...listItem, value: e.target.value };
							else return listItem;
						})
					)
				}
				required={true}
				spellCheck="false"
				className="h-min w-full font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-1 px-2 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
			></input>
		</div>
	));
};

const DetailData = ({ data, productId, mutate }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.users.accessToken);

	const [screen, setScreen] = useState(
		data?.screen || DetailPhoneInfo.screen
	);
	const [camera, setCamera] = useState(
		data?.camera || DetailPhoneInfo.camera
	);
	const [selfie, setSelfie] = useState(
		data?.selfie || DetailPhoneInfo.selfie
	);
	const [operatingSystemAndCPU, setOperatingSystemAndCPU] = useState(
		data?.operatingSystemAndCPU || DetailPhoneInfo.operatingSystemAndCPU
	);
	const [ramRom, setRamRom] = useState(
		data?.ramRom || DetailPhoneInfo.ramRom
	);
	const [connection, setConnection] = useState(
		data?.connection || DetailPhoneInfo.connection
	);
	const [batteryAndCharger, setBatteryAndCharger] = useState(
		data?.batteryAndCharger || DetailPhoneInfo.batteryAndCharger
	);
	const [utility, setUtility] = useState(
		data?.utility || DetailPhoneInfo.utility
	);
	const [generalInformation, setGeneralInformation] = useState(
		data?.generalInformation || DetailPhoneInfo.generalInformation
	);

	const [loading, setLoading] = useState(false);

	const handleSubmitUpdateDetail = (e) => {
		e.preventDefault();
		setLoading(true);
		if (!data) {
			postData(
				'products/smartPhones/' + productId + '/details',
				{
					guaranteePeriod: 10,
					includedAccessories: [
						'Sách hướng dẫn',
						'Thùng máy',
						'Sạc Laptop Asus ',
					],
					screen: screen,
					camera: camera,
					selfie: selfie,
					operatingSystemAndCPU: operatingSystemAndCPU,
					ramRom: ramRom,
					connection: connection,
					batteryAndCharger: batteryAndCharger,
					utility: utility,
					generalInformation: generalInformation,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			)
				.then((res) => {
					dispatch(
						notificationSlice.actions.showNotification({
							type: 'success',
							message: 'Updated success',
						})
					);
					mutate();
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
		} else {
			updateData(
				'products/smartPhones/' + productId + '/details/' + data._id,
				{
					guaranteePeriod: 10,
					includedAccessories: [
						'Sách hướng dẫn',
						'Thùng máy',
						'Sạc Laptop',
					],
					screen: screen,
					camera: camera,
					selfie: selfie,
					operatingSystemAndCPU: operatingSystemAndCPU,
					ramRom: ramRom,
					connection: connection,
					batteryAndCharger: batteryAndCharger,
					utility: utility,
					generalInformation: generalInformation,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			)
				.then((res) => {
					dispatch(
						notificationSlice.actions.showNotification({
							type: 'success',
							message: 'Updated success',
						})
					);
					mutate();
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
		}
	};

	return (
		<div className="w-full bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
			<form className="grid grid-cols-2">
				<div className="mb-4">
					<Typography className="p-4 pb-2 text-base font-bold">
						Screen
					</Typography>
					<DetailItem list={screen} handleChange={setScreen} />
				</div>

				<div className="mb-4">
					<Typography className="p-4 pb-2 text-base font-bold">
						Main camera
					</Typography>
					<DetailItem list={camera} handleChange={setCamera} />
				</div>

				<div className="mb-4">
					<Typography className="p-4 pb-2 text-base font-bold">
						Selfie camera
					</Typography>
					<DetailItem list={selfie} handleChange={setSelfie} />
				</div>

				<div className="mb-4">
					<Typography className="p-4 pb-2 text-base font-bold">
						Operating System, CPU
					</Typography>
					<DetailItem
						list={operatingSystemAndCPU}
						handleChange={setOperatingSystemAndCPU}
					/>
				</div>

				<div className="mb-4">
					<Typography className="p-4 pb-2 text-base font-bold">
						RAM, ROM
					</Typography>
					<DetailItem list={ramRom} handleChange={setRamRom} />
				</div>

				<div className="mb-4">
					<Typography className="p-4 pb-2 text-base font-bold">
						Connection
					</Typography>
					<DetailItem
						list={connection}
						handleChange={setConnection}
					/>
				</div>

				<div className="mb-4">
					<Typography className="p-4 pb-2 text-base font-bold">
						Battery, Charger
					</Typography>
					<DetailItem
						list={batteryAndCharger}
						handleChange={setBatteryAndCharger}
					/>
				</div>

				<div className="mb-4">
					<Typography className="p-4 pb-2 text-base font-bold">
						Utilities
					</Typography>
					<DetailItem list={utility} handleChange={setUtility} />
				</div>

				<div className="mb-4">
					<Typography className="p-4 pb-2 text-base font-bold">
						General Information
					</Typography>
					<DetailItem
						list={generalInformation}
						handleChange={setGeneralInformation}
					/>
				</div>
				<div className="mb-4 col-span-2 px-4 text-right">
					{loading ? (
						<button
							className={`w-min text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md pointer-events-none opacity-60`}
						>
							<Loading
								customStyle={'!min-h-[38px] !w-[66px] !p-0'}
								sizeStyle={'h-5 w-5'}
							/>
						</button>
					) : (
						<button
							type="submit"
							onClick={handleSubmitUpdateDetail}
							className="w-min py-2 px-4 text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md hover:bg-strongAdmin"
						>
							Save
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

const VariantItem = ({ data, productId, mutate }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.users.accessToken);
	const [inputValue, setInputValue] = useState({
		price: data.price,
		discount: {
			discountPercentage: data.discount.discountPercentage,
			discountEndDate: data.discount.discountEndDate,
		},
		status: data.status,
		image: null,
	});
	const [imagePreview, setImagePreview] = useState(null);
		const [updateLoading, setUpdateLoading] = useState(false);
		const [deleteLoading, setDeleteLoading] = useState(false);

	useEffect(() => {
		if (inputValue.image === null) {
			setImagePreview(data.image.imageUrl);
			return;
		}
		setImagePreview(URL.createObjectURL(inputValue.image));

		//free memory when ever this component is unmounted
		return () => {
			URL.revokeObjectURL(imagePreview);
		};
	}, [inputValue.image]);

	const handleChangeImage = (file) => {
		setInputValue({ ...inputValue, image: file });
	};

	const handleSubmitUpdateVariant = (e) => {
		e.preventDefault();
		setUpdateLoading(true);
		const formData = new FormData();
		formData.append('price', inputValue.price);
		if (inputValue.discount.discountPercentage === 0) {
			formData.append(
				'discount',
				JSON.stringify({ discountPercentage: 0 })
			);
		} else {
			formData.append('discount', JSON.stringify(inputValue.discount));
		}

		formData.append('status', inputValue.status);
		formData.append('image', inputValue.image);

		patchFormData(
			'products/smartPhones/' + productId + '/variants/' + data._id,
			formData,
			{
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'multipart/form-data;',
				},
			}
		)
			.then((res) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Update success',
					})
				);
				mutate();
			})
			.catch((err) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: err.response.data.message || 'Error',
					})
				);
			})
			.finally(() => setUpdateLoading(false));
	};

	const handleDeleteVariant = (e) => {
		e.preventDefault();
		setDeleteLoading(true);
		deleteData(
			'products/smartPhones/' + productId + '/variants/' + data._id,
			{
				headers: { Authorization: 'Bearer ' + token },
			}
		)
			.then((res) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Delete success',
					})
				);
				mutate();
			})
			.catch((err) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: err.response.data.message || 'Error',
					})
				);
			})
			.finally(() => setDeleteLoading(false));
	};

	return (
		<div className="w-full bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
			<Typography className="p-4 text-base font-semibold">
				Variant
			</Typography>
			<form className="p-4 pt-0 grid grid-cols-2 gap-2">
				{/* image  */}
				<div className="flex flex-col gap-2 col-span-2">
					<Typography className="text-sm font-medium">
						Image
					</Typography>
					<div className="grid grid-cols-2 gap-4">
						{imagePreview && (
							<img
								src={imagePreview}
								alt="variantImg"
								className="object-cover rounded-md"
							/>
						)}
						<FileUploader
							name="variantImage"
							types={fileTypes}
							handleChange={handleChangeImage}
							children={
								<div className="w-full rounded-md border-dashed border-[3px] border-gray-300 flex flex-col justify-center items-center p-3 cursor-pointer">
									<div className="p-4 ">
										<PhotoIcon className="text-admin w-8 h-8" />
									</div>
								</div>
							}
						/>
					</div>
				</div>

				{/* ram  */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">RAM</Typography>
					<input
						type="text"
						value={data?.ram}
						disabled
						placeholder="Ram"
						spellCheck="false"
						className="cursor-not-allowed h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				</div>

				{/* rom */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">ROM</Typography>
					<input
						type="text"
						value={data?.rom}
						placeholder="Rom"
						spellCheck="false"
						disabled
						className="cursor-not-allowed h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				</div>
				{/* price */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Price
					</Typography>
					<input
						type="text"
						placeholder="Price"
						value={inputValue?.price}
						onChange={(e) =>
							setInputValue({
								...inputValue,
								price: e.target.value,
							})
						}
						spellCheck="false"
						className={`${
							!isNumber(inputValue.price) ? '!border-red-600' : ''
						} h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin`}
					></input>
				</div>
				{/* color */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Color
					</Typography>
					<input
						type="text"
						placeholder="Color"
						value={data?.color}
						disabled
						spellCheck="false"
						className="cursor-not-allowed h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				</div>

				{/* Discount */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Discount
					</Typography>
					<input
						type="text"
						placeholder="Discount"
						value={inputValue?.discount.discountPercentage}
						onChange={(e) =>
							setInputValue({
								...inputValue,
								discount: {
									...inputValue.discount,
									discountPercentage: e.target.value,
								},
							})
						}
						spellCheck="false"
						className={`${
							!(
								inputValue.discount.discountPercentage >= 0 &&
								inputValue.discount.discountPercentage <= 100
							)
								? '!border-red-600'
								: ''
						} h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin`}
					></input>
				</div>
				{/* End date */}
				{inputValue.discount.discountPercentage > 0 &&
					inputValue.discount.discountPercentage <= 100 && (
						<div className="flex flex-col gap-2">
							<Typography className="text-sm font-medium">
								End date
							</Typography>
							<input
								type="date"
								value={formatTimestampToValue(
									inputValue?.discount.discountEndDate
								)}
								onChange={(e) =>
									setInputValue({
										...inputValue,
										discount: {
											...inputValue.discount,
											discountEndDate: new Date(
												e.target.value
											),
										},
									})
								}
								className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
							></input>
						</div>
					)}
				{/* Quantity */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Quantity
					</Typography>
					<input
						type="number"
						min={1}
						placeholder="Quantity"
						value={data?.quantity}
						disabled
						spellCheck="false"
						className="cursor-not-allowed h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				</div>
				{/* active */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Active
					</Typography>
					<div className="ml-2">
						<Switch
							color="green"
							defaultChecked={inputValue?.status}
							onChange={(e) =>
								setInputValue({
									...inputValue,
									status: !inputValue.status,
								})
							}
						/>
					</div>
				</div>

				<div className="flex justify-end gap-4 mt-2 col-span-2">
					{deleteLoading ? (
						<button className="w-min text-sm font-semibold text-admin border-[1px] border-solid border-admin rounded-md pointer-events-none opacity-60">
							<Loading
								customStyle={'!min-h-[38px] !w-[66px] !p-0'}
								sizeStyle={'h-5 w-5'}
							/>
						</button>
					) : (
						<button
							onClick={handleDeleteVariant}
							className="w-min py-2 px-4 text-sm font-semibold text-admin border-[1px] border-solid border-admin rounded-md hover:opacity-80"
						>
							Delete
						</button>
					)}
					{updateLoading ? (
						<button
							className={`w-min text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md pointer-events-none opacity-60`}
						>
							<Loading
								customStyle={'!min-h-[38px] !w-[66px] !p-0'}
								sizeStyle={'h-5 w-5'}
							/>
						</button>
					) : (
						<button
							type="submit"
							onClick={handleSubmitUpdateVariant}
							className="w-min py-2 px-4 text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md hover:bg-strongAdmin"
						>
							Save
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

const AddVariant = ({ productId, mutate }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.users.accessToken);
	const [inputValue, setInputValue] = useState({
		ram: '',
		rom: '',
		color: '',
		price: 0,
		discount: {
			discountPercentage: 0,
			discountEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
		},
		quantity: 1,
		image: null,
	});
	const [imagePreview, setImagePreview] = useState(null);
		const [loading, setLoading] = useState(false);


	useEffect(() => {
		if (inputValue.image === null) {
			setImagePreview(null);
			return;
		}
		setImagePreview(URL.createObjectURL(inputValue.image));

		//free memory when ever this component is unmounted
		return () => {
			URL.revokeObjectURL(imagePreview);
		};
	}, [inputValue.image]);

	const handleChangeImage = (file) => {
		setInputValue({ ...inputValue, image: file });
	};

	const handleSubmitAddVariant = (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();

		formData.append('ram', inputValue.ram);
		formData.append('rom', inputValue.rom);
		formData.append('color', inputValue.color);
		formData.append('price', inputValue.price);
		if (inputValue.discount.discountPercentage === 0) {
			formData.append(
				'discount',
				JSON.stringify({ discountPercentage: 0 })
			);
		} else {
			formData.append('discount', JSON.stringify(inputValue.discount));
		}

		formData.append('quantity', inputValue.quantity);
		formData.append('image', inputValue.image);

		postFormData(
			'products/smartPhones/' + productId + '/variants/',
			formData,
			{
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'multipart/form-data;',
				},
			}
		)
			.then((res) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Add success',
					})
				);
				setInputValue({
					ram: '',
					rom: '',
					color: '',
					price: 0,
					discount: {
						discountPercentage: 0,
						discountEndDate: new Date(
							Date.now() + 24 * 60 * 60 * 1000
						),
					},
					quantity: 1,
					image: null,
				});
				mutate();
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
		<div className="w-full bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
			<Typography className="p-4 text-base font-semibold">
				Variant
			</Typography>
			<form className="p-4 pt-0 grid grid-cols-2 gap-2">
				{/* image  */}
				<div className="flex flex-col gap-2 col-span-2">
					<Typography className="text-sm font-medium">
						Image
					</Typography>
					<div className="grid grid-cols-2 gap-4">
						{imagePreview && (
							<img
								src={imagePreview}
								alt="variantImg"
								className="object-cover rounded-md"
							/>
						)}
						<FileUploader
							name="variantImage"
							types={fileTypes}
							handleChange={handleChangeImage}
							children={
								<div className="w-full rounded-md border-dashed border-[3px] border-gray-300 flex flex-col justify-center items-center p-3 cursor-pointer">
									<div className="p-4 ">
										<PhotoIcon className="text-admin w-8 h-8" />
									</div>
								</div>
							}
						/>
					</div>
				</div>

				{/* ram  */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">RAM</Typography>
					<input
						type="text"
						value={inputValue.ram}
						onChange={(e) =>
							setInputValue({
								...inputValue,
								ram: e.target.value,
							})
						}
						placeholder="Ram"
						spellCheck="false"
						className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				</div>

				{/* rom */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">ROM</Typography>
					<input
						type="text"
						value={inputValue.rom}
						onChange={(e) =>
							setInputValue({
								...inputValue,
								rom: e.target.value,
							})
						}
						placeholder="Rom"
						spellCheck="false"
						className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				</div>
				{/* price */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Price
					</Typography>
					<input
						type="text"
						placeholder="Price"
						value={inputValue.price}
						onChange={(e) =>
							setInputValue({
								...inputValue,
								price: e.target.value,
							})
						}
						spellCheck="false"
						className={`${
							!isNumber(inputValue.price) ? '!border-red-600' : ''
						} h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin`}
					></input>
				</div>
				{/* color */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Color
					</Typography>
					<input
						type="text"
						placeholder="Color"
						value={inputValue.color}
						onChange={(e) =>
							setInputValue({
								...inputValue,
								color: e.target.value,
							})
						}
						spellCheck="false"
						className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				</div>

				{/* Discount */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Discount
					</Typography>
					<input
						type="text"
						placeholder="Discount"
						value={inputValue.discount.discountPercentage}
						onChange={(e) =>
							setInputValue({
								...inputValue,
								discount: {
									...inputValue.discount,
									discountPercentage: e.target.value,
								},
							})
						}
						spellCheck="false"
						className={`${
							!(
								inputValue.discount.discountPercentage >= 0 &&
								inputValue.discount.discountPercentage <= 100
							)
								? '!border-red-600'
								: ''
						} h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin`}
					></input>
				</div>
				{/* End date */}
				{inputValue.discount.discountPercentage > 0 &&
					inputValue.discount.discountPercentage <= 100 && (
						<div className="flex flex-col gap-2">
							<Typography className="text-sm font-medium">
								End date
							</Typography>
							<input
								type="date"
								value={formatTimestampToValue(
									inputValue.discount.discountEndDate
								)}
								onChange={(e) =>
									setInputValue({
										...inputValue,
										discount: {
											...inputValue.discount,
											discountEndDate: new Date(
												e.target.value
											),
										},
									})
								}
								className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
							></input>
						</div>
					)}
				{/* Quantity */}
				<div className="flex flex-col gap-2">
					<Typography className="text-sm font-medium">
						Quantity
					</Typography>
					<input
						type="number"
						min={1}
						placeholder="Quantity"
						value={inputValue.quantity}
						onChange={(e) =>
							setInputValue({
								...inputValue,
								quantity: e.target.value,
							})
						}
						spellCheck="false"
						className="h-min font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				</div>

				<div className="text-right mt-2 col-span-2">
					{loading ? (
						<button
							className={`w-min text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md pointer-events-none opacity-60`}
						>
							<Loading
								customStyle={'!min-h-[38px] !w-[66px] !p-0'}
								sizeStyle={'h-5 w-5'}
							/>
						</button>
					) : (
						
					<button
						type="submit"
						onClick={handleSubmitAddVariant}
						className="w-min py-2 px-4 text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md hover:bg-strongAdmin"
					>
						Save
					</button>
					)}
				</div>
			</form>
		</div>
	);
};

const HighLightImages = ({ data, productId, detailId, mutate }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.users.accessToken);
	const [preImages, setPreImages] = useState(data);
	const [selectedFile, setSelectedFile] = useState([]);
	const [preview, setPreview] = useState([]);
		const [loading, setLoading] = useState(false);


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
		setSelectedFile(
			[...selectedFile, ...file].slice(0, 10 - preImages.length)
		);
	};

	const handleDeletePreviewImg = (value, url) => {
		URL.revokeObjectURL(url);
		const newSelectedFile = [...selectedFile];
		newSelectedFile.splice(value, 1);
		setSelectedFile(newSelectedFile);
	};

	const handleDeletePreImg = (target) => {
		setPreImages(preImages.filter((img, index) => index !== target));
	};

	const handleAddHighLightImages = (e) => {
		e.preventDefault();
		setLoading(true);
		if (data.length > 0) {
			const formData = new FormData();
			formData.append('updatedImages', JSON.stringify(preImages));
			selectedFile.forEach((file) => {
				formData.append('images', file);
			});

			patchFormData(
				'products/smartPhones/' +
					productId +
					'/details/' +
					detailId +
					'/highlightedImages',
				formData,
				{
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'multipart/form-data;',
					},
				}
			)
				.then((res) => {
					dispatch(
						notificationSlice.actions.showNotification({
							type: 'success',
							message: 'Update success',
						})
					);
					mutate();
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
		} else {
			const formData = new FormData();
			selectedFile.forEach((file) => {
				formData.append('images', file);
			});

			postFormData(
				'products/smartPhones/' +
					productId +
					'/details/' +
					detailId +
					'/highlightedImages',
				formData,
				{
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'multipart/form-data;',
					},
				}
			)
				.then((res) => {
					dispatch(
						notificationSlice.actions.showNotification({
							type: 'success',
							message: 'Add success',
						})
					);
					mutate();
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
		}
	};
	return (
		<div className="w-full bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
			<Typography className="p-4 text-base font-semibold">
				Images
			</Typography>
			<form className="p-4 pt-0 grid grid-cols-2 gap-2">
				{/* image  */}
				<div className="flex flex-col gap-2 col-span-2">
					<div className="grid grid-cols-5 gap-6">
						{preImages.length >= 0 &&
							preImages.map((item, index) => (
								<Badge
									key={item.imageName}
									content={
										<XMarkIcon
											className="w-6 h-6 text-gray-500  hover:opacity-60 cursor-pointer"
											onClick={() =>
												handleDeletePreImg(index)
											}
										/>
									}
									className="bg-transparent"
								>
									<img
										alt="highlightImg"
										className="object-cover rounded-md p-2"
										src={item.imageUrl}
									/>
								</Badge>
							))}
						{preview.length >= 0 &&
							preview.map((item, index) => (
								<Badge
									key={item}
									content={
										<XMarkIcon
											className="w-6 h-6 text-gray-500  hover:opacity-60 cursor-pointer"
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
										alt="highlightImg"
										className="object-cover rounded-md p-2"
										src={item}
									/>
								</Badge>
							))}
						{selectedFile.length + preImages.length < 10 && (
							<FileUploader
								name="variantImage"
								types={fileTypes}
								multiple={true}
								maxSize={10}
								handleChange={handleChange}
								children={
									<div className="w-full h-48 rounded-md border-dashed border-[3px] border-gray-300 flex flex-col justify-center items-center p-3 cursor-pointer">
										<div className="p-4 ">
											<PhotoIcon className="text-admin w-8 h-8" />
										</div>
									</div>
								}
							/>
						)}
					</div>
				</div>

				<div className="text-right mt-2 col-span-2">
					{loading ? (
						<button
							className={`w-min text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md pointer-events-none opacity-60`}
						>
							<Loading
								customStyle={'!min-h-[38px] !w-[66px] !p-0'}
								sizeStyle={'h-5 w-5'}
							/>
						</button>
					) : (
						
					<button
						type="submit"
						onClick={handleAddHighLightImages}
						className="w-min py-2 px-4 text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md hover:bg-strongAdmin"
					>
						Save
					</button>
					)}
				</div>
			</form>
		</div>
	);
};

const EditPhone = () => {
	const { productId } = useParams();
	const navigate = useNavigate();

	const { data, mutate } = useSWR(
		'products/smartPhones/' + productId,
		getData,
		SWRconfig
	);

	const { data: variantList, mutate: mutateVariantList } = useSWR(
		'products/smartPhones/' + productId + '/variants',
		getData,
		SWRconfig
	);

	const { data: detailInfo, mutate: mutateDetailData } = useSWR(
		'products/smartPhones/' + productId + '/details',
		getData,
		SWRconfig
	);

	return (
		<AdminLayout>
			<div className="text-main">
				{/* title  */}
				<div className="flex gap-4 items-center">
					<IconButton
						size="sm"
						variant="outlined"
						className="border-main text-main focus:ring-transparent rounded-sm"
						onClick={() => navigate(-1)}
					>
						<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
					</IconButton>

					<Typography className="text-xl font-semibold my-4">
						Editing <span className="text-admin">{data?.name}</span>
					</Typography>
				</div>
				<div className="w-full flex flex-col gap-4">
					{/* General  */}
					{data && (
						<GeneralData
							data={data}
							productId={productId}
							mutate={mutate}
						/>
					)}
					{/* Specifications  */}
					{detailInfo && (
						<DetailData
							data={detailInfo}
							productId={productId}
							mutate={mutateDetailData}
						/>
					)}
					{!detailInfo && (
						<DetailData
							data={undefined}
							productId={productId}
							mutate={mutateDetailData}
						/>
					)}
					{/* image  */}
					{detailInfo && (
						<HighLightImages
							data={detailInfo?.highlightedImages}
							productId={productId}
							detailId={detailInfo?._id}
							mutate={mutateDetailData}
						/>
					)}

					{/* variants  */}
					<div className="grid grid-cols-2 gap-4">
						{Array.isArray(variantList) &&
							variantList?.map((variant) => (
								<VariantItem
									data={variant}
									productId={productId}
									key={variant._id}
									mutate={mutateVariantList}
								/>
							))}
						{/* add variant  */}
						<AddVariant
							productId={productId}
							mutate={mutateVariantList}
						/>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default EditPhone;
