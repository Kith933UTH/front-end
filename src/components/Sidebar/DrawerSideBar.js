import React from 'react';
import { Drawer, IconButton } from '@material-tailwind/react';
import {
	AdjustmentsVerticalIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';

export function DrawerSideBar() {
	const [openLeft, setOpenLeft] = React.useState(false);

	const openDrawerLeft = () => setOpenLeft(true);
	const closeDrawerLeft = () => setOpenLeft(false);

	return (
		<div className="">
			<div className="flex flex-wrap gap-4">
				<IconButton className="w-7 h-7" onClick={openDrawerLeft}>
					<AdjustmentsVerticalIcon className="w-4 h-4 text-text" />
				</IconButton>
			</div>

			<Drawer
				placement="left"
				open={openLeft}
				onClose={closeDrawerLeft}
				className="px-4 bg-main"
			>
				<div className="absolute top-2 right-2">
					<IconButton
						variant="text"
						color="blue-gray"
						onClick={closeDrawerLeft}
					>
						<XMarkIcon className="w-4 h-4 text-text" />
					</IconButton>
				</div>
				<Sidebar />
			</Drawer>
		</div>
	);
}
