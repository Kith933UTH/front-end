import React from 'react';
import {
	Navbar,
	Collapse,
	Typography,
	List,
	Menu,
	MenuHandler,
	MenuList,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import CateList from '../../config/CateList';
import { Link, NavLink } from 'react-router-dom';

//Nav item with subnav
function NavItemWithMenu({ data, isMobile, closeNav }) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
	const renderItems = data?.children.map(({ icon, title, path }, key) => (
		<Link
			to={path}
			key={key}
			onClick={() => {
				isMobile && closeNav();
				isMobileMenuOpen && setIsMobileMenuOpen(false);
			}}
		>
			<div className="flex items-center text-sm md:text-base gap-2 p-2 px-4 md:px-6 shadow-sm shadow-gray-700 font-medium bg-main rounded-xl text-text hover:bg-gray-700">
				{icon}
				<div>{title}</div>
			</div>
		</Link>
	));

	return (
		<>
			<Menu
				open={isMenuOpen}
				handler={setIsMenuOpen}
				offset={{ mainAxis: 20 }}
				placement="bottom"
				allowHover={true}
			>
				<MenuHandler className="hover:opacity-60">
					<Typography
						as="div"
						variant="small"
						className="font-medium"
					>
						<Typography
							className="flex items-center text-sm md:text-base gap-2 font-medium text-text cursor-pointer p-2 px-4 md:px-6 shadow-sm shadow-gray-700 bg-main rounded-3xl rounded-t-none"
							selected={isMenuOpen || isMobileMenuOpen}
							onClick={() => setIsMobileMenuOpen((cur) => !cur)}
						>
							{data.icon}
							{data.title}

							<ChevronDownIcon
								strokeWidth={2.5}
								className={`hidden h-3 w-3 transition-transform lg:block ${
									isMenuOpen ? 'rotate-180' : ''
								}`}
							/>
							<ChevronDownIcon
								strokeWidth={2.5}
								className={`block h-3 w-3 transition-transform lg:hidden ${
									isMobileMenuOpen ? 'rotate-180' : ''
								}`}
							/>
						</Typography>
					</Typography>
				</MenuHandler>
				<MenuList className="bg-main hidden max-w-screen-xl rounded-xl lg:block">
					<ul className="grid grid-cols-3 gap-3 outline-none outline-0">
						{renderItems}
					</ul>
				</MenuList>
				<div className="block lg:hidden text-text">
					<Collapse
						className={`flex flex-wrap gap-2 justify-center ${
							isMobileMenuOpen && 'overflow-visible'
						}`}
						open={isMobileMenuOpen}
					>
						{renderItems}
					</Collapse>
				</div>
			</Menu>
		</>
	);
}

function NavList({ isMobile, closeNav }) {
	return (
		<List className="p-0 py-2 lg:mt-0 lg:mb-0 flex-row flex-wrap gap-4 lg:p-1 justify-center max-w-none min-w-none">
			{CateList.map((cate) => {
				if (cate.children)
					return (
						<NavItemWithMenu
							isMobile={isMobile}
							closeNav={closeNav}
							key={cate.path}
							data={cate}
						/>
					);
				return (
					<NavLink
						key={cate.path}
						to={cate.path}
						onClick={() => isMobile && closeNav()}
						className="flex items-center text-sm md:text-base gap-2 p-2 px-4 md:px-6 shadow-sm shadow-gray-700 font-medium bg-main rounded-3xl rounded-t-none text-text hover:opacity-60"
					>
						{cate.icon}
						{cate.title}
					</NavLink>
				);
			})}
		</List>
	);
}

const HeaderNavbar = ({ open, closeNav }) => {
	const isMobile = window.innerWidth < 960;

	return (
		<Navbar className="flex-1 w-full max-w-none min-w-none px-4 py-0 bg-transparent border-none text-base shadow-none rounded-none backdrop-blur-none">
			<Collapse open={open}>
				<NavList isMobile={isMobile} closeNav={closeNav} />
			</Collapse>
		</Navbar>
	);
};

export default React.memo(HeaderNavbar);
