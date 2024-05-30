import React, { useCallback, useState } from 'react';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import {
	Bars3Icon,
	HeartIcon,
	XMarkIcon,
	ClipboardDocumentListIcon,
	AdjustmentsVerticalIcon,
} from '@heroicons/react/24/outline';
import SearchDrawer from './SearchDrawer';
import Cart from '../Cart/Cart';
import HeaderNavbar from '../Navbar/HeaderNavbar';
import AuthForm from '../Users/AuthForm';
import { useSelector } from 'react-redux';

const Header = () => {
	const user = useSelector((state) => state.users);
	//Nav handler
	const [openNav, setOpenNav] = useState(true);
	const closeNavMobileSection = useCallback(() => setOpenNav(false), []);
	React.useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 960) {
				closeNavMobileSection();
			}
		});
	}, [closeNavMobileSection]);

	return (
		<>
			<header className="mx-auto bg-main pt-3 shadow-none px-4 pb-2 rounded-b-[40px] md:rounded-b-[50px] desktop:rounded-b-full desktop:px-0 overflow-visible">
				<div className="flex flex-wrap max-w-[1200px] mx-auto items-center justify-between gap-y-4 text-text overflow-visible pb-1 px-4 ">
					{/* Logo link to home page */}
					<Link
						to="/"
						className="text-2xl font-bold cursor-pointer py-1.5 px-0 font-sans"
					>
						TechShop
					</Link>

					<div className="ml-auto flex sm:gap-4 -mr-2 lg:mr-3">
						{/* Search button  */}
						<SearchDrawer />

						{/* user  */}
						{user.accessToken === '' ? (
							<AuthForm />
						) : user.userInfo.role === 'Admin' ? (
							<Link to="admin">
								<Tooltip
									content="Admin Page"
									placement="bottom"
									className="bg-main"
								>
									<IconButton variant="text" color="white">
										<AdjustmentsVerticalIcon className="h-6 w-6" />
									</IconButton>
								</Tooltip>
							</Link>
						) : (
							<>
								{/* Wish list  */}
								<Link to="/wishlist">
									<Tooltip
										content="Wishlist"
										placement="bottom"
										className="bg-main"
									>
										<IconButton
											variant="text"
											color="white"
										>
											<HeartIcon className="h-6 w-6" />
										</IconButton>
									</Tooltip>
								</Link>

								{/* Cart  */}
								<Cart />

								<Link to="/user/order">
									<Tooltip
										content="Your order"
										placement="bottom"
										className="bg-main"
									>
										<IconButton
											variant="text"
											color="white"
										>
											<ClipboardDocumentListIcon className="h-6 w-6" />
										</IconButton>
									</Tooltip>
								</Link>
							</>
						)}

						{/* nav mobile  */}
						<Tooltip
							content="Category"
							placement="bottom"
							className="bg-main"
						>
							<IconButton
								variant="text"
								className="text-text"
								onClick={() => setOpenNav(!openNav)}
							>
								{openNav ? (
									<XMarkIcon
										className="h-6 w-6"
										strokeWidth={2}
									/>
								) : (
									<Bars3Icon
										className="h-6 w-6"
										strokeWidth={2}
									/>
								)}
							</IconButton>
						</Tooltip>
					</div>
				</div>
			</header>
			<div className="w-full">
				<HeaderNavbar open={openNav} closeNav={closeNavMobileSection} />
			</div>
		</>
	);
};

export default Header;
