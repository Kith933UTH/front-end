import { Typography } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Complete = () => {
	return (
		<section className="w-full z-10 bg-primary py-[120px] overflow-hidden">
			<div className="container mx-auto">
				<div className="-mx-4 flex">
					<div className="w-full px-4">
						<div className="mx-auto max-w-full text-center">
							<Typography className="mb-6 text-6xl font-bold leading-none text-white">
								Thank you for order!
							</Typography>

							<Typography className="mb-8 text-xl text-white">
								We will contact you as soon as possible to
								confirm your order.
							</Typography>
							<div className="flex gap-4 w-full justify-center">
								<Link
									to="/"
									className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-main bg-main transition hover:opacity-50"
								>
									<Typography className="text-base text-center font-semibold text-highlight">
										Continue to homepage
									</Typography>
								</Link>
								<Link
									to="/user/order"
									className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-main bg-highlight transition hover:opacity-50"
								>
									<Typography className="text-base text-center font-semibold text-main">
										See your order
									</Typography>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
				<div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
				<div className="flex h-full w-1/3">
					<div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
					<div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
				</div>
				<div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
			</div>
		</section>
	);
};

export default Complete;
