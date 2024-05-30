import React from 'react';
import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export function Pagination({ active, lengthOfPage, next, prev }) {
	return (
		<div className="w-full flex items-center gap-8 justify-center my-4">
			<IconButton
				size="sm"
				variant="outlined"
				onClick={prev}
				disabled={active === 1}
				className="border-admin disabled:border-text text-admin disabled:text-text focus:ring-transparent"
			>
				<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
			</IconButton>
			<Typography className="font-normal text-main">
				Page <strong className="text-admin">{active}</strong> of{' '}
				<strong className="text-admin">{lengthOfPage}</strong>
			</Typography>
			<IconButton
				size="sm"
				variant="outlined"
				onClick={next}
				disabled={active === lengthOfPage}
				className="border-admin disabled:border-text text-admin disabled:text-text focus:ring-transparent"
			>
				<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
			</IconButton>
		</div>
	);
}
