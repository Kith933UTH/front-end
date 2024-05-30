import React from 'react';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import { FaShippingFast } from 'react-icons/fa';
import { Typography, ListItemPrefix } from '@material-tailwind/react';
const PolicyPage = () => {
	const TABLE_HEAD = ['Member Status', 'Standard', 'Techshop members'];
	const TABLE_HEAD2 = ['Product', 'Returns fee'];

	const TABLE_ROWS = [
		{
			member: 'Most products',
			standard: '15 days',
			day: '60 days',
			product: 'Activatable devices (excluding prepaid phones)',
			fee: '$45',
		},
		{
			member: 'Activatable devices',
			standard: '14 days',
			day: '14 days',
			product: 'Accessory and special-order products',
			fee: '15% of item purchase price',
		},
	];
	return (
		<div className="m-4">
			<Typography className="pt-4 flex" variant="h4">
				RETURN AND EXCHANGES
			</Typography>
			<div className="">
				<Typography className="pt-4 flex" variant="h5">
					How to start a return
				</Typography>
				<div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 pt-2 pb-4">
					<div className="text-xl border-text border-solid border py-4 rounded-lg px-10 flex">
						<ListItemPrefix>
							<MdOutlineLocalGroceryStore className="size-12" />
						</ListItemPrefix>
						<Typography className="text-base text-text">
							Return it to a store
							<br></br>
							Return any in-store or online purchase to any our
							store.
						</Typography>
					</div>
					<div className="text-xl border-text border-solid border py-4  rounded-lg px-10 flex">
						<ListItemPrefix>
							<FaShippingFast className="size-12" />
						</ListItemPrefix>
						<Typography className="text-base text-text">
							Ship it back to us
							<br></br>
							Ship it for free with a prepaid UPS shipping label.
						</Typography>
					</div>
				</div>
				<div className="py-4 border-text border-solid border rounded-xl mb-8">
					<Typography
						className="pt-2 flex align-center justify-center"
						variant="h4"
					>
						Our promise
					</Typography>
					<Typography className="py-4 text-base text-justify px-10 tablet:px-20 flex align-center justify-center ">
						We work hard every day to enrich the lives of our
						customers through technology, whether you come to us
						online, visit our stores or invite us into your home. If
						you are not fully satisfied with your purchase, let us
						help you with a replacement, return or repair.{' '}
					</Typography>
				</div>
				<Typography className="pt-4 flex" variant="h5">
					Return and exchange periods
				</Typography>
				<Typography className="pt-2 flex">
					If you want to return or exchange your purchase, please know
					that the time period begins the day you receive your product
					and applies to new, clearance, open-box, refurbished and
					pre-owned products.
				</Typography>
				<div className="flex justify-center items-center w-full">
					<table className="w-full text-left my-4 p-4 ">
						<thead>
							<tr>
								{TABLE_HEAD.map((head) => (
									<th
										key={head}
										className="border border-text border-solid p-4"
									>
										<Typography
											variant="small"
											color="white"
											className="font-normal leading-none opacity-70 border boder-solid border-text"
										>
											{head}
										</Typography>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{TABLE_ROWS.map(
								({ member, standard, day }, index) => {
									const isLast = index === TABLE_ROWS.length;
									const classes = isLast
										? 'p-4 border boder-solid border-text'
										: 'p-4 border border-solid border-text';
									return (
										<tr key={member}>
											<td className={classes}>
												<Typography
													variant="small"
													color="white"
													className="font-normal"
												>
													{member}
												</Typography>
											</td>
											<td className={classes}>
												<Typography
													variant="small"
													color="white"
													className="font-normal"
												>
													{standard}
												</Typography>
											</td>
											<td className={classes}>
												<Typography
													variant="small"
													color="white"
													className="font-normal"
												>
													{day}
												</Typography>
											</td>
										</tr>
									);
								}
							)}
						</tbody>
					</table>
				</div>
				<Typography className="pt-6 flex" variant="h5">
					Restocking fees
				</Typography>
				<Typography className="pt-2 flex">
					Some items we sell (see below for the detailed list) have a
					restocking fee if returned by a customer.
				</Typography>
				<div className="flex justify-center items-center w-full">
					<table className="w-full text-left p-4 my-4">
						<thead>
							<tr>
								{TABLE_HEAD2.map((head) => (
									<th
										key={head}
										className="border border-text border-solid p-4"
									>
										<Typography
											variant="small"
											color="white"
											className="font-normal leading-none opacity-70 border boder-solid border-text"
										>
											{head}
										</Typography>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{TABLE_ROWS.map(({ product, fee }, index) => {
								const isLast = index === TABLE_ROWS.length;
								const classes = isLast
									? 'p-4 border boder-solid border-text'
									: 'p-4 border border-solid border-text';
								return (
									<tr key={product}>
										<td className={classes}>
											<Typography
												variant="small"
												color="white"
												className="font-normal"
											>
												{product}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="white"
												className="font-normal"
											>
												{fee}
											</Typography>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<Typography className="pt-4 flex">
					There is no restocking fee if the product is unopened, or if
					the purchase and the return both occur within: AL, CO, HI,
					IA, MS, OH, OK, SC and where prohibited by law. The
					restocking fee will be taxed in select states.
				</Typography>
			</div>
		</div>
	);
};

export default PolicyPage;
