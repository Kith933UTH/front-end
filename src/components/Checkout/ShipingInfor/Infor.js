import { Typography } from '@material-tailwind/react';
import React from 'react';

const Infor = ({ data }) => {
	return (
		<div className="w-full bg-main rounded-md p-4">
			<Typography className="text-text text-base font-semibold uppercase mb-2">
				Shipping information
			</Typography>
			<Typography className="text-base">
				{/* {data.gender === 'male' ? 'Mr.' : 'Ms.'}{' '} */}
				Name: <span className="text-highlight">{data.username}</span>
			</Typography>
			<Typography className="text-base">
				Email: <span className="text-highlight">{data.email}</span>
			</Typography>
			{data?.phoneNumber && (
				<Typography className="text-base">
					Phone:{' '}
					<span className="text-highlight">{data.phoneNumber}</span>
				</Typography>
			)}
		</div>
	);
};

export default Infor;
