import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import {
	Button,
	Drawer,
	IconButton,
	Typography,
} from '@material-tailwind/react';
import React from 'react';
import LaptopDetail from './LaptopDetail';
import PhoneDetail from './PhoneDetail';
import TabletDetail from './TabletDetail';
import SmartWatchDetail from './SmartWatchDetail';

const DetailedConfiguration = ({ data, type, subData }) => {
	const [open, setOpen] = React.useState(false);

	const openDrawer = () => setOpen(true);
	const closeDrawer = () => setOpen(false);

	let renderDetail = null;
	switch (type) {
		case 'Laptop': {
			renderDetail = <LaptopDetail detailList={data} subData={subData} />;
			break;
		}
		case 'Phone': {
			renderDetail = <PhoneDetail detailList={data} subData={subData} />;
			break;
		}
		case 'Tablet': {
			renderDetail = <TabletDetail detailList={data} subData={subData} />;
			break;
		}
		case 'Smart Watch': {
			renderDetail = <SmartWatchDetail detailList={data} />;
			break;
		}
		default: {
			renderDetail = null;
		}
	}
	return (
		renderDetail && (
			<>
				<Button
					onClick={openDrawer}
					className="flex gap-2 justify-center items-center bg-transparent normal-case px-4 mt-4 hover:opacity-70 py-2 border-gray-700 border-solid border-[1px] rounded-xl mx-auto"
				>
					<Typography className="text-highlight text-base">
						Detailed configuration
					</Typography>
					<ChevronDoubleRightIcon className="w-3 h-3 text-highlight" />
				</Button>
				<Drawer
					placement="left"
					open={open}
					onClose={closeDrawer}
					className="p-4 flex flex-col justify-between font-body bg-background"
					size={window.innerWidth > 500 ? 500 : window.innerWidth}
					dismiss={{
						enabled: true,
						escapeKey: true,
					}}
				>
					{/* Header  */}
					<div className="flex items-center p-2 mb-4 justify-between border-b-[1px] border-blue-gray-400 border-solid">
						{/* title */}
						<Typography
							variant="paragraph"
							className="font-semibold text-xl text-text"
						>
							Detailed configuration
						</Typography>

						{/* close button  */}
						<IconButton variant="text" onClick={closeDrawer}>
							<XMarkIcon className="w-6 h-6 text-text" />
						</IconButton>
					</div>

					{/* body  */}
					<div className="flex-1 overflow-y-scroll">
						{renderDetail}
					</div>
				</Drawer>
			</>
		)
	);
};

export default DetailedConfiguration;
