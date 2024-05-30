import {
	Avatar,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Typography,
} from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/headericon.png';
import {
	ArrowRightStartOnRectangleIcon,
	HomeIcon,
	MagnifyingGlassIcon,
	// Cog8ToothIcon,
	// UserCircleIcon,
} from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { logOut } from '../Users/UsersSlice';
import Search from './Search';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchInputRef = useRef();
	const [searchValue, setSearchValue] = useState('');
	const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);

	const location = useLocation();

	useEffect(() => {
		let timeOut;
		if (isSearchInputFocus) setOpenSearch(true);
		else {
			timeOut = setTimeout(() => setOpenSearch(false), 100);
		}
		return () => clearTimeout(timeOut);
	}, [location, isSearchInputFocus]);

	//input
	const handleSearchInputChange = (e) => {
		setSearchValue(e.target.value.toString().trim());
	};

	//focus
	const handleSearchInputFocus = (value) => {
		setIsSearchInputFocus(value);
		if (value) setOpenSearch(true);
		// else setOpenSearch(false);
	};

	const handleLogout = () => {
		dispatch(logOut());
		navigate('/');
	};

	return (
		<div className="flex justify-between w-full h-full px-4 bg-white">
			{/* logo  */}
			<Link to="/admin">
				<div className="flex gap-2 items-center h-full px-4">
					<img
						className="w-7 h-7 object-cover"
						src={logo}
						alt="logo"
					/>
					<Typography className="uppercase text-sm font-bold text-admin">
						TechShop
					</Typography>
				</div>
			</Link>
			{/* search  */}
			<div className="flex items-center justify-between w-[550px] relative">
				<div
					className={`overflow-hidden px-3 h-min gap-2 w-full flex border-2 border-transparent border-solid bg-gray-200 ${
						isSearchInputFocus && '!border-admin'
					}  rounded-md`}
				>
					<input
						type="text"
						placeholder="Search"
						spellCheck="false"
						className="h-min flex-1 font-sans transition-all text-sm leading-4 outline-none shadow-none bg-transparent py-2 text-main placeholder:text-gray-700"
						value={searchValue}
						onFocus={() => handleSearchInputFocus(true)}
						ref={searchInputRef}
						onBlur={() => handleSearchInputFocus(false)}
						onChange={handleSearchInputChange}
						// onKeyDown={(e) =>
						// 	e.keyCode === 13 && handleSubmitSearchAction()
						// }
					></input>
					<MagnifyingGlassIcon className="w-5 text-main" />
				</div>
				{searchValue !== '' && openSearch && (
					<Search searchKey={searchValue} />
				)}
			</div>
			{/* admin avt menu */}
			<div className="flex justify-center items-center mr-4">
				<Menu placement="bottom-end">
					<MenuHandler>
						<Avatar
							variant="circular"
							size="sm"
							alt="tania andrew"
							className="cursor-pointer border border-green-500 shadow-xl shadow-green-900/20 ring-2 ring-green-500/30"
							src="https://mas.edu.vn/wp-content/uploads/2022/05/63af987a2cf528462ae90e36c72f6e96.jpg"
						/>
					</MenuHandler>
					<MenuList className="shadow-sm shadow-gray-500 border-[1px] border-gray-700 text-main">
						<Typography
							variant="small"
							className="font-medium pointer-events-none ml-2"
						>
							Hello <span className="text-admin">Admin!</span>
						</Typography>
						<hr className="my-2 border-blue-gray-50 pointer-events-none" />
						{/* <MenuItem className="flex items-center gap-2">
							<UserCircleIcon className="w-5 h-5" />

							<Typography variant="small" className="font-medium">
								My Profile
							</Typography>
						</MenuItem> */}
						<Link to="/">
							<MenuItem className="flex items-center gap-2">
								<HomeIcon className="w-5 h-5" />

								<Typography
									variant="small"
									className="font-medium"
								>
									Front Page
								</Typography>
							</MenuItem>
						</Link>

						<hr className="my-2 border-blue-gray-50 pointer-events-none" />

						<MenuItem
							className="flex items-center gap-2"
							onClick={handleLogout}
						>
							<ArrowRightStartOnRectangleIcon className="w-5 h-5" />
							<Typography variant="small" className="font-medium">
								Sign Out
							</Typography>
						</MenuItem>
					</MenuList>
				</Menu>
			</div>
		</div>
	);
};

export default Header;
