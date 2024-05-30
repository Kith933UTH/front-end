import {
	Typography,
	Dialog,
	Card,
	CardBody,
	Button,
	IconButton,
	// Radio,
} from '@material-tailwind/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { updateData } from '../../../api';
import { useDispatch } from 'react-redux';
import notificationSlice from '../../Notification/NotificationSlice';
import usersSlice from '../UsersSlice';
import Loading from '../../Loading/Loading';

const phoneNumberRegex = /^0\d{9}$/;
const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const EditProfileDialog = ({ open, handler, data, token, mutate }) => {
	const dispatch = useDispatch();
	const [isValidName, setIsValidName] = useState(true);
	const [isValidPhone, setIsValidPhone] = useState(true);
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [loading, setLoading] = useState(false);

	const [inputValue, setInputValue] = useState({
		name: data.username,
		email: data.email,
		phone: data.phoneNumber,
	});

	const handleCheckName = (e) => {
		setInputValue({
			...inputValue,
			name: e.target.value,
		});
		setIsValidName(e.target.value !== '');
	};
	const handleCheckPhone = (e) => {
		if (e.target.value === '') {
			setInputValue({
				...inputValue,
				phone: '',
			});
		}
		if (Number.isInteger(parseInt(e.target.value.at(-1)))) {
			setInputValue({
				...inputValue,
				phone: e.target.value,
			});
			setIsValidPhone(phoneNumberRegex.test(e.target.value));
		} else {
			setIsValidPhone(phoneNumberRegex.test(inputValue.phone));
		}
	};
	const handleCheckEmail = (e) => {
		setInputValue({
			...inputValue,
			email: e.target.value,
		});
		setIsValidEmail(emailRegex.test(e.target.value));
	};

	// const handleChangeGender = (e) => {
	// 	setInputValue({ ...inputValue, gender: e.target.value });
	// };

	const handleSubmitUpdateProfile = (e) => {
		e.preventDefault();
		setLoading(true);
		updateData(
			'users/' + data._id,
			{
				username: inputValue.name,
				email: inputValue.email,
				phoneNumber: inputValue.phone,
				address: data.address,
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
			<IconButton variant="text" color="light-green" onClick={handler}>
				<PencilSquareIcon className="text-highlight h-6 w-6" />
			</IconButton>
			<Dialog
				size="xs"
				open={open}
				handler={handler}
				className="shadow-md shadow-gray-700 bg-main *:selection:text-gray-900 *:selection:bg-highlight"
			>
				<Card className="mx-auto w-full bg-main text-text p-4">
					<CardBody className="flex flex-col gap-6 py-0">
						<Typography
							variant="h4"
							className="text-highlight mt-6 mb-2"
						>
							Edit Profile
						</Typography>
						<form className="flex flex-col">
							{/* name  */}
							<input
								name="text"
								required={true}
								spellCheck="false"
								className={`rounded-lg text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
									inputValue.name !== '' && 'border-highlight'
								} ${
									!isValidName &&
									'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
								}`}
								placeholder="Full name"
								value={inputValue.name}
								onChange={handleCheckName}
							/>
							{!isValidName && (
								<Typography className="text-sm text-red-600 font-medium mt-1">
									Please type full name
								</Typography>
							)}

							{/* email  */}
							<input
								name="text"
								required={true}
								spellCheck="false"
								className={`rounded-lg text-text mt-6 font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
									inputValue.email !== '' &&
									'border-highlight'
								} ${
									!isValidEmail &&
									'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
								}`}
								placeholder="Email"
								value={inputValue.email}
								onChange={handleCheckEmail}
							/>
							{!isValidEmail && (
								<Typography className="text-sm text-red-600 font-medium mt-1">
									Invalid email
								</Typography>
							)}

							{/* phone  */}
							<input
								name="text"
								required={true}
								spellCheck="false"
								className={`rounded-lg mt-6 text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
									inputValue.phone !== '' &&
									'border-highlight'
								} ${
									!isValidPhone &&
									'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
								}`}
								placeholder="Phone number"
								value={inputValue.phone}
								onChange={handleCheckPhone}
							/>
							{!isValidPhone && (
								<Typography className="text-sm text-red-600 font-medium mt-1">
									The phone number must start with 0 and have
									10 digits
								</Typography>
							)}

							{/* <div className="flex gap-10 mt-3">
								<Radio
									name="gender"
									label="Male"
									color="light-green"
									className="hover:before:opacity-0 hover:border-highlight w-4 h-4"
									containerProps={{
										className: 'p-3',
									}}
									labelProps={{
										className:
											'font-medium text-text text-sm hover:text-highlight hover:opacity-60',
									}}
									value="male"
									checked={inputValue.gender === 'male'}
									onChange={handleChangeGender}
								/>
								<Radio
									name="gender"
									label="Female"
									color="light-green"
									className="hover:before:opacity-0 hover:border-highlight w-4 h-4"
									containerProps={{
										className: 'p-3',
									}}
									labelProps={{
										className:
											'font-medium text-text text-sm hover:text-highlight hover:opacity-60',
									}}
									checked={inputValue.gender === 'female'}
									value="female"
									onChange={handleChangeGender}
								/>
							</div> */}

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
									onClick={handleSubmitUpdateProfile}
									type="submit"
									className={`bg-highlight px-4 py-2 text-main flex justify-center items-center gap-2 pointer-events-none hover:opacity-50 opacity-50 ${
										isValidName &&
										isValidPhone &&
										isValidEmail &&
										inputValue.email !== '' &&
										inputValue.phone !== '' &&
										inputValue.name !== '' &&
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

const Information = ({ data, token, mutate }) => {
	const [openEdit, setOpenEdit] = useState(false);
	const handleOpen = () => setOpenEdit(!openEdit);
	return (
		<div className="w-full bg-main rounded-md p-4">
			<Typography className="text-text text-base font-semibold uppercase mb-2">
				Profile information
			</Typography>
			<div className="flex justify-between items-end">
				<div>
					<Typography className="text-base">
						{/* {data.gender === 'male' ? 'Mr.' : 'Ms.'}{' '} */}
						Name:{' '}
						<span className="text-highlight">{data.username}</span>
					</Typography>
					<Typography className="text-base">
						Phone:{' '}
						<span className="text-highlight">
							{data.phoneNumber === ''
								? 'Unset'
								: data.phoneNumber}
						</span>
					</Typography>
					<Typography className="text-base">
						Email:{' '}
						<span className="text-highlight">{data.email}</span>
					</Typography>
				</div>
				<EditProfileDialog
					open={openEdit}
					handler={handleOpen}
					data={data}
					token={token}
					mutate={mutate}
				/>
			</div>
		</div>
	);
};

export default Information;
