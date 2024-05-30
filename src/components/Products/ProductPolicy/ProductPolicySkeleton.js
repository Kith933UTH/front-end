import { Typography } from '@material-tailwind/react';
import React from 'react';

const ProductPolicySkeleton = () => {
	return (
		<div className="w-full h-max grid grid-cols-1 gap-x-8 md:grid-cols-2 border-solid border-[1px] border-gray-700 px-4 rounded-xl mb-4">
			<div className="p-4 animate-pulse">
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
			<div className="p-4 animate-pulse">
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
			<div className="p-4 animate-pulse md:col-span-2">
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
	);
};

export default ProductPolicySkeleton;
