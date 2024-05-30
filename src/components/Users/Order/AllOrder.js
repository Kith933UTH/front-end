import { Typography } from '@material-tailwind/react';
import React from 'react';
import OrderItem from './OrderItem';
import OrderItemSkeleton from './OrderItemSkeleton';
import { useSelector } from 'react-redux';
import { getData } from '../../../api';
import useSWR from 'swr';
import SWRconfig from '../../../api/SWRconfig';

const AllOrder = () => {
	const loggedUser = useSelector((state) => state.users);
	const userFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + loggedUser.accessToken },
		});

	const { data, error, isLoading } = useSWR(
		'/orders',
		userFetcher,
		SWRconfig
	);

	return (
		<div className="w-full">
			<div className="text-text pb-2">
				<Typography className="text-2xl md:text-3xl font-semibold md:text-right">
					All orders
				</Typography>
			</div>
			<div className="w-full flex flex-col gap-4">
				{isLoading && (
					<>
						<OrderItemSkeleton />
						<OrderItemSkeleton />
						<OrderItemSkeleton />
					</>
				)}
				{!isLoading && !error && data && (
					<>
						{data.length > 0 ? (
							data.map((item) => (
								<OrderItem key={item._id} data={item} />
							))
						) : (
							<Typography className="text-text text-xl font-semibold text-center w-full bg-main rounded-md py-4 px-5">
								You have no orders yet.
							</Typography>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default AllOrder;
