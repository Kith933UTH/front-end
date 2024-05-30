import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import OptionListSkeleton from '../../OptionList/OptionListSkeleton';

const ProductBuySkeleton = () => {
	return (
		<>
			<Typography
				as="div"
				variant="h1"
				className="mb-4 h-6 w-full rounded bg-main animate-pulse "
			>
				&nbsp;
			</Typography>
			<Typography
				as="div"
				variant="paragraph"
				className="mb-2 h-2 w-full rounded-full bg-main animate-pulse"
			>
				&nbsp;
			</Typography>
			<Typography
				as="div"
				variant="paragraph"
				className="mb-4 h-2 w-full rounded-full bg-main animate-pulse"
			>
				&nbsp;
			</Typography>

			<OptionListSkeleton quantity={3} />
			<OptionListSkeleton quantity={4} />

			<Typography
				as="div"
				variant="paragraph"
				className="mb-4 h-4 w-full rounded-full bg-main animate-pulse"
			>
				&nbsp;
			</Typography>

			<Button
				disabled
				tabIndex={-1}
				className="h-10 w-full bg-main animate-pulse shadow-none hover:shadow-none"
			>
				&nbsp;
			</Button>
		</>
	);
};

export default ProductBuySkeleton;
