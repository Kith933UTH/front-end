import { Spinner } from '@material-tailwind/react';
import React from 'react';

const Loading = ({ customStyle, sizeStyle, color }) => {
	return (
		<div
			className={`w-full min-h-72 flex justify-center items-center ${customStyle}`}
		>
			<Spinner
				color={color ? color : 'green'}
				className={`${sizeStyle ? sizeStyle : 'h-12 w-12'}`}
			/>
		</div>
	);
};

export default Loading;
