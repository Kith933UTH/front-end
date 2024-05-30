import { Button } from '@material-tailwind/react';
import React from 'react';

const OptionList = ({ data, choose, handleChoose, wrapperStyle }) => {
	return (
		<div className={wrapperStyle}>
			{data?.map((item) => {
				return (
					<Button
						key={item}
						className={`p-2 focus:ring-2 focus:ring-highlight ${
							item === choose
								? 'bg-highlight text-main ring-2 ring-highlight'
								: 'text-main bg-text '
						} `}
						variant="outlined"
						onClick={() => handleChoose(item)}
					>
						{item}
					</Button>
				);
			})}
		</div>
	);
};

export default OptionList;
