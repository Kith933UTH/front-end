import React from 'react';
import { Typography } from '@material-tailwind/react';

const ProductReviewSkeleton = () => {
	return (
		<div className="w-full h-max border-solid border-[1px] border-gray-700 py-4 rounded-xl">
			<div className="flex flex-col gap-2 px-4 ">
				<div className="py-4 md:px-2 border-solid border-b-[1px] border-gray-700">
					<Typography
						as="div"
						variant="h1"
						className="mb-4 h-3 w-[50%] rounded-full bg-main"
					>
						&nbsp;
					</Typography>
					<Typography
						as="div"
						variant="paragraph"
						className="mb-2 h-2 w-full rounded-full bg-main"
					>
						&nbsp;
					</Typography>
					<Typography
						as="div"
						variant="paragraph"
						className="mb-2 h-2 w-full rounded-full bg-main"
					>
						&nbsp;
					</Typography>
					<Typography
						as="div"
						variant="paragraph"
						className="mb-2 h-2 w-full rounded-full bg-main"
					>
						&nbsp;
					</Typography>
				</div>
				<div className="py-4 md:px-2 border-solid border-b-[1px] border-gray-700">
					<Typography
						as="div"
						variant="h1"
						className="mb-4 h-3 w-[50%] rounded-full bg-main"
					>
						&nbsp;
					</Typography>
					<Typography
						as="div"
						variant="paragraph"
						className="mb-2 h-2 w-full rounded-full bg-main"
					>
						&nbsp;
					</Typography>
					<Typography
						as="div"
						variant="paragraph"
						className="mb-2 h-2 w-full rounded-full bg-main"
					>
						&nbsp;
					</Typography>
					<Typography
						as="div"
						variant="paragraph"
						className="mb-2 h-2 w-full rounded-full bg-main"
					>
						&nbsp;
					</Typography>
				</div>
				<div className="py-4 md:px-2 border-solid border-b-[1px] border-gray-700">
					<Typography
						as="div"
						variant="h1"
						className="mb-4 h-3 w-[50%] rounded-full bg-main"
					>
						&nbsp;
					</Typography>
					<Typography
						as="div"
						variant="paragraph"
						className="mb-2 h-2 w-full rounded-full bg-main"
					>
						&nbsp;
					</Typography>
					<Typography
						as="div"
						variant="paragraph"
						className="mb-2 h-2 w-full rounded-full bg-main"
					>
						&nbsp;
					</Typography>
					<Typography
						as="div"
						variant="paragraph"
						className="mb-2 h-2 w-full rounded-full bg-main"
					>
						&nbsp;
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default ProductReviewSkeleton;
