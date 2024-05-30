import React, { useRef, useState } from 'react';
import { IconButton, Drawer, Tooltip } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const SearchDrawer = function () {
	const navigate = useNavigate();
	const searchInputRef = useRef();
	const [openSearch, setOpenSearch] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);

	//open and close drawer
	const openSearchSection = () => {
		setOpenSearch(true);
		searchInputRef.current.focus();
	};
	const closeSearchSection = () => setOpenSearch(false);

	//input
	const handleSearchInputChange = (e) => {
		setSearchValue(e.target.value.toString());
	};

	//submit search
	const handleSubmitSearchAction = () => {
		if (searchValue !== '') {
			closeSearchSection();
			// dispatch(productsSlice.actions.changeSearchKey(searchValue));
			navigate(`/search/${searchValue}`);
		}
	};

	//focus
	const handleSearchInputFocus = () => {
		setIsSearchInputFocus(!isSearchInputFocus);
	};

	return (
		<>
			<Tooltip content="Search" placement="bottom" className="bg-main">
				<IconButton
					onClick={openSearchSection}
					variant="text"
					color="white"
				>
					<MagnifyingGlassIcon className="h-6 w-6" />
				</IconButton>
			</Tooltip>

			<Drawer
				placement="top"
				open={openSearch}
				onClose={closeSearchSection}
				dismiss={{
					enabled: true,
					escapeKey: true,
				}}
				className="p-4 w-screen !h-min bg-main"
			>
				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center justify-between w-1200 mx-auto gap-4 py-3">
						<div
							className={`overflow-hidden px-3 h-min gap-2 w-full flex border-2 border-blue-gray-100 border-solid ${
								isSearchInputFocus && 'border-highlight'
							}  rounded-lg`}
						>
							<input
								type="text"
								placeholder="Search..."
								className="h-min font-sans flex-1 transition-all text-lg leading-5 outline-none  shadow-none bg-main py-3 text-text placeholder:text-text placeholder:opacity-40"
								value={searchValue}
								onFocus={handleSearchInputFocus}
								ref={searchInputRef}
								onBlur={handleSearchInputFocus}
								onChange={handleSearchInputChange}
								onKeyDown={(e) =>
									e.keyCode === 13 &&
									handleSubmitSearchAction()
								}
							></input>
							<MagnifyingGlassIcon
								onClick={handleSubmitSearchAction}
								className="w-6 cursor-pointer text-text"
							/>
						</div>
						<IconButton
							variant="text"
							color="blue-gray"
							onClick={closeSearchSection}
						>
							<XMarkIcon className="h-6 w-6 text-text" />
						</IconButton>
					</div>
				</div>
			</Drawer>
		</>
	);
};

export default SearchDrawer;
