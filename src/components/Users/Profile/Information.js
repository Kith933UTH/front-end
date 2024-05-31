import {
	Typography,
	Dialog,
	Card,
	CardBody,
	Button,
	IconButton,
	CardFooter,
	// Radio,
} from '@material-tailwind/react';
import { LockClosedIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { updateData } from '../../../api';
import { useDispatch } from 'react-redux';
import notificationSlice from '../../Notification/NotificationSlice';
import usersSlice, { logOut } from '../UsersSlice';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';

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

const ChangePasswordDialog = ({ open, handler, handler2, token, data }) => {
	const dispatch = useDispatch();
	const [isValidOldPass, setIsValidOldPass] = useState(true);
	const [isValidNewPass, setIsValidNewPass] = useState(true);
	const [isValidRePass, setIsValidRePass] = useState(true);
	const [loading, setLoading] = useState(false);

	const [inputValue, setInputValue] = useState({
		oldPass: '',
		newPass: '',
		rePass: '',
	});
	const handleCheckOldPass = (e) => {
		setInputValue({
			...inputValue,
			oldPass: e.target.value,
		});
		setIsValidOldPass(e.target.value !== '');
	};
	const handleCheckNewPass = (e) => {
		setInputValue({
			...inputValue,
			newPass: e.target.value,
		});
		setIsValidNewPass(e.target.value !== '');
		setIsValidRePass(e.target.value === inputValue.rePass);
	};

	const handleCheckRePass = (e) => {
		setInputValue({
			...inputValue,
			rePass: e.target.value,
		});
		setIsValidRePass(
			e.target.value !== '' && e.target.value === inputValue.newPass
		);
	};

	const handleSubmitChangePassword = (e) => {
		e.preventDefault();
		setLoading(true);
		updateData(
			'auth/changePassword',
			{
				email: data.email,
				oldPassword: inputValue.oldPass,
				newPassword: inputValue.newPass,
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
			.then((results) => {
				// dispatch(
				// 	notificationSlice.actions.showNotification({
				// 		type: 'success',
				// 		message: 'Updated success',
				// 	})
				// );
				handler();
				handler2();
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
				<LockClosedIcon className="text-highlight h-6 w-6" />
			</IconButton>
			<Dialog
				size="xs"
				open={open}
				handler={handler}
				className="shadow-md shadow-gray-700 bg-main *:selection:text-gray-900 *:selection:bg-highlight"
			>
				<Card className="mx-auto w-full bg-main text-text p-4">
					<CardBody className="flex flex-col py-0">
						<Typography
							variant="h4"
							className="text-highlight mt-6 mb-2"
						>
							Change Password
						</Typography>
						<form className="flex flex-col">
							{/* oldPass  */}
							<input
								name="password"
								type="password"
								required={true}
								className={`rounded-lg mt-6 text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
									inputValue.oldPass !== '' &&
									'border-highlight'
								} ${
									!isValidOldPass &&
									'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
								}`}
								placeholder="Current password"
								spellCheck="false"
								value={inputValue.oldPass}
								onChange={handleCheckOldPass}
							/>

							{!isValidOldPass && (
								<Typography className="text-sm text-red-600 font-medium mt-1">
									Please type current password
								</Typography>
							)}

							{/* newPass  */}
							<input
								name="password"
								type="password"
								required={true}
								className={`rounded-lg mt-6 text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
									inputValue.newPass !== '' &&
									'border-highlight'
								} ${
									!isValidNewPass &&
									'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
								}`}
								placeholder="New password"
								spellCheck="false"
								value={inputValue.newPass}
								onChange={handleCheckNewPass}
							/>

							{!isValidNewPass && (
								<Typography className="text-sm text-red-600 font-medium mt-1">
									Please type new password
								</Typography>
							)}

							{/* repass */}
							<input
								name="rePass"
								type="password"
								required={true}
								className={`rounded-lg mt-6 text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
									inputValue.rePass !== '' &&
									'border-highlight'
								} ${
									!isValidRePass &&
									'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
								}`}
								placeholder="Confirm password"
								spellCheck="false"
								value={inputValue.rePass}
								onChange={handleCheckRePass}
							/>

							{!isValidRePass && (
								<Typography className="text-sm text-red-600 font-medium mt-1">
									Don't match to new password
								</Typography>
							)}

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
									onClick={handleSubmitChangePassword}
									type="submit"
									className={`bg-highlight px-4 py-2 text-main flex justify-center items-center gap-2 pointer-events-none hover:opacity-50 opacity-50 ${
										isValidNewPass &&
										isValidOldPass &&
										isValidRePass &&
										inputValue.oldPass !== '' &&
										inputValue.newPass !== '' &&
										inputValue.rePass !== '' &&
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

const ChangePasswordSuccessDialog = ({ open, handler }) => {
	return (
		<Dialog
			size="xs"
			open={open}
			handler={handler}
			className="shadow-md shadow-gray-700 bg-main *:selection:text-gray-900 *:selection:bg-highlight"
		>
			<Card className="mx-auto w-full bg-main text-text py-4">
				<CardBody className="flex flex-col py-0">
					<Typography
						variant="h4"
						className="text-highlight mt-6 mb-2 text-center"
					>
						Password Have Changed
					</Typography>
					<Typography className="text-text text-xl text-center mb-2">
						Please log in again.
					</Typography>
				</CardBody>
				<CardFooter className="flex justify-center">
					<Button
						onClick={handler}
						type="submit"
						className={`bg-highlight px-4 py-2 text-main text-base flex justify-center items-center gap-2 hover:opacity-50`}
					>
						<span>Ok</span>
					</Button>
				</CardFooter>
			</Card>
		</Dialog>
	);
};

const Information = ({ data, token, mutate }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openEdit, setOpenEdit] = useState(false);
	const [openChangePassword, setOpenChangePassword] = useState(false);
	const [openReLogin, setOpenReLogin] = useState(false);
	const handleOpen = () => setOpenEdit(!openEdit);
	const handleOpenChangePassword = () => {
		setOpenChangePassword(!openChangePassword);
	};

	const handleOpenReLogin = () => {
		setOpenReLogin(!openReLogin);
	};

	const handleReLogin = () => {
		setOpenReLogin(!openReLogin);
		dispatch(logOut());
		navigate('/');
		dispatch(usersSlice.actions.setLoginDialog(true));
	};
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
				<div className="flex flex-col">
					<ChangePasswordDialog
						open={openChangePassword}
						handler={handleOpenChangePassword}
						handler2={handleOpenReLogin}
						token={token}
						data={data}
					/>
					<EditProfileDialog
						open={openEdit}
						handler={handleOpen}
						data={data}
						token={token}
						mutate={mutate}
					/>
					<ChangePasswordSuccessDialog
						open={openReLogin}
						handler={handleReLogin}
					/>
				</div>
			</div>
		</div>
	);
};

export default Information;
