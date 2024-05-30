import { Radio, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

const Payment = () => {
	const [paymentMethodList, setPaymentMethodList] = useState([
		{ name: 'Payment on delivery', choose: true },
		// { name: 'Online payment', choose: false },
	]);
	const handleChangePaymentMethod = (value) => {
		setPaymentMethodList((prev) => {
			return prev.map((paymentMethod, index) => {
				if (index === value) {
					paymentMethod.choose = true;
				} else {
					paymentMethod.choose = false;
				}
				return paymentMethod;
			});
		});
	};
	return (
		<div className="w-full bg-main rounded-md p-4">
			<Typography className="text-text text-base font-semibold uppercase mb-2">
				Payment method
			</Typography>
			{paymentMethodList?.map((method, index) => (
				<div
					className={`${
						index !== paymentMethodList.length - 1
							? 'border-solid border-b-[1px] border-gray-700'
							: ''
					}`}
					key={method.name}
				>
					<Radio
						name="payment-method"
						color="light-green"
						className="hover:before:opacity-0 hover:border-highlight w-4 h-4"
						containerProps={{
							className: 'p-3 ',
						}}
						label={
							<div className="flex justify-between py-4 ">
								<Typography className="text-base">
									{method.name}
								</Typography>
							</div>
						}
						defaultChecked={method.choose}
						onChange={() => handleChangePaymentMethod(index)}
						labelProps={{ className: 'text-text' }}
					/>
				</div>
			))}
		</div>
	);
};

export default Payment;
