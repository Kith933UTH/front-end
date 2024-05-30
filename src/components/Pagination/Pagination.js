import React from 'react';
import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export function Pagination({ active, lengthOfPage, next, prev }) {
	return (
		<div className="w-full flex items-center gap-8 justify-center my-12">
			<IconButton
				size="sm"
				variant="outlined"
				onClick={prev}
				disabled={active === 1}
				className="border-highlight disabled:border-text focus:ring-transparent"
			>
				<ArrowLeftIcon
					strokeWidth={2}
					className="h-4 w-4 text-highlight"
				/>
			</IconButton>
			<Typography className="font-normal text-text">
				Page <strong className="text-highlight">{active}</strong> of{' '}
				<strong className="text-highlight">{lengthOfPage}</strong>
			</Typography>
			<IconButton
				size="sm"
				variant="outlined"
				onClick={next}
				disabled={active === lengthOfPage}
				className="border-highlight disabled:border-text focus:ring-transparent"
			>
				<ArrowRightIcon
					strokeWidth={2}
					className="h-4 w-4 text-highlight"
				/>
			</IconButton>
		</div>
	);
}
