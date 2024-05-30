import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Dialog,
	Card,
	CardBody,
	CardFooter,
	Typography,
	Checkbox,
	Tooltip,
	IconButton,
} from '@material-tailwind/react';
import { UserIcon } from '@heroicons/react/24/outline';
import {
	UserPlusIcon,
	ArrowLeftEndOnRectangleIcon,
} from '@heroicons/react/24/solid';
import usersSlice, { signIn, signUp } from './UsersSlice';
import notificationSlice from '../Notification/NotificationSlice';
import Loading from '../Loading/Loading';

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const SignInDialog = ({ open, handler }) => {
	const dispatch = useDispatch();
	const rememberEmail = localStorage.getItem('rememberEmail') ?? '';
	const [isEmail, setIsEmail] = useState(true);
	const [isValidPass, setIsValidPass] = useState(true);
	const [isRemember, setIsRemember] = useState(rememberEmail !== '');

	const [loading, setLoading] = useState(false);

	const [inputValue, setInputValue] = useState({
		email: rememberEmail,
		pass: '',
	});

	const handleCheckEmail = (e) => {
		setInputValue({
			...inputValue,
			email: e.target.value,
		});
		setIsEmail(emailRegex.test(e.target.value));
	};

	const handleCheckPass = (e) => {
		setInputValue({
			...inputValue,
			pass: e.target.value,
		});
		setIsValidPass(e.target.value !== '');
	};

	const handleSubmitSignIn = (e) => {
		e.preventDefault();
		setLoading(true);
		dispatch(
			signIn({
				email: inputValue.email,
				password: inputValue.pass,
			})
		).then((res) => {
			if (res?.error === undefined) {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Login success',
					})
				);
				if (isRemember) {
					localStorage.setItem('rememberEmail', inputValue.email);
				} else {
					localStorage.removeItem('rememberEmail');
				}
			} else {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: 'Wrong email or password!',
					})
				);
			}
			setLoading(false);
		});
	};

	return (
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
						Welcome Back
					</Typography>
					<form className="flex flex-col">
						<input
							name="email"
							required={true}
							spellCheck="false"
							className={`rounded-lg text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
								inputValue.email !== '' && 'border-highlight'
							} ${
								!isEmail &&
								'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
							}`}
							placeholder="Email"
							value={inputValue.email}
							onChange={handleCheckEmail}
						/>
						{!isEmail && (
							<Typography className="text-sm text-red-600 font-medium mt-1">
								Invalid email
							</Typography>
						)}

						<input
							name="password"
							type="password"
							required={true}
							className={`rounded-lg mt-6 text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
								inputValue.pass !== '' && 'border-highlight'
							} ${
								!isValidPass &&
								'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
							}`}
							placeholder="Password"
							spellCheck="false"
							value={inputValue.pass}
							onChange={handleCheckPass}
						/>

						{!isValidPass && (
							<Typography className="text-sm text-red-600 font-medium mt-1">
								Please type password
							</Typography>
						)}

						<div className="mt-2">
							<Checkbox
								name="rate"
								color="light-green"
								className="hover:before:opacity-0 hover:border-highlight w-4 h-4"
								containerProps={{
									className: 'p-1',
								}}
								checked={isRemember}
								onChange={() => setIsRemember(!isRemember)}
								label={
									<Typography className="text-text text-sm">
										Remember me
									</Typography>
								}
							/>
						</div>

						<Button
							onClick={handleSubmitSignIn}
							type="submit"
							className={`bg-highlight text-main text-base mt-6  flex justify-center items-center gap-2 pointer-events-none opacity-50 ${
								isEmail &&
								isValidPass &&
								inputValue.email !== '' &&
								inputValue.pass !== '' &&
								'pointer-events-auto opacity-100'
							} `}
							fullWidth
						>
							{loading ? (
								<Loading
									customStyle={'!min-h-5 !w-full !p-0'}
									sizeStyle={'h-5 w-5'}
								/>
							) : (
								<>
									<ArrowLeftEndOnRectangleIcon className="w-5 h-5 text-main" />
									Sign In
								</>
							)}
						</Button>
					</form>
				</CardBody>
				<CardFooter className="pt-0 flex mt-4 justify-center">
					<Typography variant="small" className="flex justify-center">
						Don&apos;t have an account?&ensp;
					</Typography>
					<Typography
						color="white"
						className="ml-1 text-sm font-bold cursor-pointer hover:opacity-60 text-highlight active:underline"
						onClick={() => handler('signup')}
					>
						Sign up
					</Typography>
				</CardFooter>
			</Card>
		</Dialog>
	);
};

const SignUpDialog = ({ open, handler }) => {
	const dispatch = useDispatch();
	const [isValidName, setIsValidName] = useState(true);
	// const [isValidPhone, setIsValidPhone] = useState(true);
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidPass, setIsValidPass] = useState(true);
	const [isValidRePass, setIsValidRePass] = useState(true);
	const [isAcceptTerm, setIsAcceptTerm] = useState(false);

	const [loading, setLoading] = useState(false);

	const [inputValue, setInputValue] = useState({
		name: '',
		// phone: '',
		email: '',
		pass: '',
		rePass: '',
	});

	const handleCheckName = (e) => {
		setInputValue({
			...inputValue,
			name: e.target.value,
		});
		setIsValidName(e.target.value !== '');
	};
	// const handleCheckPhone = (e) => {
	// 	if (e.target.value === '') {
	// 		setInputValue({
	// 			...inputValue,
	// 			phone: '',
	// 		});
	// 	}
	// 	if (Number.isInteger(parseInt(e.target.value.at(-1)))) {
	// 		setInputValue({
	// 			...inputValue,
	// 			phone: e.target.value,
	// 		});
	// 		setIsValidPhone(phoneNumberRegex.test(e.target.value));
	// 	} else {
	// 		setIsValidPhone(phoneNumberRegex.test(inputValue.phone));
	// 	}
	// };

	const handleCheckEmail = (e) => {
		setInputValue({
			...inputValue,
			email: e.target.value,
		});
		setIsValidEmail(emailRegex.test(e.target.value));
	};

	const handleCheckPass = (e) => {
		setInputValue({
			...inputValue,
			pass: e.target.value,
		});
		setIsValidPass(e.target.value !== '');
	};

	const handleCheckRePass = (e) => {
		setInputValue({
			...inputValue,
			rePass: e.target.value,
		});
		setIsValidRePass(
			e.target.value !== '' && e.target.value === inputValue.pass
		);
	};

	const handleSubmitSignIn = (e) => {
		e.preventDefault();
		setLoading(true);
		dispatch(
			signUp({
				username: inputValue.name,
				email: inputValue.email,
				password: inputValue.pass,
			})
		).then((res) => {
			if (res?.error === undefined) {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Sign up success.',
					})
				);
				handler('login');
			} else {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: 'Account existed. Try another name or email.',
					})
				);
			}
			setLoading(false);
		});
	};

	return (
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
						Join With Us
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

						{/* phone  */}
						{/* <input
							name="text"
							required={true}
							spellCheck="false"
							className={`rounded-lg mt-6 text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
								inputValue.phone !== '' && 'border-highlight'
							} ${
								!isValidPhone &&
								'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
							}`}
							placeholder="Phone number"
							value={inputValue.phone}
							onChange={handleCheckPhone}
						/> */}
						{/* {!isValidPhone && (
							<Typography className="text-sm text-red-600 font-medium mt-1">
								The phone number must start with 0 and have 10
								digits
							</Typography>
						)} */}

						{/* email  */}
						<input
							name="email"
							required={true}
							spellCheck="false"
							className={`rounded-lg mt-6 text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
								inputValue.email !== '' && 'border-highlight'
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

						{/* pass  */}
						<input
							name="password"
							type="password"
							required={true}
							className={`rounded-lg mt-6 text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
								inputValue.pass !== '' && 'border-highlight'
							} ${
								!isValidPass &&
								'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
							}`}
							placeholder="Password"
							spellCheck="false"
							value={inputValue.pass}
							onChange={handleCheckPass}
						/>

						{!isValidPass && (
							<Typography className="text-sm text-red-600 font-medium mt-1">
								Please type password
							</Typography>
						)}

						{/* repass */}
						<input
							name="rePass"
							type="password"
							required={true}
							className={`rounded-lg mt-6 text-text font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none ${
								inputValue.rePass !== '' && 'border-highlight'
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
								Don't match password
							</Typography>
						)}

						<div className=" flex gap-2 items-center mt-2">
							<Checkbox
								name="rate"
								color="light-green"
								className="hover:before:opacity-0 hover:border-highlight w-4 h-4"
								containerProps={{
									className: 'p-1',
								}}
								defaultChecked={isAcceptTerm}
								onClick={() => setIsAcceptTerm(!isAcceptTerm)}
							/>
							<div className="flex">
								<Typography className="text-text text-sm">
									Accept
								</Typography>
								<Typography
									className="ml-1 text-sm cursor-pointer hover:opacity-60 text-highlight active:underline"
									onClick={() => handler('login')}
								>
									Terms & Conditions
								</Typography>
							</div>
						</div>

						<Button
							onClick={handleSubmitSignIn}
							type="submit"
							className={`bg-highlight text-main text-base mt-6  flex justify-center items-center gap-2 pointer-events-none opacity-50 ${
								isValidName &&
								// isValidPhone &&
								isValidEmail &&
								isValidPass &&
								isValidRePass &&
								isAcceptTerm &&
								'pointer-events-auto opacity-100'
							} `}
							fullWidth
						>
							{loading ? (
								<Loading
									customStyle={'!min-h-5 !w-full !p-0'}
									sizeStyle={'h-5 w-5'}
								/>
							) : (
								<>
									<UserPlusIcon className="w-4 h-4 text-main" />
									Sign Up
								</>
							)}
						</Button>
					</form>
				</CardBody>
				<CardFooter className="pt-0 flex mt-4 justify-center">
					<Typography variant="small" className="flex justify-center">
						Already have an account?&ensp;
					</Typography>
					<Typography
						className="ml-1 text-sm font-bold cursor-pointer hover:opacity-60 text-highlight active:underline"
						onClick={() => handler('login')}
					>
						Sign in
					</Typography>
				</CardFooter>
			</Card>
		</Dialog>
	);
};

const AuthForm = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState('');
	const handleOpen = (value) => {
		setOpen(value);
		dispatch(usersSlice.actions.setLoginDialog(false));
	};
	const openLoginDialog = useSelector((state) => state.users.openLoginDialog);

	return (
		<>
			<Tooltip content="Login" placement="bottom" className="bg-main">
				<IconButton
					variant="text"
					color="white"
					onClick={() => handleOpen('login')}
				>
					<UserIcon className="h-6 w-6" />
				</IconButton>
			</Tooltip>

			<SignInDialog
				open={openLoginDialog || open === 'login'}
				handler={handleOpen}
			/>
			<SignUpDialog open={open === 'signup'} handler={handleOpen} />
		</>
	);
};

export default AuthForm;
