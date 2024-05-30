import { Button } from '@material-tailwind/react';
import React from 'react';

const OptionListSkeleton = ({ quantity }) => {
	var indents = [];
	for (var i = 0; i < quantity; i++) {
		indents.push(
			<Button
				disabled
				key={i}
				tabIndex={-1}
				className="h-8 w-20 bg-main animate-pulse shadow-none hover:shadow-none"
			>
				&nbsp;
			</Button>
		);
	}
	return (
		<div className="w-full flex gap-2 mb-3 animate-pulse">{indents}</div>
	);
};

export default OptionListSkeleton;
