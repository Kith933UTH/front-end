import React from 'react';
import { Typography } from '@material-tailwind/react';

const OrderItemSkeleton = () => {
	return (
		<div className="w-full bg-main rounded-md py-4 px-5 animate-pulse ">
			<div className="w-full flex justify-between pb-3 border-solid border-b-[1px] border-gray-700">
				<div className="flex gap-1 items-baseline">
					<Typography
						as="div"
						className="h-4 w-60 bg-gray-700 rounded-full"
					>
						&nbsp;
					</Typography>
				</div>
				<Typography
					as="div"
					className="h-4 w-16 bg-gray-700 rounded-full"
				>
					&nbsp;
				</Typography>
			</div>
			<div className="w-full flex gap-4 gap-x-10 flex-col md:flex-row justify-between py-3 border-solid border-b-[1px] border-gray-700">
				<div className="flex gap-4 flex-1">
					<div className="grid h-20 w-20 place-items-center rounded-lg bg-gray-700">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-12 w-12 text-gray-500"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
							/>
						</svg>
					</div>

					<div className="flex-1">
						<Typography
							as="div"
							className="mb-4 h-3 w-[60%] rounded-full bg-gray-700"
						>
							&nbsp;
						</Typography>
						<Typography
							as="div"
							variant="paragraph"
							className="mb-2 h-2 w-full rounded-full bg-gray-700"
						>
							&nbsp;
						</Typography>
						<Typography
							as="div"
							variant="paragraph"
							className="mb-2 h-2 w-full rounded-full bg-gray-700"
						>
							&nbsp;
						</Typography>
					</div>
				</div>
				<Typography className="h-4 text-right mt-4 md:mt-0  ">
					<span className="bg-gray-700 inline-block rounded-full h-full w-36">
						&nbsp;
					</span>
				</Typography>
			</div>
			<div className="w-full flex justify-center md:justify-end mt-2">
				<Typography className="h-3 md:h-8 w-36 rounded bg-gray-700">
					&nbsp;
				</Typography>
			</div>
		</div>
	);
};

export default OrderItemSkeleton;
