import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

const phoneNumberRegex = /^0\d{9}$/;

const PhoneNumber = ({ value, handler }) => {
	const [isValidPhone, setIsValidPhone] = useState(true);
	const handleCheckPhone = (e) => {
		if (e.target.value === '') {
			handler('');
		}
		if (Number.isInteger(parseInt(e.target.value.at(-1)))) {
			handler(e.target.value);
			setIsValidPhone(phoneNumberRegex.test(e.target.value));
		} else {
			setIsValidPhone(phoneNumberRegex.test(value));
		}
	};
	return (
		<div className="w-full bg-main rounded-md p-4">
			<Typography className="text-text text-base font-semibold uppercase mb-4">
				Phone Number
			</Typography>
			<input
				name="text"
				required={true}
				spellCheck="false"
				className={`rounded-lg text-text text-base placeholder:text-base placeholder:font-normal font-medium p-2 w-full bg-transparent border-solid border-[1px] border-gray-700 focus:outline-none placeholder:font-sans ${
					value !== '' && 'border-highlight'
				} ${
					!isValidPhone &&
					'border-red-700 selection:bg-red-700 placeholder:text-red-700 !text-red-700'
				}`}
				placeholder="Phone number"
				value={value}
				onChange={handleCheckPhone}
			/>
			{!isValidPhone && (
				<Typography className="text-sm text-red-600 font-medium mt-1">
					The phone number must start with 0 and have 10 digits
				</Typography>
			)}
		</div>
	);
};

export default PhoneNumber;
